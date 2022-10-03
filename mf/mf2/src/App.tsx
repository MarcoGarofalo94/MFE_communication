import Handler, { Channel } from "@client-handler";
import { EngineClass } from "Engine";
import React, { useEffect, useState } from "react";
import cert from "../hash.json";
import conf from "../mf.conf.json";
let isInit = true;
interface Topic {
  eventId: string;
  message: string;
}
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
            callback: (data) => {
              setLastTopic({ eventId: event, message: data });

            },
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
        border: "1px solid black",
        margin: "3px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
      <h1>MF2</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}></textarea>
      <button
        onClick={() => {
          console.log("chiamo publish");
          Handler.publish(
            { eventId: "e2", id: conf.id, message: message },
            cert.hash
          );
        }}>
        Send Event
      </button>
      <button
        onClick={() => {
          Handler.getSubscriptions();
        }}>
        showSub
      </button>

      <button
        onClick={() => {
          console.log(
            (document as any).getElementById(conf.id + "_container", conf.id)
          );
        }}>
        getElementById
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
