/* @flow weak*/
import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './todoItem.js';
import TodoModel from './todoModel.js'
import {Router} from 'director';
import keys from './keys.js'
import TodoFooter from './todoFooter.js'
import TodoApp from './todoApp.js'

(function(){
	const model = new TodoModel('react-todos');
	
	function render() {
		ReactDOM.render(<TodoApp model={model} />, document.getElementsByClassName('todoapp')[0]);
	}

	model.subscribe(render);
	render();
})();

