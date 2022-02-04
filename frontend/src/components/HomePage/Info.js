import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Info.module.css';
export function Info() {

  


        return (<div className={styles.div}>
            <h2>Fact Sheet</h2>
            <p>The Pomodoro Technique was developed in the late 1980s by then university student Francesco Cirillo. Cirillo was struggling to focus on his studies and complete assignments. Feeling overwhelmed, he asked himself to commit to just 10 minutes of focused study time. Encouraged by the challenge, he found a tomato (pomodoro in Italian) shaped kitchen timer, and the Pomodoro technique was born.</p>
            <br />
            
                <p>Try the Pomodoro Technique if you...</p>
                <br/>

                <p>- Find little distractions often derail the whole workday</p>
                <br/>

                <p>- Consistently work past the point of optimal productivity</p>
                <br/>

                <p>- Have lots of open-ended work that could take unlimited amounts of time (e.g., studying for an exam, research for a blog post, etc.)</p>
                <br/>

                <p>- Are overly optimistic when it comes to how much you can get done in a day (aren't we all 🙃)</p>
                <br/>

                <p>- Enjoy gamified goal-setting</p>
                <br/>

                <p>- Really like tomatoes</p>
        </div>)
    }

    export default Info;