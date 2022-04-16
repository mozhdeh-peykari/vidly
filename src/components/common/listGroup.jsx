import React, { Component, createContext } from 'react';

const ListGroup = (props) =>{
    const{items, textProperty, valueProperty, onItemSelect, currentFilterId} = props;
    console.log(currentFilterId);

    return (
        <ul className="list-group">
            <li key="-1" 
                className={-1 === currentFilterId ? "list-group-item active" : "list-group-item"}  
                onClick={() => onItemSelect(-1)}>
                    All Genres
            </li>

            {items.map(x => 
                (<li key={x[valueProperty]} 
                    className={x._id === currentFilterId ? "list-group-item active" : "list-group-item"} 
                    onClick={() => onItemSelect(x[valueProperty])}>
                        {x[textProperty]}
                 </li>)
                )}
        </ul>);
};
export default ListGroup;