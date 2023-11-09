import React, { useEffect, useState } from "react";
import clsx from "clsx";
interface StateCardProps {
  currentTime: Date;
  endTime: Date;
  stateHandler: (state: string) => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const DiscountDown: React.FC<StateCardProps> = ({ stateHandler, currentTime, endTime }) => {
  const [nowtime, setNowtime] = useState(new Date(currentTime));
  const shopEndTime = new Date(endTime);

  const calcTime = (): TimeLeft => {
    let difference: number;
    if (nowtime < shopEndTime) {
      difference = shopEndTime.getTime() - nowtime.getTime();
    } else {
      difference = 0;
    }

    let timeLeft: TimeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calcTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const tmp = nowtime;
      tmp.setSeconds(nowtime.getSeconds() + 1);
      setNowtime(tmp);
      setTimeLeft(calcTime());
      if (nowtime < shopEndTime) {
        stateHandler("할인종료");
      } else {
        stateHandler("종료");
      }
    }, 1000);

    if (nowtime >= shopEndTime) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [shopEndTime, nowtime]);

  const { days, hours, minutes, seconds } = timeLeft;

  let statusMessage;
  if (nowtime < shopEndTime) {
    statusMessage = "할인종료";
  } else {
    statusMessage = "종료";
  }

  return (
    <span className="flex w-[250px] justify-end text-xl font-sans">
      <div
        className={clsx(
          statusMessage == "종료"
            ? "text-red-500"
            : statusMessage == "할인종료"
            ? "text-customBlue"
            : "text-black"
        )}
      >
        {statusMessage}
      </div>
    <div className="flex font-bold ">
      {days > 0 && <div>{days}:</div>}
      {(days > 0 || hours > 0) && <div>&nbsp;{hours}&nbsp;:</div>}
      {(days > 0 || hours > 0 || minutes > 0) && <div>&nbsp;{minutes}&nbsp;:</div>}
      {nowtime <= shopEndTime && <div>&nbsp;{seconds} 전</div>}
    </div>
    </span>
  );
};

export default DiscountDown;
