import React, { Component } from 'react';
import Like from "./common/like";

class MoviesTable extends Component {
  
  raiseSort = (path) => {
    const sortColumn = {...this.props.sortColumn};
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else{
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  render() { 
 
    const { movies, onDelete, onLike } = this.props;

    return (  <table className="table">
    <thead>
      <tr>
        <th scope="col" onClick={() => this.raiseSort('title')}>Title</th>
        <th scope="col" onClick={() => this.raiseSort('genre.name')}>Genre</th>
        <th scope="col" onClick={() => this.raiseSort('numberInStock')}>Stock</th>
        <th scope="col" onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
        <th scope="col" onClick={() => this.raiseSort('title')}></th>
        <th scope="col" onClick={() => this.raiseSort('title')}></th>
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
}
 

export default MoviesTable;