import { useState, useEffect } from "react";

const CountdownTimer= ({initCdTime, checkResult}) => {
  const [seconds, setSeconds] = useState(initCdTime);
  const [timeLeft, setTimeLeft] = useState({
    min: Math.floor(initCdTime / 60),
    sec: initCdTime%60
  });
  
  const secondsToJSON = (sec) => {
    let time_left = {};
    if (sec > 0) {
      time_left['min'] = Math.floor(sec / 60);
      time_left['sec'] = sec%60;
    }

    return time_left;
  }
  
  useEffect(() => {
    if (seconds > 0) {
      let interval1 = setInterval(() => {
        //reduce the time
        setSeconds(seconds - 1)
        //convert to JSON and set to TimeLeft
        setTimeLeft( secondsToJSON(seconds - 1) );
        //set seconds to localstorage
        localStorage.setItem("time_left", seconds - 1)
      }, 1000);
      return () => {
        clearInterval(interval1);
      };
    }
    //if finished:show result
    else {
      checkResult();
    }
  }, [seconds, checkResult]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, idx) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={idx}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  
  return (
    <div className="timer">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
}

export default CountdownTimer;