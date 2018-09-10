import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class MovieItem extends Component {
    constructor(props){
        super(props);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : '';

        this.state = {
            movie: {},
            cast:[]
        }

        this.getCastDetail = this.getCastDetail.bind(this);
    }

    async getCastDetail(){
        const details = this.state.movie.cast.map(async(castId)=>{
            let castDetail = axios.get(`/cast/${castId}`);
            return castDetail;
        })
        Promise.all(details)
            .then((response)=>{
                this.setState({cast:response})
            })
    }

    componentDidMount(){
        axios
            .get(`/movie/${this.props.match.params.id}`)
            .then((result)=>{
                this.setState({movie:result.data})
                this.getCastDetail();
            })
    }

    renderCastMember(memberDetail){
        return(
            <li className="list-group-item">{memberDetail.name.toUpperCase()} {memberDetail.last_name.toUpperCase()}</li>
        )
    }
    render(){
        if(Object.keys(this.state.movie).length === 0 && this.state.cast.length === 0){
            return(
                <h1>Loading...</h1>
            )
        }else {
            return (
                <div className="view-container">
                    <div className="container">
                        <div className="thumbnail">
                            <div className="row">
                                <div className="col-sm-4">
                                    <img 
                                        className="img-responsive product-image"
                                        src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"
                                        alt={this.state.movie.movie_name}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <h4>{this.state.movie.movie_name.toUpperCase()}</h4>
                                    <h5>Release Year</h5>
                                    <p>{this.state.movie.year}</p>
                                    <h5>Synopsis</h5>
                                    <p>{this.state.movie.synopsis}</p>
                                    <h5>Cast</h5>
                                    <ul className="list-group">
                                        {this.state.cast.map((castDetail)=>{return this.renderCastMember(castDetail.data)})}
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                <Link to='/dashboard'>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Go Back</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default MovieItem;