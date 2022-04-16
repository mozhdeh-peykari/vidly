import React, { Component } from "react";
import {
  deleteMovie,
  getMovie,
  getMovies,
  saveMovie,
} from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import { filter } from "../utils/filter";

export class Movies extends Component {
  constructor() {
    super();
  }
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenreId: -1
  };

  componentDidMount(){
      this.setState({movies: getMovies(), genres: getGenres()});
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

  handleGenreSelect = (genreId) => {
      this.setState({currentGenreId: genreId});
  };

  render() {
    //const { length: count } = this.state.movies;
    const { movies: allMovies, currentPage, pageSize, currentGenreId } = this.state;
    const filterdMovies = filter(allMovies, currentGenreId);
    const count = filterdMovies.length;
    const movies = paginate(filterdMovies, currentPage, pageSize);
    return (
      <div className="mt-5 row">
          <div className="col-2">
              <ListGroup
                items={this.state.genres}
                onItemSelect={this.handleGenreSelect}
                currentFilterId={this.state.currentGenreId}
              >

              </ListGroup>
          </div>
          <div className="col-10">
        {this.getLength()}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m._id}>
                <td key={m.title}>{m.title}</td>
                <td key={m.genre.name}>{m.genre.name}</td>
                <td key={m.numberInStock}>{m.numberInStock}</td>
                <td key={m.dailyRentalRate}>{m.dailyRentalRate}</td>
                <td>
                  <Like
                    onClick={() => this.handleToggleHeart(m)}
                    liked={m.liked}
                  ></Like>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(m)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          itemsCount={count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
          currentPage={this.state.currentPage}
        ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
