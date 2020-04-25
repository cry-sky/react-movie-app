import React from "react";

class MovieItem extends React.Component{
  constructor(){
    super();

    this.state = {
      willWatch: false
    };
  }
  render(){
      const{ movie, removeMovie, addMovieToWillWatch, removeMovieFromWillWatch } = this.props;
      return(
        <div className="card">
        <div className="card-img"><img style={{width: "100%"}} className="card-img-top"
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ||
          movie.poster_path}`}
          alt='' /></div>
          <div className="card-body">
          <h2 className="card-title" style={{textAlign:"center",dispay:"block",width:"100%",height:"50px",marginBottom:"50px"}}>{movie.title}</h2>
          <p style={{paddingLeft: "15px"}}><strong>Release:</strong> {movie.release_date}</p>
          <div>
          <p style={{paddingLeft: "15px"}}><strong>Rating:</strong> {movie.vote_average} &#128293;</p>
          {this.state.willWatch ? 
               <button type="button" onClick={() => {
                this.setState({
                  willWatch: false
                })
                removeMovieFromWillWatch(movie);
              }}
          style={{position:"absolute",bottom:"10px",right:"10px",border:"solid 1px transparent",padding:"5px",backgroundColor:"rgba(255,100,0,.5)"}}>
          Remove Will Watch
          </button> :
          <button type="button" onClick={() => {
            this.setState({
              willWatch: true
            });
            addMovieToWillWatch(movie);
          }}
          style={{position:"absolute",bottom:"10px",right:"10px",border:"solid 1px transparent",padding:"5px",backgroundColor:"rgba(0,200,0,.5)"}}>
          Add Will Watch
          </button>
          }
          
          </div>
          <button type="button" style={{
            position:"absolute",top:"10px",right:"10px",fontSize:"20px",backgroundColor:"rgba(255,100,100,1)",border:"solid 1px transparent" 
          }} onClick={removeMovie.bind(null, movie)}>
          X
          </button>
          </div>
          </div>
          );
    }
  }


export default MovieItem;
