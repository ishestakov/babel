import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './todoItem.js';

let app = app || {};

class TodoApp extends React.Component<Props, TodoItem> {
	constructor(props) {
		super(props);
		this.state = {
			nowShowing: app.ALL_TODOS,
			editing: null,
			newTodo: 42
		}
	}

	// componentDidMount() {
	// 	let setState = this.setState;
	// 	let router = Router({
	// 		'/' : setState.bind(this, {nowShowing: app.ALL_TODOS}),
	// 		'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
	// 		'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
	// 	});
	// 	router.init('/');
	// }

	render() {
		return (<div><TodoItem todo={this.state} /></div>)
	}
}



app.todoApp = new TodoApp();

(function(){
	ReactDOM.render(<TodoApp />, document.getElementById('react'));
})();

