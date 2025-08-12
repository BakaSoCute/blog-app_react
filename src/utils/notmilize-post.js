export function getNormilizedPosts (todosList) {
    const ids = []
    const byIds = {}
    todosList.map(todo => {
        if (todo.id <= 5) {
            ids.push(todo.id)
            byIds[todo.id] = todo
        }
    })
    return [ids , byIds]
}