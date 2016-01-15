let app = app || {};

declare class TodoItem {nowShowing: string, editing: ?boolean, newTodo: string}

class TodoApp extends React.Component<Props, TodoItem> {
	constructor(props) {
		super(props)
	}

	getInitialState (): TodoItem {
		return {
			nowShowing: app.ALL_TODOS,
			editing: null,
			newTodo: 42
		}
	}

	componentDidMount() {
		let setState = this.setState;
		let router = Router({
			'/' : setState.bind(this, {nowShowing: app.ALL_TODOS}),
			'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
			'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
		});
		router.init('/');
	}
}

app.todoApp = new TodoApp();