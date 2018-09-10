import React, { Component } from 'react';
import './App.css';
import { Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history } from './helpers/history';

import Home from './components/home';
import LogIn from './components/logIn';
import Register from './components/register';
import Dashboard from './components/dashboard';
import MovieItem from './components/movieItem';
import Checkout from './components/checkout';
import DashboardAdmin from './components/dashboardAdmin';
import DashboardSysAdmin from './components/dashboardSysAdmin';
import Orders from './components/orders';

class App extends Component {
  constructor(props){
    super(props);
    let session = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : false;
  
    this.state = {
      session
      }
  }

  checkAuth(rol,comp){
    if(sessionStorage.getItem('token')){
      let currentUser = JSON.parse(sessionStorage.getItem('user'));
      switch(currentUser.rol){
        case 'Client':
          switch(comp){
            case 'Dashboard':
              return <Route component={Dashboard} />
            case 'Movie':
              return <Route component={MovieItem} />
            case 'Checkout':
              return <Route component={Checkout} />
          }
        case 'Admin':
          return <Route component={DashboardAdmin} />
        case 'SysAdmin':
          return <Route component={DashboardSysAdmin} />
      }
    }else{
      return <Redirect to='/login' />
    }
  }
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={()=>(
            <Redirect to='/login' />
          )} />
          <Route path="/login" component={LogIn} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" render={()=>(
            this.checkAuth('Client','Dashboard')
          )}/>
          <Route path="/movie/:id" render={()=>(
            this.checkAuth('Client','Movie')
          )}/>
          <Route path="/checkout" render={()=>(
            this.checkAuth('Client','Checkout')
          )} />
          <Route path="/admin" component={DashboardAdmin} />
        </div>
      </Router>
    );
  }
}

export default App;
