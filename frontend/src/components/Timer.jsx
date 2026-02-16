import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startTimer, stopTimer } from '../features/projectSlice';

const Timer = () => {
  const dispatch = useDispatch();
  const { timerRunning, activeProject } = useSelector(state => state.projects);
  
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (timerRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // каждую секунду время увеличиваеться
    } else {
      clearInterval(interval); // Останавка
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleStart = () => {
    dispatch(startTimer(activeProject)); // Старт таймера для проекта
  };

  const handleStop = () => {
    dispatch(stopTimer()); // стоп
    // надо будет добавить логику для сохранения времени в проекте (например, через PUT запрос)
  };

  return (
    <div>
      <h3>Время: {time}s</h3>
      <button onClick={handleStart}>Старт</button>
      <button onClick={handleStop}>Стоп</button>
    </div>
  );
};

export default Timer;
