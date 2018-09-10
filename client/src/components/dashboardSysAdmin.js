import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMovie, createCastMember, deleteMovie } from '../actions/index';
import axios from 'axios';

class DashboardSysAdmin extends Component {
    constructor(props){
        super(props);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : '';
        
        this.state = {
            movie_name: '',
            year: '',
            synopsis: '',
            quantity:0,
            cast: [],
            selectedCastId: [],
            selectedCast: [],
            castName:'',
            castLastName:'',
            movies: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSelectedCast = this.updateSelectedCast.bind(this);
        this.handleCastSumbit = this.handleCastSumbit.bind(this);
        this.deleteMovieHandler = this.deleteMovieHandler.bind(this);
    }

    componentDidMount(){
        this.getCastMembers();
        this.getMovies();
    }

    getMovies(){
        axios
            .get('/movie')
            .then((response)=>{
                this.setState({movies:response.data})
            })
    }

    getCastMembers(){
        axios
            .get('/cast')
            .then((response)=>{
                this.setState({cast: response.data})
            })
    }

    deleteMovieHandler(id){
        this.props.deleteMovie(id);
        this.getMovies();
    }

    renderMovies(movie){
        return(
            <tr key={movie._id}>
                <td>{movie.movie_name.toUpperCase()}</td>
                <td><button onClick={this.deleteMovieHandler.bind(this.deleteMovieHandler,movie._id)} className="btn btn-danger btn-sm">Remove</button></td>
            </tr>
        )
    }

    handleSubmit(e){
        e.preventDefault();
        let {movie_name,year,synopsis,quantity} = this.state;
        let cast = this.state.selectedCastId;
        if(movie_name && year && synopsis && quantity){
            this.props.createMovie(movie_name,year,synopsis,quantity,cast);
            this.setState({
                movie_name: '',
                year: '',
                synopsis: '',
                quantity:0,
                selectedCast: [],
                selectedCastId: []
            });
            this.getMovies();
        }
    }

    handleCastSumbit(e){
        e.preventDefault();
        let name = this.state.castName;
        let lastName = this.state.castLastName;
        this.props.createCastMember(name,lastName);
        this.setState({
            castName: '',
            castLastName: ''
        })
        this.getCastMembers();
        
    }

    updateSelectedCast(cast){
        let actualStateId = this.state.selectedCastId;
        let actualState = this.state.selectedCast;
        actualStateId.push(cast._id);
        actualState.push(cast);
        this.setState({
            selectedCastId: actualStateId,
            selectedCast: actualState
        });
    }

    renderSelectedCast(cast){
        return(
            <li key={cast._id} className="list-group-item">
                {cast.name.toUpperCase()} {cast.last_name.toUpperCase()}
            </li>
        )
    }

    renderCastList(cast){
        return(
            <tr key={cast._id}>
                <td>{cast.name.toUpperCase()}</td>
                <td>{cast.last_name.toUpperCase()}</td>
                <td>
                    <button onClick={this.updateSelectedCast.bind(this.updateCast,cast)} className="btn btn-success btn-sm">Add</button>
                </td>
            </tr>
        )
    }

    render() {
        let {movie_name,year,synopsis,quantity} = this.state;
        let castName = this.state.castName;
        let castLastName = this.state.castLastName;
        if(this.state.cast.length === 0 || this.state.movies.length === 0){
            return(
                <h1>Loading...</h1>
            )
        }else{
            return (
                <div className="row">
                    <div className="jumbotron col-md-3">
                        <h2 align="center">Add a Movie</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="movie_name">Movie Title</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="movie_name"
                                    onChange={e=>this.setState({movie_name:e.target.value})}
                                    value={movie_name}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="synopsis">Movie Synopsis</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="synopsis"
                                    onChange={e=>this.setState({synopsis:e.target.value})}
                                    value={synopsis}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Release Year</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="year"
                                    onChange={e=>this.setState({year:e.target.value})}
                                    value={year}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity Available</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="quantity"
                                    onChange={e=>this.setState({quantity:e.target.value})}
                                    value={quantity}
                                />
                            </div>
                            <div className="form-group">
                                <ul className="list-group">
                                    {this.state.selectedCast.map((cast)=>{return this.renderSelectedCast(cast)})}
                                </ul>
                            </div>
                            <button className="btn btn-primary btn-lg">Add Movie</button>
                        </form>
                    </div>
                    <div className="col-md-3">
                        <h3>Cast List</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Last Name</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cast.map((castData)=>{return this.renderCastList(castData)})}    
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3">
                        <h3>Add a New Cast member</h3>
                        <form onSubmit={this.handleCastSumbit}>
                        <div className="form-group">
                                <label htmlFor="castName">First Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="castName"
                                    onChange={e=>this.setState({castName:e.target.value})}
                                    value={castName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="castLastName">Last Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="castLastName"
                                    onChange={e=>this.setState({castLastName:e.target.value})}
                                    value={castLastName}
                                />
                            </div>
                            <button className="btn btn-success btn-md">Add Cast Member</button>
                        </form>
                    </div>
                    <div className="col-md-3">
                        <h3>Remove Movies</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Movie Name</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.movies.map((movie)=>{return this.renderMovies(movie)})}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

const mapDispatchToProps = {
    createMovie,
    createCastMember,
    deleteMovie
}

export default connect(null,mapDispatchToProps)(DashboardSysAdmin);
