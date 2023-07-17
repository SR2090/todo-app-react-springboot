export default function ListTodoComponent() {
    const today = new Date();
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth() + 1, today.getDate());
    const todos = [
        { id: 1, name: 'Complete assignment', isDone : false, targetDate : targetDate },
        { id: 2, name: 'Go grocery shopping', isDone : false, targetDate : targetDate },
        { id: 3, name: 'Call a friend', isDone : false, targetDate : targetDate },
        { id: 4, name: 'Read a book', isDone : false, targetDate : targetDate },
        { id: 5, name: 'Exercise for 30 minutes', isDone : false, targetDate : targetDate },
      ];


      return (
        <div className='container'>
            <h1>Things you want to do</h1>
            <table className='table'>
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>IsDone ?</th>
                <th>Target Date</th>
                </tr>
            </thead>
            <tbody>
                {todos && todos.map(todo =>
                    <tr key={todo.id}>
                        <td>{todo.id}</td>
                        <td>{todo.name}</td>
                        <td>{todo.isDone.toString()}</td>
                        <td>{todo.targetDate.toDateString()}</td>
                    </tr>
                )}
            </tbody>
            </table>

        </div>
      )
}
