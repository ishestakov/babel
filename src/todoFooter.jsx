/* @flow  */
import React from 'react';
import Utils from './utils';
import State from './state';
import classNames from 'classnames';

export class FooterProps {
	completedCount: number;
	onClearCompleted: ()=> any;
	nowShowing: any;
	count: number;
};

export default class TodoFooter extends React.Component <void, FooterProps, void> {
	constructor(props: FooterProps) {
		super(props);
		this.props = props;
	}

	render(): void {
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