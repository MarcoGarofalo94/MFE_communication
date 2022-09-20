// pubsub.js

import axios from "axios";
import associations from "./associations.json";
interface MyDocument extends Document {
  _oldGetElementById: Function;
}
export class Channel {
  private static _instance: Channel = new Channel();
  private subscriptions: Subscription[] = [];
  private clientTimes: number[] = [];
  private serverTimes: number[] = [];

  constructor() {
    this.interceptSelector();
  }

  public static getInstance(): Channel {
    if (!Channel._instance) {
      Channel._instance = new Channel();
      console.log(this);
    }

    return Channel._instance;
  }

  private notify(sub: Subscription, message: string) {
    sub.callback(message);
  }

  private async checkPublisherHash(
    hash: string,
    mfId: string,
    eventId: string,
    online = true
  ) {
    if (online) {
      let initialTime = Date.now();
      let endTime = 0;
      const response = await axios.post(
        "http://localhost:4000/checkPublisherHash",
        {
          hash: hash,
          mfId: mfId,
          eventId: eventId,
        }
      );
      console.log(response.data.message);

      if (!response.data.success) {
        endTime = Date.now();
        this.serverTimes.push(endTime - initialTime);
        return false;
      }
      endTime = Date.now();
      this.serverTimes.push(endTime - initialTime);
      return true;
    } else {
      let initialTime = Date.now();
      let endTime = 0;
      const mf = associations.find((a) => {
        return (
          a.id == mfId &&
          a.hash == hash &&
          a.emitting.find((event) => event == eventId) != undefined
        );
      });
      if (mf != undefined) {
        console.log(mfId + " is allowed to emit event " + eventId);
        endTime = Date.now();
        this.clientTimes.push(endTime - initialTime);
        return true;
      } else {
        console.log(mfId + " is not allowed to emit event " + eventId);
        endTime = Date.now();
        this.clientTimes.push(endTime - initialTime);
        return false;
      }
    }
  }

  private async checkSubscriberHash(
    hash: string,
    mfId: string,
    eventId: string,
    online = true
  ) {
    if (online) {
      let initialTime = Date.now();
      let endTime = 0;
      const response = await axios.post(
        "http://localhost:4000/checkSubscriberHash",
        {
          hash: hash,
          mfId: mfId,
          eventId: eventId,
        }
      );

      console.log(response.data.message);
      if (!response.data.success) {
        console.log(response.data.message);
        endTime = Date.now();
        this.serverTimes.push(endTime - initialTime);
        return false;
      }
      endTime = Date.now();
      this.serverTimes.push(endTime - initialTime);
      return true;
    } else {
      let initialTime = Date.now();
      let endTime = 0;
      const mf = associations.find((a) => {
        return (
          a.id == mfId &&
          a.hash == hash &&
          a.listening.find((event) => event == eventId) != undefined
        );
      });
      if (mf != undefined) {
        console.log(mfId + " is allowed to listen event " + eventId);
        endTime = Date.now();
        this.clientTimes.push(endTime - initialTime);
        return true;
      } else {
        console.log(mfId + " is not allowed to listen event " + eventId);
        endTime = Date.now();
        this.clientTimes.push(endTime - initialTime);
        return false;
      }
    }
  }
  async publish(publication: Publication, digest: string) {
    console.log("subscriptions da publish", this.subscriptions);
    if (
      !(await this.checkPublisherHash(
        digest,
        publication.id,
        publication.eventId
      ))
    ) {
      return;
    }

    let subs = this.subscriptions.filter(
      (subscription) => subscription.eventId == publication.eventId
    );
    subs.forEach((sub) => {
      this.notify(sub, publication.message);
    });
    console.log(this.clientTimes,this.serverTimes)
  }

  async subscribe(subscription: Subscription, digest: string) {
    if (
      !(await this.checkSubscriberHash(
        digest,
        subscription.id,
        subscription.eventId
      ))
    ) {
      return;
    }
    console.log("da subscription", subscription);
    this.subscriptions.push(subscription);
    console.log("da subscription", this.subscriptions);
  }

  unsubscribe(subscription: Subscription) {
    this.subscriptions = this.subscriptions.filter(
      (sub) => sub.id != subscription.id && sub.eventId != subscription.eventId
    );
  }

  getSubscriptions() {
    console.log(this.subscriptions);
  }

  getTimes = () => {
    console.log('clientTimes',this.clientTimes)
  }

  private interceptSelector() {
    (document as MyDocument)._oldGetElementById = document.getElementById;

    document.getElementById = function (id: string, caller: string) {
      console.log(id.includes(caller));
      console.log(id);
      if (id.toLowerCase().includes(caller.toLowerCase())) {
        console.log((document as MyDocument)._oldGetElementById(id));
        return (document as MyDocument)._oldGetElementById(id);
      }
      return null;
    } as any;
  }
}

interface Subscription {
  id: string;
  callback: Function;
  eventId: string;
}

interface Publication {
  id: string;
  eventId: string;
  message: string;
}

const Handler = Channel.getInstance();
export default Handler;
