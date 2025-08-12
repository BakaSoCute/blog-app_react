import "./AddPost.css"
function AddPost ({
    title,
    onAddPost,
    onToggleTitle,
    onToggleBody
}) {
    return(
        <div className="addpost">
            <h2>{title}</h2>
            <input
            type="text"
            onChange={(e) => onToggleTitle(e)}
            className="addpost_title"
            />
            <input
            type="text"
            onChange={(e) => onToggleBody(e)}
            className="addpost_description"
            />
            <button onClick={onAddPost}>Опубликовать пост</button>
        </div>
    )
}

export default AddPost