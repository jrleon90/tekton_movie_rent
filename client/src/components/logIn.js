import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {logIn, getMovies} from '../actions/index';


class LogIn extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({submitted:true});

        if(this.state.email && this.state.password){
            const request = this.props.logIn(this.state.email,this.state.password);
            console.log(request);

        }
    }

    render(){
        let {email, password, submitted} = this.state;
        return(
            <div className="container">
                <div className="jumbotron mx-auto col-md-6">
                    <h1 align="center">Movie Rent Application</h1>
                    <h2 align="center">Log In</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                onChange={e=>this.setState({email:e.target.value})}
                                value={email}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                onChange={e=>this.setState({password:e.target.value})}
                                value={password}
                                />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Log In</button>
                            <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    
}

const mapDispatchToProps = {
    logIn,
    getMovies
}


export default connect(null,mapDispatchToProps)(LogIn)