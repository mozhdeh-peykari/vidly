import React, { Component } from 'react';
import Like from "./common/like";

const MoviesTable = (props) => {
    const { movies, onDelete, onLike } = props;

    return (  <table className="table">
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
              onClick={() => onLike(m)}
              liked={m.liked}
            ></Like>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete(m)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table> );
}
 
export default MoviesTable;