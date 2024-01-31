import { useEffect, useState } from "react";

interface CountdownProps {
  travelDate: string;
  travelTime: string;
}

export default function Countdown({ travelDate, travelTime }: CountdownProps) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(`${travelDate} ${travelTime}`);
      const timeDifference = targetDate.getTime() - now.getTime();

      if (timeDifference <= 0) {
        setCountdown("Your travel will commence now");
        clearInterval(interval);
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown(
          `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [travelDate, travelTime]);

  return <strong style={{ color: "black" }}>{countdown}</strong>;
}
