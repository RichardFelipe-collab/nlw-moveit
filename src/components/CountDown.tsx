import { useState, useEffect } from 'react'
import styles from '../styles/components/CountDown.module.css'

//varivel global tipagem global
let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(25 * 60);
  const [isactive, setIsActive] = useState(false);

  const [hasFinished, setHasfinished] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(25 * 60)
  }

  useEffect(() => {
    if (isactive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isactive && time === 0) {
      setHasfinished(true);
      setIsActive(false);

    }
  }, [isactive, time])
  return (
    <div>
      <div className={styles.contdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado

        </button>
      ) : (
          <>
            { isactive ? (
              <button type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar Ciclo

              </button>
            ) : (
                <button type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar Ciclo

                </button>
              )
            }
          </>)}



    </div>
  )
}