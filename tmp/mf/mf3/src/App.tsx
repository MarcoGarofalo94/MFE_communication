import React, { useEffect, useState } from "react";
import Channel from "@client-handler";
import cert from "../hash.json";
import conf from "../mf.conf.json";

import { External } from "External";
import TimerComponent from "./components/Timer";
import Handler from "@client-handler";
const ExternalInstance = window["ExternalInstance"] as External;
Channel.getSubscriptions();
interface Topic {
  eventId: string;
  message: string;
}

let isInit = true;
let eTimes = 0;
const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lastTopic, setLastTopic] = useState<Topic>();
  const [message, setMessage] = useState("");
  const [date, setDate] = React.useState(new Date());

  function tick() {
    // if (eTimes < 100) {
    //   if (eTimes % 2 == 0) {
    //     Handler.publish({ eventId: "e3", id: "mf3", message: "e3" }, cert.hash);
    //   } else {
    //     Handler.publish({ eventId: "e5", id: "mf3", message: "e5" }, cert.hash);
    //   }
    // }
    setDate(new Date());
    // eTimes++;
  }
  // React.useEffect(() => {
  //   const timerID = setInterval(() => tick(), 1000);

  //   return function cleanup() {
  //     clearInterval(timerID);
  //   };
  // }, []);
  useEffect(() => {
    console.log(isInit);
    if (isInit) {
      isInit = false;
      conf.listening.forEach((event) => {
        Channel.subscribe(
          {
            id: conf.id,
            eventId: event,
            callback: (data) => setLastTopic({ eventId: event, message: data }),
          },
          cert.hash
        );
      });
      
    }
  }, []);

  useEffect(() => {
    if (lastTopic) {
      setTopics([...topics, lastTopic]);
    }
  }, [lastTopic]);
  return (
    <div
      id="1664114058409_container"
      style={{
        margin: "2px",
        display: "flex",
        flexDirection: "column",

        width: "200px",
        padding: "3px",
        border: "1px solid black",
      }}>
      <h1>MF3</h1>
      <TimerComponent date={date.toLocaleTimeString()} />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}></textarea>
      <button
        onClick={() => {
          Channel.publish({ eventId: "e3", id: conf.id, message }, cert.hash);
        }}>
        Send Event
      </button>
      <h1>Messages</h1>
      {topics.map((topic, i) => {
        return (
          <div key={topic.eventId + conf.id + i}>
            {topic.eventId} - {topic.message}
          </div>
        );
      })}
    </div>
  );
};

export default App;
