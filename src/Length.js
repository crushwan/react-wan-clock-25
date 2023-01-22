import React from "react";

export default function Length({title, changeTime, type, time, formatTime}) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="time-sets">

        <button
          onClick={() => changeTime(-60,type)}
          className="btn-small indigo lighten-1"
        >
          <i className="material-icons">arrow_downward</i>
        </button>

        <h3>{formatTime(time)}</h3>

        <button 
          onClick={() => changeTime(60,type)}
          className="btn-small indigo lighten-1"
        >
          <i className="material-icons">arrow_upward</i>
        </button>

      </div>
    </div>
  )
}