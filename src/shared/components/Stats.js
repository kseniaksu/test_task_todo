import React from 'react';
import ReactDom from 'react-dom';

function Stats(props) {
    let total = props.todos.length;
    let completed = 0;
    completed = props.todos.filter(todo => todo.completed).length;
    let notcompleted = total - completed;
    return (
        <table className="stats">
            <tbody>
              <tr>
                  <th>All Tasks:</th>
                  <td>{total}</td>
              </tr>
              <tr>
                  <th>Completed</th>
                  <td>{completed}</td>
              </tr>
              <tr>
                  <th>Remaining:</th>
                  <td>{notcompleted}</td>
              </tr>
            </tbody>
        </table>
    )
}
// Stats.propTypes = {
//     todos: React.PropTypes.array.isRequired
// };
export default Stats;