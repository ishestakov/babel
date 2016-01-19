/* @flow weak */
import React from 'react';
import Utils from './utils.js'
import State from './state.js'

export default class TodoFooter extends React.Component<void, any, any> {
	render() {
			var activeTodoWord = Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					<button id="clear-completed"
						className="clear-completed"
						onClick={this.props.onClearCompleted}>
						Clear completed
					</button>
				);
			}

			var nowShowing = this.props.nowShowing;
			return (
				<footer id="footer" className="footer">
					<span id="todo-count" className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
					<ul id="filters" className="filters">
						<li>
							<a
								href="#/"
								className={classNames({selected: nowShowing === State.ALL_TODOS})}>
									All
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/active"
								className={classNames({selected: nowShowing === State.ACTIVE_TODOS})}>
									Active
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/completed"
								className={classNames({selected: nowShowing === State.COMPLETED_TODOS})}>
									Completed
							</a>
						</li>
					</ul>
					{clearButton}
				</footer>
			);
		}
}