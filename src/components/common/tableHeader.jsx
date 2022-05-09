import React, { Component } from 'react';

class TableHeader extends Component {
   

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

      renderSortIcon = (col) => {
        const sortColumn = {...this.props.sortColumn};
        if (col.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc' />;
        return <i className='fa fa-sort-desc' />;
      };

    render() { 
        return (
            <thead>
            <tr>
                {this.props.columns.map(col => 
                                    <th scope="col" 
                                        className='clickable'
                                        key={col.path || col.key}
                                        onClick={() => this.raiseSort(col.path)}>
                                            {col.title}
                                            {this.renderSortIcon(col)}
                                    </th>)}
            </tr>
            </thead>
        );
    }
}
 
export default TableHeader;