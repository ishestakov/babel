/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './todoItem';
import TodoModel from './todoModel'
import {Router} from 'director';
import keys from './keys'
import TodoFooter from './todoFooter'
import TodoApp from './todoApp'

(function(){
	const model: TodoModel = new TodoModel('react-todos');
	
	function render(): void {
		ReactDOM.render(<TodoApp model={model} />, document.getElementsByClassName('todoapp')[0]);
	}

	model.subscribe(render);
	render();
})();

