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
   {key: 'like', content: movie => <Like onClick={() => this.props.onLike(movie)} liked={movie.liked}></Like>},
   {key: 'delete', content: movie => <button type="button" className="btn btn-danger" onClick={() => this.props.onDelete(movie)}>Delete</button>}
 ]

    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    

    return (  <table className="table">
    <TableHeader 
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
      />
    <TableBody
      data={movies}
      columns={columns}
      />
  </table> );

  }
}
 

export default MoviesTable;