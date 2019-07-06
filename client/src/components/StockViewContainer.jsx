import React, { Component } from 'react';
import AddStock from './AddStock'
import endpoints from '../externals/endpoints'

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
    }

    componentDidMount(){
        this.getPortfolioStocks(this.props.portfolio)
        .then(stocks => {
            if (stocks.length){
                this.fetchCurrentStockPrices()
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

    purchaseStock = (stockObj, updatedBalance) => {
        fetch(endpoints.IEX + '?symbols=' + stockObj.ticker)
        .then(stockArray => {
            if (!stockArray.length) {
                this.setState({
                    purchaseFailed: true
                })
            } else {
                let buyingPrice = stockArray[0].price;
                let today = new Date.now()
                let requestBody = {
                    tickerSymbol: stockObj.ticker,
                    quantity: stockObj.quantity,
                    datePurchased: today,
                    buyingPrice: buyingPrice,
                    portfolioId: this.props.portfolio.portfolioid
                };

                let purchase = fetch('api/stocks/new', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/'
                    },
                    body: requestBody.then(res => res)
                })

                let balanceUpdate = this.props.updateUserBalance(updatedBalance)

                Promise.all([purchase, balanceUpdate])
                .then(_ => {
                    this.getPortfolioStocks(this.state.portfolio)
                    .then(_ => stocks)
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err))

            }
        })
    }

    getPortfolioStocks = (portfolio) => {
        return fetch('/api/portfolio/' + portfolio.portfolioid)
        .then(allStocks => {
            this.setState({
                fullPortfolioStockList: allStocks
            })
            return allStocks;
        })
        .catch(err => console.log(err));
    }

    fetchCurrentStockPrices = () => {
        let allSymbols = [];
        this.state.fullPortfolioStockList.map(stock => {
            allSymbols.push(stock.tickerSymbol)
        })
        let symbolString = allSymbols.join(',');
        fetch(endpoints.IEX + '?symbols=' + symbolString)
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
        let currentView;
        if (this.state.view === 'addStock') {
            currentView = <>
                    <div>
                        <AddStock 
                            user={this.props.user}
                            purchaseStock={this.purchaseStock}
                        />
                        {this.state.purchaseFailed && <h1>Ticker Symbol does not match any known stocks.</h1>}
                    </div>

                </>
        } else {

        }
        return (
            //{currentView}
            <h2>Stocks</h2>
        )
    }

}




export default StockViewContainer