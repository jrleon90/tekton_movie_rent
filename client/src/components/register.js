import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../actions/index';

class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            name:'',
            last_name:'',
            email:'',
            password:''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let {name,last_name,email,password} = this.state;
        if(name && last_name && email && password){
            this.props.signUp(name,last_name,email,password,'Client');
        }
        
    }

    render(){
        let {name,last_name,email,password} = this.state;
        return(
            <div className="container">
                <div className="jumbotron mx-auto col-md-6">
                    <h1 align="center">Movie Rent Application</h1>
                    <h2 align="center">Register</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name"
                                onChange={e=>this.setState({name:e.target.value})} 
                                value={name}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="last_name" 
                                onChange={e=>this.setState({last_name:e.target.value})}
                                value={last_name}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                onChange={e=> this.setState({email: e.target.value})}
                                value={email}
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                onChange={e=> this.setState({password: e.target.value})}
                                value={password}
                                />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>
                            <Link to="/login" className="btn btn-link">Log In</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signUp
}

export default connect(null,mapDispatchToProps)(Register);