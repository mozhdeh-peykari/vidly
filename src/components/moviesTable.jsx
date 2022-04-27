import React, { Component } from 'react';
import Like from "./common/like";
import TableBody from './tableBody';
import TableHeader from './tableHeader';

class MoviesTable extends Component {
  
  render() { 
 const columns =[
   {path: 'title', title: 'Title'},
   {path: 'genre.name', title: 'Genre'},
   {path: 'numberInStock', title: 'Stock'},
   {path: 'dailyRentalRate', title: 'Rate'},
   {key: 'like'},
   {key: 'delete'}
 ]

    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    

    return (  <table className="table">
    <TableHeader 
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
      />
    {/* <TableBody
      data={movies}
      columns={columns}
      /> */}
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