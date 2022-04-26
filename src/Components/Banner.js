import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Banner extends Component {
    render() {
        //console.log(movies);
        let movieArr = movies.results[0];
        return (
            <>
                {
                    movieArr === '' ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div className="card banner-card">
                            <img src={`https://image.tmdb.org/t/p/original${movieArr.backdrop_path}`} className="card-img-top banner-img" alt="..." />
                            <h1 className="card-title banner-title">{movieArr.original_title}</h1>
                            <p className="card-text banner-text">{movieArr.overview}</p>
                        </div>
                }
            </>
        )
    }
}
