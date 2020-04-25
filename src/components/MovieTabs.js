import React from "react";

const MovieTabs = (props) =>{
	const { sort_by, updateSortBy } = props;
	const handleClick = (value) =>{
		return (event => {
			updateSortBy(value);
		})	
	}
	const getClassLink = (value) => {
		return `${sort_by === value ? "active" : "" }`
	}
	return(
		<div className="tabs">
		<button className={getClassLink("popularity.desc")}
		onClick={handleClick("popularity.desc")}
		>Popularity desc</button>
		<button className={getClassLink("revenue.desc")}
		onClick={handleClick("revenue.desc")}
		>Revenuen desc</button>
		<button className={getClassLink("vote_average.desc")}
		onClick={handleClick("vote_average.desc")}
		>Vote average desc</button>
		</div>
		)
}

export default MovieTabs