import workflow from "./Workflow.json";

export class MicroFrontend {
  id: string;
  render: Function;
  unmount: Function;

  constructor(id: string, render: Function, unmount: Function) {
    this.id = id;
    this.render = render;
    this.unmount = unmount;
  }
}

export class EngineClass {
  private static _instance: EngineClass = new EngineClass();
  private isInit = true;
  engineTimes: number[] = [];
  mfs: MicroFrontend[] = [];
  public static getInstance(): EngineClass {
    if (!EngineClass._instance) {
      EngineClass._instance = new EngineClass();
      console.log(this);
    }

    return EngineClass._instance;
  }

  register(mf: MicroFrontend) {
    this.mfs.push(mf);
  }

  checkMf() {
    console.log(this.mfs);
  }

  checkFlow(eventId: string) {
    let initTime = Date.now();
    console.log("checking", eventId, this.mfs);
    const triggered = workflow.states.filter((wf) => wf.trigger == eventId);
    console.log("triggered", triggered);
    triggered.forEach((trigger) => {
      trigger.render.forEach((tmf) =>
        this.mfs.forEach((mf) => {
          if (mf.id == tmf) {
            console.log("rendering ", mf.id);
            mf.render();
          }
        })
      );
      trigger.unmount.forEach((tmf) => {
        console.log("unmounting", this.mfs);
        this.mfs.forEach((mf) => {
          if (mf.id == tmf) {
            console.log("unmounting ", mf.id);
            mf.unmount();
          }
        });
      });
    });
    let endTime = Date.now();
    this.engineTimes.push(endTime - initTime);
  }
  run() {
    if (this.isInit) {
      console.log("initialRun");
      workflow.onInit.render.forEach((wmf) => {
        this.mfs.forEach((mf) => (mf.id == wmf ? mf.render() : null));
      });
    }
  }

  getTimes() {
    console.log(this.engineTimes);
    let mean = 0;
    this.engineTimes.forEach((time) => {
      mean += time;
    });
    console.log(mean / this.engineTimes.length);
  }
}
const EngineInstance = EngineClass.getInstance();
document.addEventListener(
  "DOMContentLoaded",
  function () {
    EngineClass.getInstance().run();
  },
  false
);
(window as any).Engine = EngineInstance;

export default EngineInstance;
