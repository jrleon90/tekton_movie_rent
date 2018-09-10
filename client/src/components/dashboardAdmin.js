import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

class DashboardAdmin extends Component{
    constructor(props){
        super(props);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : '';
        
        this.state = {
            cash: 0,
            cash_sales:0,
            movies: [],
            displayMovie: [],
            availableMovies:[],
            clients:[],
            renderOrder: false,
            clientOrder: []
        }
        this.toggleRenderOrder = this.toggleRenderOrder.bind(this);

    }

    getCashData(){
        axios
            .get('/rent/cash')
            .then((response)=>{
                this.setState({
                    cash: response.data.Response[0].cash,
                    cash_sales:response.data.Response[0].total_rents
                })
            })
    }

    getUsers(){
        axios
            .get('/user')
            .then((response)=>{
                this.setState({clients: response.data})
            })
    }

    getRentMovies(){
        axios
            .get('/rent/movie')
            .then((response)=>{
                response.data.Response.map((id)=>{
                    axios
                        .get(`/movie/${id}`)
                        .then((movieDetail)=>{
                                let movieArray = this.state.movies;
                                movieArray.push(movieDetail.data);
                                this.setState({movies:movieArray})
                        })
                })
            })
    }

    getAvailableMovies(){
        axios
            .get('/available')
            .then((response)=>{
                this.setState({availableMovies: response.data.Response})
            })
    }

    renderAvailable(movie){
        return(
            <tr key={movie._id}>
                <td>{movie.movie_name.toUpperCase()}</td>
            </tr>
        )
    }

    renderRentMovie(movie){
        let movieDisplay = this.state.displayMovie;
        let movieNames = movieDisplay.map((movie)=>{return movie.movie_name})
        let movieFilter = movieNames.filter((item, index,inputArray)=>{
            return inputArray.indexOf(item) == index
        })
        return(
            <tr key={movie._id}>
                <td>{movie.movie_name}</td>
            </tr>
        )
    }

    renderClients(client){
        return(
            <tr key={client._id}>
                <td>{client.first_name.toUpperCase()} {client.last_name.toUpperCase()}</td>
                <td>{client.email}</td>
                <td><button onClick={this.toggleRenderOrder.bind(this.toggleRenderOrder,client)} className="btn btn-primary btn-sm">See Orders</button></td>
            </tr>
        )
    }

    renderClientOrders(order){
        let orderDate = new Date(order.date);
        return(
        <tr key={order._id}>
            <td>{orderDate.toLocaleDateString()}</td>
            <td>{order.payment_type}</td>
            <td>{order.shipping_type}</td>
            <td>${order.total}</td>
        </tr>
        )
    }

    toggleRenderOrder(client){
        axios
            .get(`/rent/client/${client._id}`)
            .then((response)=>{
                console.log(response);
                this.setState({
                    renderOrder: !this.state.renderOrder,
                    clientOrder: response.data.Response
                })
            })
            .catch((err)=>{
                this.setState({
                    renderOrder: !this.state.renderOrder,
                    clientOrder: []
                })
            })

    }

    componentDidMount(){
        this.getCashData();
        this.getRentMovies();
        this.getAvailableMovies();
        this.getUsers();
    }
    render(){
        if(this.state.movies.length === 0 && this.state.availableMovies.length === 0 && this.state.clients.length === 0){
            return(
                <h1>Loading...</h1>
            )
        }else {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>Cash Flow</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Total Cash Sales</th>
                                            <th>Total Cash</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.state.cash_sales}</td>
                                            <td>${this.state.cash}</td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                        <div className="col-md-4">
                            <h3>Rent Movies</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Movie Title</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.movies.map((movie)=>{
                                        })}
                                    </tbody>
                                </table>
                        </div>
                        <div className="col-md-4">
                            <h3>Available Movies</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Movie Title</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.availableMovies.map((movie)=>{
                                            return this.renderAvailable(movie)
                                        })}
                                    </tbody>
                                </table>
                        </div>
                        <div className="col-md-5">
                            <h3>Orders</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Client Name</th>
                                        <th>Client Email</th>
                                        <th>Orders</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.clients.map((client)=>{return this.renderClients(client)})}
                                </tbody>
                            </table>
                        </div>
                        {this.state.clientOrder.length === 0 &&
                            <h3>No orders</h3>
                        }
                        {this.state.renderOrder && 
                            this.state.clientOrder.length > 0 &&
                            <div className="col-md-6">
                                <h3>Order</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Payment Type</th>
                                            <th>Shipping Type</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.clientOrder.map((order)=>{return this.renderClientOrders(order)})}
                                    </tbody>
                                </table>
                            </div>    
                        }
                    </div>
                </div>
            )
        }
    }
}

export default DashboardAdmin;