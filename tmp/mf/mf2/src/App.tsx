import Handler, { Channel } from "@client-handler";
import { EngineClass } from "Engine";
import React, { useEffect, useState } from "react";
import cert from "../hash.json";
import conf from "../mf.conf.json";
import PubSub from "pubsub-js";
import { External } from "External";
import { Map, Marker } from "pigeon-maps";
const ExternalInstance = window["ExternalInstance"] as External;
let isInit = true;
interface Topic {
  eventId: string;
  message: string;
}

let ttimes: number[] = [];
const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lastTopic, setLastTopic] = useState<Topic>();
  const [marker, setMarker] = useState<[number, number] | null>(null);
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
      id="1664114058407_container"
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
      <Map
        height={300}
        defaultCenter={marker ?? [50.879, 4.6997]}
        defaultZoom={11}>
        <Marker width={50} anchor={marker ?? [50.879, 4.6997]} />
      </Map>
      <button
        onClick={() => {
          console.log("chiamo publish");
          PubSub.publish("MY TOPIC", "hello world!");
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
          //console.log("req start");
          let interval: any;
          
          interval = setInterval(() => {
            if (ttimes.length < 100) {
              let initialTime = Date.now();
              console.log(initialTime);
              ExternalInstance.push({
                data: null,
                callback: (data: any) => {
                  let finalTime = Date.now();
                  ttimes.push(finalTime - initialTime);
                  console.log("ttimes.length", ttimes.length);

                  setMarker((prev) => [data["lat"], data["long"]]);
                },
                eventId: "GEODATA",
              });
            } else {
              clearInterval(interval);
              let mean = 0;
              for (let j = 0; j < ttimes.length; j++) {
                mean += ttimes[j];
              }
              console.log(ttimes, mean / ttimes.length);
              ttimes = [];
            }
          },100);
        }}>
        RegisterTicket
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
