import React from "react";

interface TimerComponentProps {
  date: string;
}
const TimerComponent: React.FC<TimerComponentProps> = ({ date }) => {
  return (
    <div>
      {date.split(":").map((tick) => {
        return <h1>{tick}</h1>;
      })}
    </div>
  );
};

export default TimerComponent;