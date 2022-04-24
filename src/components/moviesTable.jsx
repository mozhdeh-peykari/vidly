import React, { Component } from 'react';
import Like from "./common/like";

const MoviesTable = (props) => {
    const { movies, onDelete, onLike, onSort } = props;

    return (  <table className="table">
    <thead>
      <tr>
        <th scope="col" onClick={() => onSort('title')}>Title</th>
        <th scope="col" onClick={() => onSort('genre.name')}>Genre</th>
        <th scope="col" onClick={() => onSort('numberInStock')}>Stock</th>
        <th scope="col" onClick={() => onSort('dailyRentalRate')}>Rate</th>
        <th scope="col" onClick={() => onSort('title')}></th>
        <th scope="col" onClick={() => onSort('title')}></th>
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