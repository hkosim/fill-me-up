export const generateTime = (time_s) =>{
  let time = {
    min: Math.floor(time_s / 60),
    sec: time_s%60
  };
  let timerComponents = [];

  Object.keys(time).forEach((interval, idx) => {
    if (!time[interval]) {
      return;
    }
    timerComponents.push(
      <span key={idx}>
        {time[interval]} {interval}{" "}
      </span>
    );
  });

  return timerComponents;
}