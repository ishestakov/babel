/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import keys from './keys';
import classNames from 'classnames';
import TodoModel from './todoModel';

type TodoItemProps = {
	todo: Todo;
	editing: ?boolean;
// callback methods	
	onEdit: () => any;
	onCancel: () => any;
	onToggle: () => any;
	onDestroy: () => any;
	onSave: () => any;
};

declare class TodoItemState {
	editText: string;
};

type Todo = Todo;


export default class TodoItem extends React.Component<void, TodoItemProps, TodoItemState> {
	state: TodoItemState;
	props: TodoItemProps;
	constructor (props: TodoItemProps) {
		super(props);
		this.state = {editText: props.todo.title};
	}

	handleSubmit(event: Event)  {
		const val = this.state.editText.trim();
		if (val) {
			this.props.onSave(val);
			this.setState({editText: val});
		} else {
			this.props.onDestroy();
		}
	};

	handleEdit() {
		this.props.onEdit();
		this.setState({editText: this.props.todo.title});
	};

	handleKeyDown(event: Event) {
		if (event.which === keys.ESCAPE_KEY) {
			this.setState({editText: this.props.todo.title});
			this.props.onCancel(event);
		} else if (event.which === keys.ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange(event: Event) {
		if (this.props.editing && event.target instanceof HTMLInputElement) {
			this.setState({editText: event.target.value});
		}
	};

	/**
	 * This is a completely optional performance enhancement that you can
	 * implement on any React component. If you were to delete this method
	 * the app would still work correctly (and still be very performant!), we
	 * just use it as an example of how little code it takes to get an order
	 * of magnitude performance improvement.
	 */
	shouldComponentUpdate(nextProps: Todo, nextState: any): boolean {
		return (
			nextProps.todo !== this.props.todo ||
			nextProps.editing !== this.props.editing ||
			nextState.editText !== this.state.editText
		);
	}

	/**
	 * Safely manipulate the DOM after updating the state when invoking
	 * `this.props.onEdit()` in the `handleEdit` method above.
	 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
	 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	 */
	componentDidUpdate(prevProps: any) {
		if (!prevProps.editing && this.props.editing) {
			var node = ReactDOM.findDOMNode(this.refs.editField);
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		}
	}

	render(): any {
		return (
			<li className={classNames({
					completed: this.props.todo.completed,
					editing: this.props.editing
			})}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={this.props.todo.completed}
						onChange={this.props.onToggle.bind(this)}
					/>
					<label onDoubleClick={this.handleEdit.bind(this)}>
						{this.props.todo.title}
					</label>
					<button className="destroy" onClick={this.props.onDestroy.bind(this)} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.state.editText}
					onBlur={this.handleSubmit.bind(this)}
					onChange={this.handleChange.bind(this)}
					onKeyDown={this.handleKeyDown.bind(this)}
				/>
			</li>
		);
	}
}

