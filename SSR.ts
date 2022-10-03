import ReactDOMServer  from "react-dom/server";

import  * as Test  from "./mf/mf1/src/components/Test";
console.log(ReactDOMServer.renderToString(Test as any));