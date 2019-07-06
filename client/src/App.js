import React, { Component } from 'react';


import NavBar from './components/NavBar';
import Auth from './components/Auth';
import StockViewContainer from './components/StockViewContainer';

import './App.css';
import { throws } from 'assert';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      loginAttemptFailed: false,
      authType: 'login', //TODO: set to null
      user: {},
      portfolio: {}
    }

    this.authHandler = this.authHandler.bind(this);
    this.authRemover = this.authRemover.bind(this);
    this.setAuthType = this.setAuthType.bind(this);
    this.setStockView = this.setStockView.bind(this);
    this.updateUserBalance = this.updateUserBalance.bind(this);
  }

  setStockView = (type) => {
    this.setState({
      stockView: type
    })
  }

  setAuthType = (type) => {
    this.setState({
      authType: type
    })
  }

  authHandler = (user) => {
    fetch(`/api/user/${this.state.authType}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then((alldata)=>{
      if (this.state.authType === 'register' && alldata.userExists){
        this.setState({
          loginAttemptFailed: true
        })
      } else {
          this.setState((prevState) =>{
          return {
            isLoggedIn: true,
            loginAttemptFailed: false,
            authType: null,
            user: Object.assign(prevState.user, alldata.user),
            portfolio: Object.assign(prevState.portfolio, alldata.portfolio)
          }
        })
      }
    })
    .catch((err) =>{
      this.setState({
        loginAttemptFailed: true
      })
    })
  }

  authRemover = () => {
    fetch('/api/user/logout')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoggedIn: false,
        user: {},
        portfolioId: null
      })
    })
    .catch()
  }

  updateUserBalance = (balance) => {
    return fetch('api/user/purchase', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        userId: this.state.user.userId,
        balance: balance
      }
    })
    .then(user => {
      this.setState(prevState => {
        user: Object.assign(prevState.user, user)
      })
      return user;
    })
    .catch(err => console.log(err));
  }
  
  render (){

    let currentView;
    if (!this.state.isLoggedIn){
      currentView = <Auth
        authType={this.state.authType}
        authHandler={this.authHandler}
        loginAttemptFailed={this.state.loginAttemptFailed}
        />
    } else {
      currentView = <StockViewContainer
        user={this.state.user}
        portfolio={this.state.portfolio}
        updateUserBalance={this.updateUserBalance}
        />
    }

    return (
      <div className="App">
        <NavBar 
          setAuthType={this.setAuthType}
          setStockView={this.setStockView}
          isLoggedIn={this.isLoggedIn}
          user={this.user}
          />
        {currentView}
      
        <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
      </div>
    );
  }
}

export default App;
