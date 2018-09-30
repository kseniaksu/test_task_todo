import React, { Component } from 'react';

// used in Header.js
export const addLoggerHOC = (WrappedComponent) => {
	return class addLoaderHOC extends Component {
		render() {
			console.log("addLoggerHOC");
			console.log(this.props);
			return <WrappedComponent {...this.props}  newProp="Hello"/>
		}
	} 
}


// used in Stats.js
export const addPropLoggerHOC = (propToLog) => (WrappedComponent) => {
	return class addLoaderHOC extends Component {
		render() {
			console.log("addPropLoggerHOC for " + propToLog);
			console.log(this.props[propToLog]);
			return <WrappedComponent {...this.props}/>
		}
	} 
}