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
import _ from 'lodash';

export class Movies extends Component {
  constructor() {
    super();
  }
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {path:'title', order:'asc'}
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

  handleSort = (sortColumn) => {
      this.setState({sortColumn});
  };

  getPagedData = () => {
    const { movies: allMovies, currentPage, pageSize, selectedGenre, sortColumn } = this.state;
    const filteredMovies = selectedGenre && selectedGenre._id ? allMovies.filter(x => x.genre._id === selectedGenre._id) : allMovies;
    const sorted = _.orderBy(filteredMovies, sortColumn.path, sortColumn.order);
    
    const movies = paginate(sorted, currentPage, pageSize);
    return {totalCount: filteredMovies.length, movies};
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;

    const {totalCount, movies} = this.getPagedData();

    if (totalCount === 0) {
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
          <p>Showing {totalCount} items in the database</p>
        <MoviesTable 
          movies={movies}
          onLike={this.handleToggleHeart}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        ></Pagination>
        </div>
      </div>
    );
            }
  }
}

export default Movies;
