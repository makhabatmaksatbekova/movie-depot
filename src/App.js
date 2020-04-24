import React from 'react';
import './App.css';
import Header from './components/Header';
import Ad from './components/Ad';
import Result from './components/Result';
import SearchNav from './components/SearchNav';
import ShowMore from './components/ShowMore';

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
    const adtitle = ["Blade Runner 2049", "Gladiator", "Get", "Date"];
    // default ad poster
    fetch(`http://www.omdbapi.com/?s=${adtitle[0]}&page=1&apikey=cb289192`)
        .then(res => res.json())
        .then(adData => {
          this.setState({adData})
      })  
        // change ad poster every couple seconds
    this.interval = setInterval(()=>{
      const rdm = parseInt(Math.floor(Math.random()*4));
      const randomAd = adtitle[rdm];
      fetch(`http://www.omdbapi.com/?s=${randomAd}&page=1&apikey=cb289192`)
        .then(res => res.json())
        .then(adData => {
          this.setState({adData})
      })  
    }, 10000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
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
  getInfo = (movie) => {
    // const title = e.target.value;
    console.log(movie)
  }

  render() {
    const { Response } = this.state.rawData;
    const { rawData, movies, title, error, page, adData } = this.state;

    let data;
    let totalResults;
    let ad; 

    // ad movie
    if (adData.Search) {
      const adMovie = this.state.adData.Search[0];
      ad = (
            <div className="add-content">
              <img src={adMovie.Poster} id="ad-poster" alt="poster for ad movies" />
            </div>
        )
    }
    

    if (Response === "True") {
      totalResults = rawData.totalResults;

      data =  movies.map((movie, ind) => {
                return (
                  <div key={ind} className="movie-content">
                    <img src={movie.Poster} className="poster" alt="poster of movies" onClick={() => this.getInfo(movie)}/>
                      <h5>Title: {movie.Title}</h5>
                      <p>Year: {movie.Year}</p>
                      <p>Type: {movie.Type}</p>
                  </div>
                  )
              })
    } else {
      data = <div>{rawData.Error}</div>
    }

    return (
      <div className="app">
        <Header />
        <SearchNav 
          handleChange={this.handleChange} 
          handleClick={this.handleClick} 
          title={title} 
          error={error} />
        <Ad ad={ad}/>
        <Result 
          totalResults={totalResults} 
          data={data} />
        {
          page >= 1 && Response === "True" ? 
            (<ShowMore loadMoreMovies={this.loadMoreMovies}/>): null
        }

      </div>
    );   
  }

}

export default MovieDepot;
