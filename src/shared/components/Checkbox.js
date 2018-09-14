import React from 'react';
import ReactDom from 'react-dom';

function Checkbox(props) {
        return (
            <button className="checkbox icon" onClick={props.onChange}>
                <i className="material-icons">{props.checked ? 'check_box' : 'check_box_outline_blank'}</i>
            </button>
        )

}

// Checkbox.PropTypes = {
//     checked: React.PropTypes.bool.isRequired,
//     onChange: React.PropTypes.func.isRequired
// }


export default Checkbox;