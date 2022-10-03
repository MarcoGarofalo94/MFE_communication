import { v4 as uuidv4 } from "uuid";
const mqtt = window["mqtt"];

export class External {
  sessionUUID = uuidv4();
  private static _instance: External = new External();
  connectUrl = "ws://localhost:8080/mqtt";
  private globalTopic = "APP";
  private externalEvents: ExternalEvent[] = [];

  intialTimes: number[] = [];
  endingTimes: number[] = [];
  mqttTimes: number[] = [];
  client: any;
  constructor() {
    const options = {
      clean: false, // retain session
      connectTimeout: 4000, // Timeout period
      // Authentication information
      clientId: "External_Engine_" + Date.now(),
      username: "external",
      reconnectPeriod: 0,
      keepAlive: 0,
      wsOptions: {
        skipUTF8Validation: true,
        clientTracking: false,
        perMessageDeflate: false,
      },
      properties: {
        requestResponseInformation: false,
        requestProblemInformation: false,
      },
      password: "external",
    };

    this.client = mqtt.connect(this.connectUrl, options);
    this.client.on("connect", () => {
      this.client.subscribe(this.sessionUUID, { qos: 1 });
      console.log("External Engine connected: " + this.sessionUUID);
    });

    this.client.on("reconnect", (error) => {
      console.log("reconnecting:", error);
    });

    this.client.on("error", (error) => {
      console.log("Connection failed:", error);
    });

    this.client.on("message", (topic, message) => {
      console.log(
        "External Engine message direct：",
        topic,
        message.toString()
      );
      const mess = JSON.parse(message);
      console.log(mess);
      this.mqttTimes.push(Date.now() - +mess.sendingTime);

      this.dispatch(mess);
    });
  }

  public static getInstance(): External {
    if (!External._instance) {
      External._instance = new External();
      console.log(this);
    }

    return External._instance;
  }

  push(event: ExternalEvent) {
    console.time("pushingEvent");
    this.intialTimes.push(Date.now());
    this.externalEvents.push(event);
    this.client.publish(
      this.globalTopic,
      JSON.stringify({
        eventId: event.eventId,
        data: event.data,
        sessionUUID: this.sessionUUID,
      })
    );
  }

  private dispatch(message: ExternalEvent) {
    console.timeEnd("pushingEvent");
    this.endingTimes.push(Date.now());
    this.externalEvents.forEach((event, i) => {
      if (event.eventId == message.eventId) {
        console.log("calling", event.eventId, i);
        let foundEvent = this.externalEvents.splice(i, 1)[0];
        foundEvent.callback(message.data);
      }
    });
  }

  getTimes() {
    let sum = 0;
    let times: number[] = [];
    this.endingTimes.forEach((et, i) => {
      sum += et - this.intialTimes[i];
      times.push(sum);
    });
    console.log(this.intialTimes, this.endingTimes);
    console.log(times);
    console.log(sum / this.endingTimes.length);

    console.log(this.mqttTimes);
  }

  register(ticket: Ticket) {
    const options = {
      clean: true, // retain session
      connectTimeout: 4000, // Timeout period
      // Authentication information
      clientId: ticket.id,
      username: "external",
      password: "external",
    };
    const tmpClient = mqtt.connect(this.connectUrl, options);
    tmpClient.on("connect", () => {
      tmpClient.subscribe(ticket.topicId, { qos: 0 });
      console.log("Client directed connected:" + ticket.id);
    });

    tmpClient.on("reconnect", (error) => {
      console.log("reconnecting:", error);
    });

    tmpClient.on("error", (error) => {
      console.log("Connection failed:", error);
    });

    tmpClient.on("message", (topic, message) => {
      console.log("receive message direct：", topic, message.toString());

      ticket.callback(message);
    });
  }
}

const ExternalInstance = External.getInstance();
window["ExternalInstance"] = ExternalInstance;
export default ExternalInstance;

interface Ticket {
  id: string;
  callback: Function;
  topicId: string;
}

interface ExternalEvent {
  eventId: string;
  data: any;
  callback: Function;
}
