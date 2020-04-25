import React from 'react';
// import { moviesData } from "./moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api"
import MovieTabs from "./MovieTabs"


class App extends React.Component {
	constructor(){
		super();

		this.state = {
			movies:[],
			moviesWillWatch:[],
			sort_by: "popularity.desc",
			page:1
			

		};
		// this.removeMovie = this.removeMovie.bind(this);
	}
	componentDidMount() {
		this.getMovie();
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("didUpdate");
		if (prevState.sort_by !== this.state.sort_by){
			this.getMovie();
		}
		if (prevState.page !== this.state.page){
			this.getMovie();
		}
	}

	getMovie = () => {
		fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			console.log("data", data);
			this.setState({
				data:data,
				movies:data.results,
				page:data.page,
				total_pages:data.total_pages,
			});
		});
	}


	removeMovie = movie => {
		const updateMovies = this.state.movies.filter(function(item) {
			return item.id !== movie.id;
		});
		const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function(item) {
			return item.id !== movie.id;
		});
		this.setState({
			movies: updateMovies,
			moviesWillWatch: updateMoviesWillWatch
		});
	}

	addMovieToWillWatch = movie =>{
		const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];
		this.setState({
			moviesWillWatch: updateMoviesWillWatch
		})

	};

	removeMovieFromWillWatch = movie => {
		const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function(item) {
			return item.id !== movie.id;
		});
		this.setState({
			moviesWillWatch: updateMoviesWillWatch
		});
	};
	updateSortBy = value => {
		this.setState({
			sort_by:value
		});
	};

	updatePage = value => {
		const page=this.state.page;
		const total_pages=this.total_pages;
		const moviesWillWatch=this.state.moviesWillWatch;
		const movies=this.state.movies;
		if (page >= 1 || page <= total_pages) {
			this.setState({
				page:value	
			})
	}
	// for(var i=0;i<moviesWillWatch.length;i++){
	// 	for(var j=0;j<movies.length;j++){
	// 		if(moviesWillWatch[i].id===movies[j].id){
	// 			console.log('1')
	// 		}
	// 	}
	// }
}

	render(){
		return (
			<div className='container'>
			<div id="top" col-1>
			
			<MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy} />
			
			<div style={{display:"flex",justifyContent:"center",padding:"5px"}}> 
			<span style={{position:"relative"}}><a 
			className={this.state.page === 1 ? 'disabled' : ''}
			onClick={() => this.updatePage(this.state.page - 1)}
			style={{position:"absolute",top:"0",left:"-100%",fontSize:"20px",backgroundColor:"transparent",border:"transparent 1px solid",textDecoration:"none"}}>&larr;</a>
			<span style={{fontSize:"20px"}}>{this.state.page}</span> in <span style={{fontSize:"20px"}}>{this.state.total_pages}</span> <a 
			className={this.state.page === this.state.total_pages ? 'disabled' : ''}
			onClick={() => this.updatePage(this.state.page + 1)}
			style={{position:"absolute",top:"0",right:"-100%",fontSize:"20px",backgroundColor:"transparent",border:"transparent 1px solid",textDecoration:"none"}}>&rarr;</a>
			</span>
			</div>
			
			<div>
			{this.state.movies.map(movie => {
				return (<MovieItem 
					key={movie.id} 
					movie={movie} 
					removeMovie={this.removeMovie}
					addMovieToWillWatch={this.addMovieToWillWatch}
					removeMovieFromWillWatch={this.removeMovieFromWillWatch}
					/>
					);
			})}
			</div>
			
			<div style={{display:"flex",justifyContent:"center",padding:"5px",position:"relative"}}> 
			<span style={{position:"relative"}}><a href="#top" 
			className={this.state.page === 1 ? 'disabled' : ''}
			onClick={() => this.updatePage(this.state.page - 1)}
			style={{position:"absolute",top:"0",left:"-100%",fontSize:"20px",backgroundColor:"transparent",border:"transparent 1px solid",textDecoration:"none"}}>&larr;</a>
			<span style={{fontSize:"20px"}}>{this.state.page}</span> in <span style={{fontSize:"20px"}}>{this.state.total_pages}</span> <a  href="#top"
			className={this.state.page === this.state.total_pages ? 'disabled' : ''}
			onClick={() => this.updatePage(this.state.page + 1)}
			style={{position:"absolute",top:"0",right:"-100%",fontSize:"20px",backgroundColor:"transparent",border:"transparent 1px solid",textDecoration:"none"}}>&rarr;</a>
			</span></div>
			</div>
			
				<div col-2>
			<h1 style={{display:"block",width:"160px"}}>Movies: {this.state.moviesWillWatch.length}</h1>
			<ul>
			{this.state.moviesWillWatch.map(movie => (
				<li className="moviesWillWatch">
				<div>
				<p style={{textAlign:"center"}}>{movie.title}</p> 
				<p style={{marginLeft:"40%"}}>&#128293; {movie.vote_average}</p>
				</div>
				</li>
				))}
			</ul>
			</div>
			</div>
			)
	}
}
export default App;
