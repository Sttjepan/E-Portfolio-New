import React, { useEffect, useState } from "react";

export default function Clock() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Get local time components
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // AM/PM format
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      // Format numbers with leading zeros
      const pad = (n) => String(n).padStart(2, "0");

      // Get timezone offset in hours
      const offset = -now.getTimezoneOffset() / 60;
      const tzSign = offset >= 0 ? "+" : "-";

      // Compose full time string
      const time = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm} (GMT${tzSign}${Math.abs(offset)})`;

      setTimeString(time);
    };

    updateTime(); // Initialize right away
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{timeString}</span>;
}
