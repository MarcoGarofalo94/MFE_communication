import React, { useEffect, useState } from "react";
import Handler,{Channel} from "@client-handler";;
import cert from "../hash.json";
import conf from "../mf.conf.json";
Handler.getSubscriptions();
interface Topic {
  eventId: string;
  message: string;
}
let isInit = true;
const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lastTopic, setLastTopic] = useState<Topic>();

    useEffect(() => {
    if (isInit) {
      isInit = false;
      conf.listening.forEach((event) => {
        Handler.subscribe(
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
      id="container"
      style={{
        margin: "2px",
        display: "flex",
        flexDirection: "column",

        width: "200px",
        padding: "3px",
        border: "1px solid black",
      }}>
      <h1>MF1</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}></textarea>
      <button
        onClick={() => {
          console.log("chiamo publish");
          Handler.publish(
            { eventId: "e1", id: conf.id, message: message },
            cert.hash
          );
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
      <button onClick={() => Handler.getTimes()}>getTimes</button>
    </div>
  );
};

export default App;
