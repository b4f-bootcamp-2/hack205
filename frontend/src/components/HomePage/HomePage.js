import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Info from './Info';
import styles from './HomePage.module.css';
export function HomePage() {

    function Timer() {
        const [total, setTotal] = useState(25 * 60 + 0)
        const [minutos, setMinutos] = useState((total / 1) / 60)
        const [segundos, setSegundos] = useState((total / 1) % 60);
        const [time, setTime] = useState({ minutos: 25, segundos: 0 })
        const [breakTime, setBreakTime] = useState({ minutos: 5, segundos: 0 })
        const [counter, setCounter] = useState(0)
        const [intervalo, setIntervalo] = useState()

        const [isStarted, setIsStarted] = useState(false)

        const minutos2 = time.minutos < 10 ? `0${time.minutos}` : time.minutos
        const segundos2 = time.segundos < 10 ? `0${time.segundos}` : time.segundos

        const start = () => {
            setIsStarted(true)
            setIntervalo(setInterval(() => {
                setTime(t => {
                    if (t.segundos === 0) {
                        if (t.minutos !== 0) {
                            setCounter(t => t + 4)
                            return { segundos: 59, minutos: t.minutos - 1 }
                        } else {
                            setCounter(t => t = 100)
                            return { minutos: 0, segundos: 0 }
                        }
                    }
                    return {
                        segundos: t.segundos - 1,
                        minutos: t.minutos
                    }
                })
            }, 1000));
        };

        const stopTimer = () => {
            clearInterval(intervalo)
        }

        const continueTimer = () => {
            return start()
        }

        return (
            <div>
                <div>
                    <div className={styles.tempo}>{minutos2}:{segundos2}</div>
                    <div>
                        {isStarted === false && <button className={styles.start} onClick={start}>Start</button>}
                        {isStarted === true && <button className={styles.pause} onClick={stopTimer}>Pause</button>}
                        {isStarted === true && <button className={styles.continue} onClick={continueTimer}>Continue</button>}
                    </div>
                    {/* <div className={styles.container}>
                        <h2 className={styles.header}>GRAFICO</h2>
                        <div className={styles.bar}>
                            <svg>
                                <circle cx="50%" cy="50%" r="50%"></circle>
                            </svg>
                            <h1 className={styles.number}>{counter}</h1>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }








    return (
        <div className={styles.wrapper}>
            <span className={styles.i}><img src="/icons/informacoes.png" onClick={() => Navigate("./src/components/HomePage/Info")} /></span>
            <div className={styles.taskList}>

                <h3 className={styles.tasktitle}>Task List</h3>
                <p className={styles.tasks}> 15:30 - Check and answer emails</p>
                <p className={styles.tasks}> 17:00 - Write project</p>
                <p className={styles.tasks}> 19:00 - Build desk</p>

            </div>
            <div className={styles.timer}>{Timer()}</div>


        </div>)
}

export default HomePage;