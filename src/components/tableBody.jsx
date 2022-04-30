import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
    renderCell = (item, col) => {
        if(col.content)
            return col.content(item);
        return _.get(item, col.path)
    }

    render() { 
        const {data, columns} = this.props;
        return (
            <tbody>
                {data.map(item => 
                    <tr>
                        {columns.map(col =>
                            <td>
                                {this.renderCell(item, col)}
                            </td>)}
                    </tr>
                    
                )}
            </tbody>
        );
    }
}
 
export default TableBody;