import "./Post.css"
const d = new Date()
const showTime = 
    ':' + d.getFullYear()
    + ':' + d.getHours() 
    + ':' + d.getMinutes() 
function formatDate (date) {
    let dd = date.getDay()
    if (dd < 10) dd = "0" + dd
    let mm = date.getMonth()
    if (mm < 10) mm = "0" + (mm + 1)
    return dd + ":" + mm + showTime
}

export function Post ({
    post,


    }){
    
    return (
        <div className="post">
            <p>{formatDate(d)}</p>
            <h3 className="post_title">{post.title}</h3>
            <p className="post_body">{post.body}</p>
        </div>
    )
}