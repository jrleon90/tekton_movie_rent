import React, { Component } from 'react';
import ShoppingCart from './shoppingCart';

class SideBar extends Component{
    render(){
        return(
            <div>
                <ShoppingCart 
                    cartData={this.props.cartData}
                />
            </div>
        )
    }
}

export default SideBar;