import { toHaveDisplayValue } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react';
import _ from 'lodash';

const Pagination = props => {
    const {itemsCount, pageSize} = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    
    const pages = _.range(1, pagesCount + 1);
        return (
            <nav>
                <ul className="pagination">
                {pages.map(page => (
                <li key={page} className="page-item">
                        <a className="page-link">
                            {page}
                        </a>
                </li>
                ))}           
                </ul>
            </nav>
        );
};

    // render() { 
    //     var rows = [];
    //     for (var i = 0; i < this.props.totalPages; i++) {
    //         const pageNum = i;
    //         rows.push(
    //                 <li key={i} className="page-item">
    //                         <a className="page-link" onClick ={(event) => shoot("Goal!", event)}>
    //                             {i+1}
    //                         </a>

    //                         <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button>
    //                 </li>);
    //     }
        
    //     return (
    //         <nav aria-label="...">
    //             <ul className="pagination">
    //                 {rows}                
    //             </ul>
    //         </nav>
    //     );
    //};

    // getPageNumber = (num) => {
    //     console.log(this.props.activePageNum);
    //     console.log(Movies.state);
    // }

 

export default Pagination;