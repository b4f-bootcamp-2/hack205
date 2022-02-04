import styles from './Navbar.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export function Navbar() {

    let navigate = useNavigate()

    return (
        <div>
            <div className="navbar">
                <span><img src='/icons/histograma-grafico.png' onClick={() => navigate('./')} /></span>
                <span ><img src='/icons/trofeu.png' onClick={() => navigate('/')} /></span>
                <span><img src='/icons/globo.png' onClick={() => navigate('/community')} /></span>
                <span ><img src="/icons/do-utilizador.png" onClick={() => navigate('/profile')} /></span>
            </div>
        </div>
    )
}

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// import styles from './Navbar.css';

// export function Navbar({ total }) {
//     let navigate = useNavigate()

//     const logout = () => {
//         localStorage.removeItem("token");
//         navigate("/");
//     }

//     return (
//         <div className={styles.navbar}>
//             <div className={styles.container}>
//                 {/*<FontAwesomeIcon 
//                     className={styles.icons} 
//                     icon={bw_logo} 
//                     size="3x" 
//                 />*/}
//                 <Link to={localStorage.getItem("token") ? "/collection" : "/"}>
//                     {/* < img src={logo_white_gold} className={styles.logo}/> */}
//                 </Link>
//                 <div className={styles.menu}>
//                     <Link to="/collection">Collection</Link>
//                     {!localStorage.getItem("token") && <Link to="/signup">SignUp</Link>}
//                     {!localStorage.getItem('token') && <Link to="/login">Login</Link>}
//                     <Link to="/about">About Us</Link>
//                 </div>
//                 {localStorage.getItem("token") && <div className={styles.basketProfile}>
//                     <div className={styles.iconWrapper}>
//                         <Link to="/basket">
//                             <FontAwesomeIcon
//                                 className={styles.icons}
//                                 icon={faShoppingBasket}
//                                 size="lg"
//                             />
//                         </Link>
//                         <span
//                             className={styles.badgeCart}
//                         >{total()}</span>
//                     </div>
//                     <Link to="/profile">
//                         <FontAwesomeIcon
//                             className={styles.icons}
//                             icon={faUserCircle}
//                             size="lg"
//                         /></Link>
//                     {localStorage.getItem('token') && <Link to="/" onClick={() => logout()}>Logout</Link>}
//                 </div>}
//             </div>
//         </div>
//     )
// }

export default Navbar;