import React, { Component } from 'react';
import { deleteMovie, getMovie, getMovies, saveMovie } from "../services/fakeMovieService";
import Like from './common/like';

export class Movies extends Component{
constructor(){
    super();
}
  state = {
    movies : getMovies()
};

handleDelete = movie => {
    deleteMovie(movie._id);
    this.setState({movies: getMovies()});
};

handleToggleHeart = (movie) => {
     const m = getMovie(movie._id);
     const m2 = {...m};
     m2.liked = !m.liked;
     saveMovie(m2);
     this.setState({movies: getMovies()});
};

getLength = () => {
    if (this.state.movies.length === 0)
    {
        return <p>There are no items in the table</p>;
    }
    else
    {
        return <p>Showing {this.state.movies.length} items in the database</p>
    }
}


render(){
    const liked = false;
    return (<div>

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
  {this.state.movies.map(m => 
            <tr key={m._id}>
                <td key={m.title}>{m.title}</td>
                <td key={m.genre.name}>{m.genre.name}</td>
                <td key={m.numberInStock}>{m.numberInStock}</td>
                <td key={m.dailyRentalRate}>{m.dailyRentalRate}</td>
                <td>
                        <Like
                            onClick ={() => this.handleToggleHeart(m)}
                            liked={m.liked}>
                        </Like>
                </td>
                <td>
                    <button type="button" className="btn btn-danger" 
                        onClick={() => this.handleDelete(m)}>
                    Delete
                    </button>
                </td>
            </tr>)}
      </tbody>
</table>

</div>     
        );
}
}



export default Movies;