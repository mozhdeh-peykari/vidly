import React, { Component, createContext } from 'react';

const ListGroup = (props) =>{
    const{items, onItemSelect, currentFilterId} = props;
    console.log(currentFilterId);

    return (
        <ul className="list-group">
            <li key="-1" 
                className={-1 === currentFilterId ? "list-group-item active" : "list-group-item"}  
                onClick={() => onItemSelect(-1)}>
                    All Genres
            </li>

            {items.map(x => 
                (<li key={x._id} 
                    className={x._id === currentFilterId ? "list-group-item active" : "list-group-item"} 
                    onClick={() => onItemSelect(x._id)}>
                        {x.name}
                 </li>)
                )}
        </ul>);
};
export default ListGroup;