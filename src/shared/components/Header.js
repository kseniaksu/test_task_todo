import React from 'react';
import ReactDom from 'react-dom';

import Stats from "./Stats";

function Header(props) {
    return (
        <header>
            <Stats todos={props.todos}/>
            <h1><span>{props.subtitle}</span> {props.title}</h1>
        </header>
    )
}

// Header.propTypes = {
//     title: React.PropTypes.string.isRequired,
//     todos: React.PropTypes.array.isRequired
// };
// Header.defaultProps = {
//     title: "React Todo"
// }

export default Header;