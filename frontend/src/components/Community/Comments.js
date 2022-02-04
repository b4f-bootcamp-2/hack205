import React, { useState } from 'react';

export default function Comments({ user, comments }) {
    const [commentsArray, setCommentsArray] = useState(comments)
    const [newComment, setNewComment] = useState("")


    const submitAndClean = () => {
        setCommentsArray((s) => [...s, {
            postedBy: user.username,
            date: new Date(),
            text: newComment
        }])
        setNewComment("")
    }

    const onSubmit = e => {
        e.preventDefault()
        submitAndClean()
    }

    console.log(comments)

    return (
        <div>
            <div>
                {commentsArray.map((e, i) => (
                    <div key={i}>
                        <p>By: {e.postedBy}</p>
                        <p>At: {e.date.toString().substring(0, 15)}</p>
                        <p>{e.text}</p>
                    </div>))
                }
            </div>
            <form role="form" onSubmit={(e) => onSubmit(e)}>
                <input
                    type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
                <button>Post</button>
            </form>
        </div>
    )
}