import React, { Component } from 'react'

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: 'All Genres',
            movies: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let data = JSON.parse(localStorage.getItem('movies') || '[]');
        let tempArr = [];
        data.forEach((movieObj) => {
            if (genreids[movieObj.genre_ids[0]] !== undefined && (!tempArr.includes(genreids[movieObj.genre_ids[0]])))
                tempArr.push(genreids[movieObj.genre_ids[0]])
        })
        tempArr.unshift("All Genres");
        //console.log(tempArr);
        this.setState({
            genres: [...tempArr],
            movies: [...data]
        })
    }

    handleGenre = (genre) => {
        this.setState({
            currgen: genre
        })
    }

    handleDelete = (id) => {
        let temp = this.state.movies.filter((m) => m.id !== id);

        this.setState({
            movies: [...temp]
        })

        localStorage.setItem('movies', JSON.stringify(temp));
    }

    popularityAsc = () => {
        let list = this.state.movies;
        list.sort((objA, objB) => {
            return objA.popularity - objB.popularity;
        })
        this.setState({
            movies: [...list]
        })
    }

    popularityDesc = () => {
        let list = this.state.movies;
        list.sort((objA, objB) => {
            return objB.popularity - objA.popularity;
        })
        this.setState({
            movies: [...list]
        })
    }


    ratingAsc = () => {
        let list = this.state.movies;
        list.sort((objA, objB) => {
            return objA.vote_average - objB.vote_average;
        })
        this.setState({
            movies: [...list]
        })
    }

    ratingDesc = () => {
        let list = this.state.movies;
        list.sort((objA, objB) => {
            return objB.vote_average - objA.vote_average;
        })
        this.setState({
            movies: [...list]
        })
    }


    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10759: 'War', 37: 'Western'
        };

        let filteredMovies = [];
        if (this.state.currText === '') {
            filteredMovies = this.state.movies
        } else {
            filteredMovies = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title || movieObj.original_name;
                return title.includes(this.state.currText);
            })
        }

        if (this.state.currgen !== "All Genres") {
            filteredMovies = this.state.movies.filter((movieObj) => this.state.currgen === genreids[movieObj.genre_ids[0]])
        }

        let pages = Math.ceil(filteredMovies.length / this.state.limit);
        let pageArr = [];
        for (let i = 1; i <= pages; i++)
            pageArr.push(i);
        let si = (this.state.currPage - 1) * this.state.limit;
        let li = si + this.state.limit;

        filteredMovies = filteredMovies.slice(si, li);

        return (
            <>
                <div className='main'>
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <ul class="list-group favourite-genre">
                                {
                                    this.state.genres.map((genre) => (
                                        this.state.currgen === genre ?
                                            <li class="list-group-item" style={{ color: 'white', background: '#396dcc', fontWeight: 'bold' }}>{genre}</li>
                                            :
                                            <li class="list-group-item" style={{ color: '#396dcc', background: 'white' }} onClick={() => this.handleGenre(genre)}>{genre}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-lg-9 col-sm-12 favourite-table">
                            <div className="row">
                                <input type="text" className='input-group-text col' placeholder='search' value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                                <input type="number" className='input-group-text col' placeholder='rows limit' value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })} />
                            </div>

                            <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.popularityDesc} />Popularity<i class="fa-solid fa-sort-down" onClick={this.popularityAsc} /></th>
                                            <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.ratingDesc} />Rating<i class="fa-solid fa-sort-down" onClick={this.ratingAsc} /></th>
                                            <th scope='col'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredMovies.map((movieObj) => (
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: "5rem" }} />{movieObj.original_title}{movieObj.original_name}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {
                                        pageArr.map((page) => (
                                            <li class="page-item"><a class="page-link" onClick={() => this.setState({ currPage: page })}>{page}</a></li>
                                        ))
                                    }
                                </ul>
                            </nav>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
