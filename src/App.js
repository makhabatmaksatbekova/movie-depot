import React from 'react';
import './App.css';

class MovieDepot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: [],
      movies: [],
      title: '',
      error: '',
      page: 1,

      adData: []

    }
  }

  componentDidMount() {
    const adTitle = "Blade Runner 2049"
    fetch(`http://www.omdbapi.com/?s=${adTitle}&page=1&apikey=cb289192`)
      .then(res => res.json())
      .then(adData => {
        this.setState({adData})
    })
  }
  handleClick = () => {
    const { title }  = this.state;

    if(title.length > 0) {
    fetch(`http://www.omdbapi.com/?s=${title}&page=1&apikey=cb289192`)
      .then(res => res.json())
      .then(rawData => {
        this.setState({ rawData, movies: rawData.Search, title: title, page: 1  })
      })
    } else {
       this.setState({error: 'title shouldn\'t be empty', rawData: []})
       setTimeout(() => {
        this.setState({error: '' })
       }, 2000)
    }
  }

  loadMoreMovies = () => {
    const { title }  = this.state;
    let { page }  = this.state;
    // get the next page
    let nextPage = page + 1;

    fetch(`http://www.omdbapi.com/?s=${title}&page=${nextPage}&apikey=cb289192`)
      .then(res => res.json())
      .then(pgData => {
        if (pgData.Search && pgData.Search.length) {
          this.setState({
            movies: [
              ...this.state.movies,
              ...pgData.Search
              ],
              page: nextPage,
          })
        }

    })
  }

  handleChange = (e) => {
    const title = e.target.value;
    this.setState({title})
  }
  render() {

    let data;
    let totalResults;
    let movies;
    let ad; 

    if (this.state.adData.Search) {
      const adMovie = this.state.adData.Search[0];
      ad = (
            <div className="add-content">
              <img src={adMovie.Poster} id="ad-poster" alt="poster of ad movies" />
            </div>
        )
    }
    if (this.state.rawData.Response === "True") {
      totalResults = this.state.rawData.totalResults;
      movies = this.state.movies;


      data =  movies.map((movie, ind) => {
                return (
                  <div key={ind} className="movie-content">
                    <img src={movie.Poster} className="poster" alt="poster of movies" />
                    <h5>Title: {movie.Title}</h5>
                    <p>Year: {movie.Year}</p>
                    <p>Type: {movie.Type}</p>
                  </div>
                  )
              })
    } 
    if (this.state.rawData.Response === "False") {
      data = <div>{this.state.rawData.Error}</div>
    }

    return (
      <div className="app">

        <header>
          <h3 id="title-header">Movie Depot</h3>
        </header>

        <section>
          <div className="search-div">
            <input type="text" id="search"  onChange={this.handleChange} value={this.state.title}/>
            <button onClick={this.handleClick}>Search</button> 
          </div>

          <div className="error-display">
            <span>{this.state.error}</span>
          </div>
        </section>

        <section className="movie-ad" >
        <p>Don't miss! <span id="ad-text">Ad</span></p>
          {ad}
        </section>

        <section className="container">
          <div className="total-results">
          {
            totalResults && <p> Total results: <span style={{color: "red"}}>{totalResults}</span></p> 
          }
          </div>
          <div className="movies-container">
            {
              data
            }
          </div>
        </section>
        {
          this.state.page >= 1 && this.state.rawData.Response === "True" ? ( <div className="load-more">
                                    <p onClick={this.loadMoreMovies}>show more</p>
                                  </div>): null
        }

      </div>
    );   
  }

}

export default MovieDepot;
