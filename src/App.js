import React, { useState } from "react";
import "./style.css";
import Length from './Length'

export default function App() {
  const [displayTime, setDisplayTime] = useState(25*60);
  const [breakTime, setBreakTime] = useState(5*60);
  const [sessionTime, setSessionTime] = useState(25*60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(new Audio("https://www.soundjay.com/buttons/beep-04.mp3"))

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    // make sure 2 digit by adding 0 in front of count
    return (
      (minutes < 10 ? "0" + minutes: minutes) + ":" + 
      (seconds < 10 ? "0" + seconds: seconds)
    );  
  }

  const changeTime = (amount, type) => {
    if(type == "break") {
      if(breakTime <= 60 && amount < 0) return;
      setBreakTime(prev => prev + amount)
    }

    if(type == "session") {
      if(sessionTime <= 60 && amount < 0) return;
      setSessionTime(prev => prev + amount)
      if(!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  }


  const controlTime = () => {
    let second = 1000; 
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if(!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if(date > nextDate) {
          setDisplayTime(prev => {
            if(prev <= 0 && !onBreakVariable) {
              playBreakSound();
              onBreakVariable=true;
              setOnBreak(true)
              return breakTime;
            }else if(prev <= 0 && onBreakVariable) {
              playBreakSound();
              onBreakVariable=false;
              setOnBreak(false)
              return sessionTime;
            }
            return prev - 1
          });
          nextDate += second;
        }
      }, 30)
      localStorage.clear();
      localStorage.setItem('interval-id', interval)
    }

    if(timerOn){
      clearInterval(localStorage.getItem('interval-id'));
    }
    setTimerOn(!timerOn);

  }

  const resetTime = () => {
    setDisplayTime(25*60);
    setBreakTime(5*60);
    setSessionTime(25*60);
  }

  return (
    <div className="center-align">
      <h1>React 25 Timer</h1>
      <div className="dual-container">

      <Length 
        title={"Break Length"} 
        changeTime={changeTime} 
        type={"break"} 
        time={breakTime} 
        formatTime={formatTime} 
      />

      <Length 
        title={"Session Length"} 
        changeTime={changeTime} 
        type={"session"} 
        time={sessionTime} 
        formatTime={formatTime} 
      />

      </div>
      <h3>{onBreak ? 'Break' : 'Session'}</h3>
      <h1>{formatTime(displayTime)}</h1>

      <button 
        onClick={controlTime}
        className="btn-large indigo lighten-1"
      >
        {timerOn ? (
          <i className="material-icons">pause_circle</i>
        ) : (
          <i className="material-icons">play_circle</i>
        )}
      </button>

      <button 
        onClick={resetTime}
        className="btn-large indigo lighten-1"
      >
        <i className="material-icons">autorenew</i>
      </button>

    </div>
  );
}