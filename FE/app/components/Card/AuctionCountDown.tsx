import React, { useEffect, useState } from "react";
import clsx from "clsx";
interface StateCardProps {
  currentTime: Date;
  auctionEndTime: Date;
  stateHandler: (state: string) => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const AuctionCountDown: React.FC<StateCardProps> = ({ auctionEndTime, stateHandler, currentTime }) => {
  const [nowtime, setNowtime] = useState(currentTime);
  const endTime = new Date(auctionEndTime);

  const calcTime = (): TimeLeft => {
    let difference: number;
    if (nowtime < endTime) {
      difference = endTime.getTime() - nowtime.getTime();
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
      if (nowtime < endTime) {
        stateHandler("경매종료");
      } else {
        stateHandler("종료");
      }
    }, 1000);

    if (nowtime >= endTime) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [endTime, nowtime]);

  const { days, hours, minutes, seconds } = timeLeft;

  let statusMessage;
  if (nowtime < endTime) {
    statusMessage = "경매종료";
  } else {
    statusMessage = "종료";
  }

  return (
    <span className="flex w-[155px] justify-end">
      <div
        className={clsx(
          statusMessage == "경매시작"
            ? "text-red-500"
            : statusMessage == "경매종료"
            ? "text-customBlue"
            : "text-black"
        )}
      >
        {statusMessage}
      </div>
      {days > 0 && <div>{days}:</div>}
      {(days > 0 || hours > 0) && <div>&nbsp;{hours}&nbsp;:</div>}
      {(days > 0 || hours > 0 || minutes > 0) && <div>&nbsp;{minutes}&nbsp;:</div>}
      {nowtime <= endTime && <div>&nbsp;{seconds} 전</div>}
    </span>
  );
};

export default AuctionCountDown;
