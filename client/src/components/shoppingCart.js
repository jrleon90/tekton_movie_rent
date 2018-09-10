import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {

    render() {
        console.log('cart',this.props)
        return (
            <div className="cart">
                <div className="dropdown">
                    <Link
                        to='/checkout'
                        className="btn btn-inverse btn-block btn-lg">
                        <i className="fa fa-fa-shopping-cart" />
                        <span>{this.props.cartData.total_item} item(s) - {5*this.props.cartData.total_item}$</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ShoppingCart;
