import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovies } from '../actions/index';
import SideBar from './sidebar';
import axios from 'axios';
import _ from 'lodash';


class Dashboard extends Component{
    constructor(props){
        super(props);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : '';

        let cartCount = sessionStorage.getItem('cartCount') ? parseInt(sessionStorage.getItem('cartCount')) : 0;
        let selectedMov = sessionStorage.getItem('selectedMovies') ? JSON.parse(sessionStorage.getItem('selectedMovies')) : [];
        this.state = {
            movies : [],
            cart: {
                total_item: cartCount,
                selectedMovies: selectedMov
            },
        }

        this.updateCart = this.updateCart.bind(this);
    }
    componentDidMount(){
        //this.props.getMovies();
        axios
            .get('/movie')
            .then(results=>{
                this.setState({movies: results.data})
            })

    }

    updateCart(movie){
        const newVal = this.state.cart.total_item + 1;
        let Movies = this.state.cart.selectedMovies;
        Movies.push(movie);
        sessionStorage.setItem('cartCount',newVal);
        sessionStorage.setItem('selectedMovies', JSON.stringify(Movies));
        this.setState({cart:{
            total_item:newVal,
            selectedMovies: Movies
        }})
    }

    renderMovieItem(movie){
        if(_.find(this.state.cart.selectedMovies,{_id:movie._id})===undefined && movie.quantity > 0){
            return(
                <div className="col-md-3" key={movie._id}>
                    <div className="card mb-6 box-shadow">
                        <Link to={`/movie/${movie._id}`}>
                            <img className="card-img-top" src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg" />
                        </Link>
                        <div className="card-body">
                            <p className="card-text">
                                {movie.movie_name.toUpperCase()}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" onClick={this.updateCart.bind(this.updateCart,movie)} className="btn btn-sm btn-outline-secondary">Add to Cart</button>
                                    <Link to={`/movie/${movie._id}`}>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            <div className="col-md-3 disabledbutton" key={movie._id}>
            <div className="card mb-6 box-shadow">
                <Link to={`/movie/${movie._id}`}>
                    <img className="card-img-top" src="https://www.barakashop.co.za/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/a/matrix_poster.jpg" />
                </Link>
                <div className="card-body">
                    <p className="card-text">
                        {movie.movie_name.toUpperCase()}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Add to Cart</button>
                            <Link to={`/movie/${movie._id}`}>
                                <button type="button" className="btn btn-sm btn-outline-secondary">View More</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
    }

    render(){
        if(this.state.movies.length === 0){
            return(
                <h1>Loading...</h1>
            )
        }else {
            return(
                <div>
                    <h1>Client Rent Movie App</h1>
                    <main>
                        <div className="row">
                            <div className="col-md-3">
                                <SideBar 
                                    cartData={this.state.cart}
                                />
                            </div>
                            <div className="col-md-9">
                                <div className="album py-5 bg-light">
                                    <div className="container">
                                        <div className="row">
                                            {this.state.movies.map((movie)=> {return this.renderMovieItem(movie)})}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = {
    getMovies
}
export default connect(null,mapDispatchToProps)(Dashboard);