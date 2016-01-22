/* @flow */
import State from './state';
import React from 'react';
import {Router} from 'director';
import TodoFooter from './todoFooter';
import TodoItem from './todoItem';
import TodoModel from './todoModel';
import keys from './keys'

declare class AppState {
	nowShowing: any;
	editing: boolean;
	newTodo: string;
};

type Props = {
	model: TodoModel;
};

type Todo = Todo;


export default class TodoApp extends React.Component<void, Props, AppState> {
	props: Props;
	state: AppState;
	static defaultProps: void;
	constructor(props: Props) {
		super(props);
		this.props = props;
		this.state = {
			nowShowing: State.ALL_TODOS,
			editing: false,
			newTodo: ""
		}
	}

	componentDidMount() {
		let setState = this.setState;
		let router = new Router({
			'/' : setState.bind(this, {nowShowing: State.ALL_TODOS}),
			'/active': setState.bind(this, {nowShowing: State.ACTIVE_TODOS}),
			'/completed': setState.bind(this, {nowShowing: State.COMPLETED_TODOS})
		});
		router.init('/');
	}

	handleChange (event: Event) {
			if (event.target instanceof HTMLInputElement) {
				this.setState({newTodo: event.target.value});
			} else {
				throw new Error('cannot handle todo change');
			}
	}

	handleNewTodoKeyDown (event: Event) {
		if (event.keyCode !== keys.ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = this.state.newTodo.trim();

		if (val) {
			this.props.model.addTodo(val);
			this.setState({newTodo: ''});
		}
	}

	toggleAll(event: Event) {
		if (event.target instanceof HTMLInputElement) {
			var checked = event.target.checked;
			this.props.model.toggleAll(checked);
		}
	}

	toggle(todoToToggle: Todo) {
		this.props.model.toggle(todoToToggle);
	}

	destroy(todo: Todo) {
		this.props.model.destroy(todo);
	}

	edit(todo: Todo) {
		this.setState({editing: todo.id});
	}

	save(todoToSave: Todo, text: string) {
		this.props.model.save(todoToSave, text);
		this.setState({editing: false});
	}

	cancel() {
		this.setState({editing: false});
	}

	clearCompleted() {
		this.props.model.clearCompleted();
	}

	render(): any {
		var footer;
		var main;
		var todos = this.props.model.todos;

		var shownTodos = todos.filter(function (todo) {
			switch (this.state.nowShowing) {
			case State.ACTIVE_TODOS:
				return !todo.completed;
			case State.COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
			}
		}, this);

		var todoItems = shownTodos.map(function (todo) {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={this.toggle.bind(this, todo)}
					onDestroy={this.destroy.bind(this, todo)}
					onEdit={this.edit.bind(this, todo)}
					editing={this.state.editing === todo.id}
					onSave={this.save.bind(this, todo)}
					onCancel={this.cancel.bind(this)}
				/>
			);
		}, this);

		var activeTodoCount = todos.reduce(function (accum, todo) {
			return todo.completed ? accum : accum + 1;
		}, 0);

		var completedCount = todos.length - activeTodoCount;

		if (activeTodoCount || completedCount) {
			footer =
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted.bind(this)}
				/>;
		}

		if (todos.length) {
			main = (
				<section id="main" className="main">
					<input id="toggle-all"
						className="toggle-all"
						type="checkbox"
						onChange={this.toggleAll.bind(this)}
						checked={activeTodoCount === 0}
					/>
					<ul id="todo-list" className="todo-list">
						{todoItems}
					</ul>
				</section>
			);
		}

		return (
			<div>
				<header id="header" className="header">
					<h1>todos</h1>
					<input id="new-todo"
						className="new-todo"
						placeholder="What needs to be done?"
						value={this.state.newTodo}
						onKeyDown={this.handleNewTodoKeyDown.bind(this)}
						onChange={this.handleChange.bind(this)}
						autoFocus={true}
					/>
				</header>
				{main}
				{footer}
			</div>
		);
	}
}