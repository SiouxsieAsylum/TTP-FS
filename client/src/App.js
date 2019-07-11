import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './components/Landing';
import LogOut from './components/Logout';
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
      authType: null,
      user: {},
      portfolio: {}
    }

    this.authHandler = this.authHandler.bind(this);
    this.authRemover = this.authRemover.bind(this);
    this.setAuthType = this.setAuthType.bind(this);
    this.setStockView = this.setStockView.bind(this);
    this.setUserOnState = this.setUserOnState.bind(this);
    this.autoAuthSessionRestore = this.autoAuthSessionRestore.bind(this);
    this.updateUserBalance = this.updateUserBalance.bind(this);
    this.setTokenOnLocalStorage = this.setTokenOnLocalStorage.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem('sessionToken');
    if (token){
      let expiryDate = localStorage.getItem('sessionExpiry');
      let expiryDateObj = new Date(expiryDate);
      let today = new Date();
  
      if (today < expiryDateObj){
        this.autoAuthSessionRestore(token);
      } else {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem('sessionExpiry');
      }
    }

    return null;
  }

  autoAuthSessionRestore(token){
    fetch(`/api/user/session/${token}`)
    .then(res => res.json())
    .then(allData => {
      this.setUserOnState(allData)
    })
    .catch(err => {
      console.log(err)
    })
  }

  setUserOnState = (fetchData) => {
    localStorage.removeItem('authType');
    this.setState((prevState) =>{
      return {
        isLoggedIn: true,
        loginAttemptFailed: false,
        authType: null,
        user: Object.assign(prevState.user, fetchData.user),
        portfolio: Object.assign(prevState.portfolio, fetchData.portfolio),
      }
    })
  }

  setTokenOnLocalStorage = (user) => {
    localStorage.setItem('sessionToken', user.sessiontoken);
    localStorage.setItem('sessionExpiry', user.sessionexpiry);

    delete user.sessionToken
    delete user.sessionExpiry

    return user;
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
          loginAttemptFailed: 'User Found'
        })
      } else {
        alldata.user = this.setTokenOnLocalStorage(alldata.user);
        this.setUserOnState(alldata);
      }
    })
    .catch((err) =>{
      this.setState({
        loginAttemptFailed: 'User Not Found'
      })
    })
  }

  authRemover = () => {
    fetch(`/api/user/logout/${this.state.user.userid}`)
    .then(res => {
      this.setState({
        isLoggedIn: false,
        user: {},
        portfolioId: null
      })
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('sessionExpiry');

    })
    .catch(err => console.log(err))
  }

  updateUserBalance = (balance) => {
    let reqBody = {
      balance: balance
    }
    return fetch('api/user/purchase', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(user => {
      console.log(user)
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
      currentView = <Route exact path={"/:auth"} render={()=>(
        <Auth
        setAuthType={this.setAuthType}
        isLoggedIn={this.state.isLoggedIn}
        authType={this.state.authType}
        authHandler={this.authHandler}
        loginAttemptFailed={this.state.loginAttemptFailed} />
      )}/>

    } else {
        currentView = <Route path="/portfolio" render={()=>(
          <StockViewContainer
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            portfolio={this.state.portfolio}
            updateUserBalance={this.updateUserBalance}
            />
        )}/>

    }
    return (
      <Router>
        <div className="img-container">
          <div className="App page page-color">
            <NavBar 
              setAuthType={this.setAuthType}
              logout={this.authRemover}
              setStockView={this.setStockView}
              isLoggedIn={this.state.isLoggedIn}
              user={this.state.user}
              />
              <Route exact path="/" render={()=>(   
                <Landing
                  isLoggedIn={this.state.isLoggedIn} 
                  />       
              )}/>

              <Route exact path="/logout" render={()=>(
                <LogOut />
              )} />
              
              { currentView }

          
            <footer>
              <span className="icon-attribution">Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a> | Photo by Carlos Muza on Unsplash</span>
            </footer>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
