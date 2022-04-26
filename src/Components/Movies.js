import React, { Component } from 'react'
//import { movies } from './getMovies'
import axios from 'axios'

export default class Banner extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }


    async componentDidMount() {
        // will do all sideeffects
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=428f13d190bc912093f35e9bf2f7a63c&page=${this.state.currPage}`);
        let data = res.data;
        console.log(data.results);
        this.setState({
            movies: [...data.results]
        })
        console.log("mounting done");
    }


    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=428f13d190bc912093f35e9bf2f7a63c&page=${this.state.currPage}`);
        let data = res.data;
        //console.log(data.results);
        this.setState({
            movies: [...data.results]
        })
    }


    handleNext = () => {
        let tempArr = []
        for (let i = 1; i <= this.state.parr.length + 1; i++)
            tempArr.push(i);

        this.setState({             // this is async fun
            parr: [...tempArr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)
    }


    handlePrev = () => {
        if (this.state.currPage !== 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }


    handleClick = (value) => {
        if (value !== this.state.currPage) {
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }

    handleFavourite = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]');
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((m) => m.id !== movie.id)
        } else {
            oldData.push(movie);
        }
        localStorage.setItem('movies', JSON.stringify(oldData));
        //console.log(oldData);
        this.handleFavouriteState();
    }

    handleFavouriteState = () => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]');
        let tempArr = oldData.map((movie) => movie.id);
        this.setState({
            favourites: [...tempArr]
        })
    }

    render() {
        //console.log(movies);
        //let movieArr = movies.results;
        console.log("render done");
        return (
            <>
                {
                    this.state.movies.length === 0 ?
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div>
                            <h3 className='text-center'><strong>Trending</strong></h3>
                            <div className='movie-list'>
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movie-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: movieObj.id })}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..." />
                                            <h5 className="card-title movie-title">{movieObj.original_title}{movieObj.original_name}</h5>
                                            <div className="button-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                {
                                                    this.state.hover === movieObj.id &&
                                                    <a className="btn btn-primary movie-button" onClick={() => this.handleFavourite(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove from Favourite" : "Add To Favourite"}</a>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.handlePrev} >Previous</a></li>
                                        {
                                            this.state.parr.map((value) => (
                                                <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                                            ))
                                        }
                                        <li class="page-item"><a class="page-link" onClick={this.handleNext} >Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}
