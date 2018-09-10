import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';

class Checkout extends Component {
    constructor(props){
        super(props);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : '';

        let cartCount = sessionStorage.getItem('cartCount') ? parseInt(sessionStorage.getItem('cartCount')) : 0;
        let selectedMov = sessionStorage.getItem('selectedMovies') ? JSON.parse(sessionStorage.getItem('selectedMovies')) : [];
        let currentUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : [];
        
        this.state = {
                total_item: cartCount,
                selectedMovies: selectedMov,
                user: currentUser
            }

        this.renderCartContent = this.renderCartContent.bind(this);
        this.removeItemFromCart = this.removeItemFromCart.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    removeItemFromCart(movie){
        let movArray = _.filter(this.state.selectedMovies,(o)=>{return o._id !== movie._id});
        let items = this.state.total_item - 1;
        sessionStorage.setItem('cartCount', items);
        sessionStorage.setItem('selectedMovies',JSON.stringify(movArray));
        this.setState({
            total_item: items,
            selectedMovies: movArray
        })
    }

    renderTableRow(movie){
        return(
            <tr className="item-checkout" key={movie._id}>
                <td className="first-column-checkout">
                    <img
                        className="product-image"
                        src="#"
                        />
                </td>
                <td>{movie.movie_name.toUpperCase()}</td>
                <td>$5</td>
                <td>
                    <button className="btn btn-danger" onClick={this.removeItemFromCart.bind(this.removeItemFromCart,movie)}>Remove</button>
                </td>
            </tr>
        )
    }

    renderCartContent(){
        if(this.state.total_item === 0){
            return(
                <div>Your Cart is empty</div>
            )
        }else{
            return(
                <div className="table-responsive">
                    <table className="table">
                        <thead align="center">
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Options</th>
                        </thead>
                        <tbody>
                            {this.state.selectedMovies.map((movie)=>{return this.renderTableRow(movie)})}
                        </tbody>
                        <tfoot>
                            <tr align="center">
                                <td></td>
                                <td></td>
                                <td>Items: {this.state.total_item}</td>
                                <td>Total: ${5*this.state.total_item}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let movieIds = this.state.selectedMovies.map((movie)=>{return movie._id})
        axios.post('/rent',{
            client_id: this.state.user._id,
            payment_type: e.target.payment.value,
            shipping_type: e.target.shipping.value,
            total: parseInt(this.state.total_item) * 5,
            detail: movieIds
        }).then((data)=>{
            this.setState({
                selectedMovies: [],
                total_item: 0
            });
            sessionStorage.setItem('cartCount',this.state.total_item);
            sessionStorage.setItem('selectedMovies',JSON.stringify(this.state.selectedMovies));
        })

    }

    renderSideBarCheckout(){
        return(
            <div>
                <Link className="btn btn-info" to="/dashboard">
                    <span>Continue looking for movies</span>
                </Link>
                {
                    this.state.total_item > 0 &&
                        <div>
                            <button className="btn btn-danger">Clean Cart</button>
                            <form name="rentForm" onSubmit={this.handleSubmit}>
                                <h5>Payment Method</h5>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="radio"
                                        name="payment"
                                        id="cash"
                                        value="Cash" />
                                    <label className="form-check-label" htmlFor="cash">Cash</label>
                                    <input 
                                        className="form-check-input" 
                                        type="radio"
                                        name="payment"
                                        id="card"
                                        value="Credit_Card" />
                                    <label className="form-check-label" htmlFor="card">Credit Card</label>
                                </div>
                                <h5>Shipping Method</h5>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" 
                                        type="radio"
                                        name="shipping"
                                        id="pick"
                                        value="PickUp" />
                                    <label className="form-check-label" htmlFor="pick">Pick Up</label>
                                    <input 
                                        className="form-check-input" 
                                        type="radio"
                                        name="shipping"
                                        id="shipping"
                                        value="Shipping" />
                                    <label className="form-check-label" htmlFor="shipping">Shipping</label>
                                </div>
                                <button className="btn btn-primary">Rent Movie(s)</button>
                            </form>
                        </div>
                }
            </div>
        )
    }

    renderRentForm(){

    }

    render() {
        return (
            <div className='view-container'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-9'>
                            {this.renderCartContent()}
                        </div>
                        <div className='col-md-3 btn-user-checkout'>
                            {this.renderSideBarCheckout()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;
