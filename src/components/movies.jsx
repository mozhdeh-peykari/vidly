import React, { Component } from "react";
import {
  deleteMovie,
  getMovie,
  getMovies,
  saveMovie,
} from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

export class Movies extends Component {
  constructor() {
    super();
  }
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount(){
    const genres = [{ _id: "", name: "All Movies" }, ...getGenres()];
    this.setState({movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  handleToggleHeart = (movie) => {
    const m = getMovie(movie._id);
    const m2 = { ...m };
    m2.liked = !m.liked;
    saveMovie(m2);
    this.setState({ movies: getMovies() });
  };

  getLength = () => {
    if (this.state.movies.length === 0) {
      return <p>There are no items in the table</p>;
    } else {
      return <p>Showing {this.state.movies.length} items in the database</p>;
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
      this.setState({selectedGenre: genre, currentPage: 1});
  };

  render() {
    const { length: count } = this.state.movies;
    const { movies: allMovies, currentPage, pageSize, selectedGenre } = this.state;
    const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(x => x.genre._id === selectedGenre._id) : allMovies;
    //const count = filterdMovies.length;
    const movies = paginate(filteredMovies, currentPage, pageSize);

    if (filteredMovies.length === 0) {
      return <p>There are no items in the table</p>;
    }

    else{
    return (
      <div className="mt-5 row">
          <div className="col-2">
              <ListGroup
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
                selectedItem={this.state.selectedGenre}
              >

              </ListGroup>
          </div>
          <div className="col-10">
          <p>Showing {filteredMovies.length} items in the database</p>
        <MoviesTable 
          movies={movies}
          onLike={this.handleToggleHeart}
          onDelete={this.handleDelete}
        />
        <Pagination
          itemsCount={filteredMovies.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        ></Pagination>
        </div>
      </div>
    );
            }
  }
}

export default Movies;
