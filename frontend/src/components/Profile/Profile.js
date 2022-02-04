import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

export function Profile() {
    // const { user, setUser } = useState("")

    // useEffect(() => {
    //     getUser()
    // }, [])

    // async function getUser() {
    //     const userInfo = await fetch("/user", {
    //         method: "GET",
    //         headers: {
    //             "authorization": `a ${localStorage.getItem('token')}`
    //         }
    //     });
    //     const res = await userInfo.json();
    //     setUser(res)
    // }

    return (
        <div>
            <div className="container">
                <span className="profilepic"><img src={require("./Images/profilepic.png")} width="150px" height="150px"></img></span>
                <span className="name">NOME</span>
                <div className="table">
                    <span className="profileoptions">ok</span>
                    <span className="profileoptions">ok</span>
                    <span className="profileoptions">ok</span>
                    <span className="profileoptions">ok</span>
                    <span className="profileoptions">ok</span>
                    <span className="profileoptions">ok</span>
                </div>
            </div>
        </div>
    )
}

// import React, { useState, useEffect } from "react";

// import avatar from '../../../imagemBanner/avatar.png';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera, faUser, faPortrait, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import styles from "./Profile.module.css";

// const Profile = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [user, setUser] = useState({});

//     useEffect(() => {
//         getUser()
//     }, [])

//     async function getUser() {
//         const userInfo = await fetch("/user", {
//             method: "GET",
//             headers: {
//                 "authorization": `a ${localStorage.getItem('token')}`
//             }
//         });
//         const res = await userInfo.json();
//         setUser(res)
//     }

//     return (
//         <div className={styles.square}>
//             <img src={avatar} className={styles.avatarPerfil} />
//             <div className={styles.image}>
//                 <label className={`${styles.switch} ${styles.switchPlace}`}>
//                     <input
//                         type="file"
//                         value={selectedFile}
//                         onChange={(e) => setSelectedFile(e.target.files[0])}
//                     />
//                     <span><FontAwesomeIcon
//                         className={styles.cameraIcon}
//                         icon={faCamera}
//                     /></span>
//                 </label>
//             </div>

//             <div className={styles.infos}>
//                 <h4><FontAwesomeIcon icon={faUser} size="lg" className={styles.icon} />{user.name}</h4>
//                 <h4><FontAwesomeIcon icon={faPortrait} size="lg" className={styles.icon} />{user.avatarName}</h4>
//                 <h4><FontAwesomeIcon icon={faEnvelope} size="lg" className={styles.icon} />{user.email}</h4>
//             </div>
//         </div>
//     );
// };

// export default Profile;