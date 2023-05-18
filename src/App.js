import React, { useState } from "react";
import './App.css'


const App = () => {

  const [query, setQuery] = useState('')

  // Define first button handler
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("This happend: ", event.target);
    console.log("id: ", query);

    GetSingleData();
  };

  // define second button handler
  const handleClick = (event) => {
    event.preventDefault();
    console.log("This happend: ", event.target);

    GetMovieData();
  };

  const [results, setResults] = useState([])

  const GetMovieData = () => {
    fetch("http://localhost:8080/api/getall")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data.movies);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  };

  const GetSingleData = () => {
    fetch("http://localhost:8080/api/getone/:id")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data.movies);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  };


  const modifyMovie = () => {
    console.log("Query: " + query)
    fetch("http://localhost:8080/api/update/:id" + query,{
      method: 'PUT'
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log("Results: ", data);
        const items = data;
        console.log("One movie: ", data);

        setResults(items)
      });
  };

  // Movies in array
  const MovieArray = (props) => {
    const { data } = props;
    //console.log("Data received:", data);
    


    // Movie image
    let posterImg;

    // Check poster
    const CheckPoster = (props) => {
      let poster = props.src;
      // If movie poster doesn't exist
      if (poster === "" || poster === null) {
        posterImg = "https://openvirtualworlds.org/omeka/files/fullsize/1/30/movie-big.jpg";
      } else {
        posterImg = poster;
      }
      // Return movie image
      return (
        <img
          src={posterImg}
          alt="Poster"
          className="img-thumbnail"
          
          onError={(e) => { e.target.onerror = null; e.target.src = "https://openvirtualworlds.org/omeka/files/fullsize/1/30/movie-big.jpg" }}
          width="50%"
        />
      );
    };

    
    return (
      <div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr key={props.id}>
              <th scope="col">Title</th>
              <th scope="col">Year</th>
              <th scope="col">Directors</th>
              <th scope="col">Rating</th>
              <th scope="col">Poster</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr>
                <td key={i}> {item.title}</td>
                <td> {item.year} </td>
                <td> {item.directors} </td>
                <td> {item.imdb.rating}</td>
                {/*  Create image*/}
                <td id="pic">
                  <CheckPoster src={item.poster} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  // This is the return for the form
  return (
    <div>
      <h1>Find or modify movies</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Search/set: </label>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="form-control"
              placeholder="Set id: "
              name="query"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <button
              type="button"
              className="btn"
              onClick={handleClick}
            >
              Search all
            </button>
            <button
              type="button"
              className="btn"
              onClick={modifyMovie}
            >
              Modify movie
            </button>
          </div>
        </form>
      </div>
      <MovieArray data={results} />
    </div>
  );
};




export default App;