import React, { Component } from 'react';
import Table from './common/table';
import Like from "./common/like";


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
    

    return ( 
      <Table
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
      data={movies}/> );

  }
}
 

export default MoviesTable;