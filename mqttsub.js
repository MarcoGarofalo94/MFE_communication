const mqtt = require("mqtt");
//import mqtt from 'mqtt'
const clientId = "mqttjs_" + Math.random().toString(16).substr(2, 8);
// connection option
const options = {
  clean: true, // retain session
  connectTimeout: 4000, // Timeout period
  // Authentication information
  clientId: "emqx_test1",
  username: "emqx_test",
  password: "emqx_test",
};

// Connect string, and specify the connection method by the protocol
// ws Unencrypted WebSocket connection
// wss Encrypted WebSocket connection
// mqtt Unencrypted TCP connection
// mqtts Encrypted TCP connection
// wxs WeChat applet connection
// alis Alipay applet connection
const connectUrl = "ws://localhost:8080/mqtt";
const client = mqtt.connect(connectUrl, options);

client.on("reconnect", (error) => {
  console.log("reconnecting:", error);
});

client.on("error", (error) => {
  console.log("Connection failed:", error);
});

client.on("message", (topic, message) => {
  console.log("receive message：", topic, message.toString());
});

client.on("connect", () => {
  console.log("Client connected:" + clientId);
  // Publish
  client.subscribe("geodata", { qos: 0 });
});
