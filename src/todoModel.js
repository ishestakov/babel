/* @flow */
import Utils from './utils';

declare class Todo {
	id: string,
	title: string,
	completed: boolean
};

class TodoModel {
	key: string;
	todos: Array<Todo>;
	onChanges: Array<any>;

	constructor(key: string) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	}

	subscribe(onChange: any) {
		this.onChanges.push(onChange);
	}

	inform ()  {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) { cb(); });
	}

	addTodo (title: string) {
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
			completed: false
		});

		this.inform();
	}

	toggleAll (checked: boolean)  {
		// Note: it's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map() and filter() everywhere instead of mutating the array or
		// todo items themselves.

		this.todos = this.todos.map(function (todo: Todo) {
			return Utils.extend({}, todo, {completed: checked});
		});
		this.inform();
	}

	toggle (todoToToggle: Todo)  {
		this.todos = this.todos.map(function (todo: Todo) {
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});
		this.inform();
	}

	destroy (todo: Todo) {
		this.todos = this.todos.filter(function (candidate: Todo) {
			return candidate !== todo;
		});
		this.inform();
	}

	save (todoToSave: Todo, text: string)  {
		this.todos = this.todos.map(function (todo: Todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});
		this.inform();
	}

	clearCompleted ()  {
		this.todos = this.todos.filter(function (todo: Todo) {
			return !todo.completed;
		});
		this.inform();		
	}
}	

export {TodoModel as default};
