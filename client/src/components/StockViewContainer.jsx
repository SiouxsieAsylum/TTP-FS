import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Portfolio from './Portfolio';
import TransactionAudit from './TransactionAudit';

import endpoints from '../externals/endpoints';


const PortfolioNav = (props) => {
    const label = props.clickArg[0].toUpperCase() + props.clickArg.slice(1);
    const [isHovered, toggleHover] = useState(false)

    return (
        <h2 
            className={isHovered ? "hovered" : ""}
            onMouseEnter={() => toggleHover(true)} 
            onMouseLeave={() => toggleHover(false)}
            onClick={() => props.clickFunction(props.clickArg)}>{label}</h2>
    )
}

class StockViewContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            view: 'portfolio',
            purchaseFailed: false,
            fullPortfolioStockList: [],
            currentPortfolioStockPrices: {},
            allStocks:[],
        }

        this.purchaseStock = this.purchaseStock.bind(this);
        this.getPortfolioStocks = this.getPortfolioStocks.bind(this);
        this.fetchCurrentStockPrices = this.fetchCurrentStockPrices.bind(this);
        this.sendStocks = this.sendStocks.bind(this);
        this.allUserStocks = this.allUserStocks.bind(this);
        this.switchStockView = this.switchStockView.bind(this);
    }

    componentDidMount(){
        this.getPortfolioStocks(this.props.portfolio)
        .then(stocks => {
            if (stocks.length){
                this.fetchCurrentStockPrices(stocks)
                .then(_ => {
                    console.log("stock prices fetched")
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                return;
            }
        })
        .catch(err => {
            return;
        })
    }

    sendStocks = (obj) => {
        return fetch('/api/stocks/new', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(obj)
        })
        .then(r => r.json())
        .catch(err => console.log(err));

    }

    purchaseStock = (stockObj) => {
        fetch(endpoints.IEX + '?symbols=' + stockObj.ticker)
        .then(res => res.json())
        .then(stockArray => {
            if (!stockArray.length) {
                this.setState({
                    purchaseFailed: 'No Asset By That Symbol'
                })
            } else {

                let buyingPrice = stockArray[0].price;
                let totalCost = buyingPrice * stockObj.quantity;
                if (totalCost < this.props.user.balance) {
                    let updatedBalance = this.props.user.balance - totalCost;
                    let today = new Date().toISOString();
                    let requestBody = {
                        tickerSymbol: stockObj.ticker.toUpperCase(),
                        quantity: parseInt(stockObj.quantity),
                        datePurchased: today,
                        buyingPrice: buyingPrice,
                        portfolioId: this.props.portfolio.portfolioid
                    };

                    let purchase = this.sendStocks(requestBody);
                    let balanceUpdate = this.props.updateUserBalance(updatedBalance)
    
                    Promise.all([purchase, balanceUpdate])
                    .then(_ => {
                        this.getPortfolioStocks(this.props.portfolio)
                        .then(stocks => stocks)
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err))
                } else {
                    this.setState({
                        purchaseFailed: 'Insufficient Funds'
                    })
                }
            }
        })
    }

    getPortfolioStocks = (portfolio) => {
        return fetch('/api/portfolio/' + portfolio.portfolioid)
        .then(res => res.json())
        .then(allStocks => {
            this.setState(_ =>{

                let arr = []
                allStocks.map(stock => {
                    stock.datepurchased = stock.datepurchased.slice(0,10);
                    arr.push(stock)
                })
                return {fullPortfolioStockList: arr, purchaseFailed: false}
            })
            return allStocks;
        })
        .catch(err => console.log(err));
    }

    fetchCurrentStockPrices = (stocks) => {
        let allSymbols = {};
        stocks.map(stock => {
            allSymbols[stock.tickersymbol] = true;
        })
        let symbolArray = Object.keys(allSymbols);
        let symbolString = symbolArray.join(',');
        return fetch(endpoints.IEX + '?symbols=' + symbolString)
        .then(res => res.json())
        .then(stockArray => {
            this.setState(_ => {
                let obj = {};
                stockArray.map(stock => {
                    obj[stock.symbol] = stock.price
                })
                return {currentPortfolioStockPrices: obj}
            })
        })
        .catch(err => console.log(err))
    }

    allUserStocks(){
        return fetch(`api/stocks/all-trades/${this.props.user.userid}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(trades => {
            this.setState(prevState =>{
                trades.map(trade => {
                    prevState.allStocks.push(trade)
                    return trade;
                })
                return {allTrades: prevState.allTrades }
            })
        })
    }

    switchStockView(chosenView){
        if (chosenView === "transactions"){
            if (!this.state.allStocks.length){
                this.allUserStocks()
                .then(_ => {
                    this.setState({
                        view: chosenView
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                this.setState({
                    view: chosenView
                })
            }
        } else {
            this.setState({
                view: chosenView
            })
        }

    }

    render(){
        let view;
        if (this.state.view === 'portfolio') {
            view = <Portfolio 
                            stocks={this.state.fullPortfolioStockList}
                            currentPrices={this.state.currentPortfolioStockPrices}
                            user={this.props.user} 
                            purchaseStock={this.purchaseStock}
                            purchaseFailed={this.state.purchaseFailed}
                            />
        } else {
            view = <TransactionAudit
                    stocks={this.state.allStocks}
                    user={this.props.user}
                         />
        }

        if (!this.props.isLoggedIn) return <Redirect to="/" />

        return (
            <main>
                <div className="balance-nav">
                    <h1 className="current-user-balance">$ { this.props.user.balance }</h1>
                    <div className="flex-nav">
                        <PortfolioNav 
                            clickFunction={this.switchStockView}
                            clickArg="portfolio"
                            />
                        <PortfolioNav 
                            clickFunction={this.switchStockView}
                            clickArg="transactions"
                            />
                    </div>
                </div>
                

                {view}
            </main>
        )
    }
}

export default StockViewContainer;
