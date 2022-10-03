import React, { useEffect, useState } from "react";

import cert from "../hash.json";
import conf from "../mf.conf.json";
import PubSub from "pubsub-js";
import { Channel } from "@client-handler";
import { External } from "External";

const Handler = window["Channel"] as Channel;
const ExternalInstance = window["ExternalInstance"] as External;

interface Topic {
  eventId: string;
  message: string;
}
let isInit = true;
const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [errorMessages, setErrorMessages] = useState({ message: "", name: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [lastTopic, setLastTopic] = useState<Topic>();

  useEffect(() => {
    var token = PubSub.subscribe("MY TOPIC", (msg, data) => {
      console.log("da mf1", msg, data);
    });
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
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div
      id="1664114058406_container"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        width: "400px",
        margin: "0 auto",
        border: "1px solid black",
      }}>
      <div className="form">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            ExternalInstance.push({
              callback: (data) => {

                Handler.publish(
                  { eventId: "e1", id: "mf1", message: data.toString() },
                  cert.hash
                );
              },
              data: { username: "Marco", password: "Garofalo" },
              eventId: "LOGIN",
            });
          }}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname"  />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass"  />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        
        </form>
          <button onClick={() => {
            let initialTime = Date.now();
              console.log(initialTime);
              ExternalInstance.push({
                data: null,
                callback: (data: any) => {
                  let finalTime = Date.now();
                  //ttimes.push(finalTime - initialTime);
                  //console.log("ttimes.length", ttimes.length);

                  //setMarker((prev) => [data["lat"], data["long"]]);
                },
                eventId: "GEODATA",
              });
          }}>t</button>
      </div>
    </div>
  );
};

export default App;
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "ang-mf": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//     }
//   }
// }
