import React from "react"
import "./Rankings.css"
import Comments from "../Comments.js"

export default function Rankings() {

    return (
        <div className="background">
            <h1 className="title">Rankings</h1>
            <div className="wrapper">
                <div className="user">
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>
                    <span>Rui</span>

                </div>
                <div className="hours">
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                    <span>127 hours focused</span>
                </div>
            </div>
            <div className="comments">
                <Comments className="comentario" user="" comments={[]}></Comments>
            </div>
        </div >
    )
}