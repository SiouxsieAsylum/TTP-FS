import React, { Component } from 'react';
import AddStock from './AddStock';
import endpoints from '../externals/endpoints';

class StockViewContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            view: 'addStock',
            purchaseFailed: false,
            fullPortfolioStockList: [],
            currentPortfolioStockPrices: {}
        }

        this.purchaseStock = this.purchaseStock.bind(this);
        this.getPortfolioStocks = this.getPortfolioStocks.bind(this);
        this.fetchCurrentStockPrices = this.fetchCurrentStockPrices.bind(this);
        this.sendStocks = this.sendStocks.bind(this);
    }

    componentDidMount(){
        this.getPortfolioStocks(this.props.portfolio)
        .then(stocks => {
            if (stocks.length){
                console.log('stocks',stocks)
                this.fetchCurrentStockPrices(stocks)
                .then(_ => {
                    console.log(this.state)
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
            body: JSON.stringify(obj)
        })
        .then(r => r.json())
        .catch(err => console.log(err));

    }

    purchaseStock = (stockObj) => {
        fetch(endpoints.IEX + '?symbols=' + stockObj.ticker)
        .then(res => res.json())
        .then(stockArray => {
            console.log(stockArray)
            if (!stockArray.length) {
                this.setState({
                    purchaseFailed: 'No Match'
                })
            } else {

                let buyingPrice = stockArray[0].price;
                let totalCost = buyingPrice * stockObj.quantity;
                if (totalCost < this.props.user.balance) {
                    let updatedBalance = this.props.user.balance - totalCost;
                    let today = new Date().toISOString();
                    let requestBody = {
                        tickerSymbol: stockObj.ticker,
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
                    arr.push(stock)
                })
                return { fullPortfolioStockList: arr}
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
        fetch(endpoints.IEX + '?symbols=' + symbolString)
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

    render(){
        let view;
        if (this.state.view === 'addStock') {
            view = <AddStock 
                user={this.props.user} 
                purchaseStock={this.purchaseStock} />
        }
        return view
    }
}

export default StockViewContainer;
