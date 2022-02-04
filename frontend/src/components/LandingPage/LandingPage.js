import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './LandingPage.module.css'
export function LandingPage() {
    let navigate = useNavigate()
    return (<div className={styles.father}><img src="/tomato2.png" />

        <h1>Pomod O'Clock</h1>
        <button className={styles.entry} onClick={() => navigate('/homepage')}>Entry</button>
    </div>)
}

export default LandingPage;
