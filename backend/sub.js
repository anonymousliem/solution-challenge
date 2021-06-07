require("dotenv").config();
const {PubSub} = require(`@google-cloud/pubsub`);

const pubsub = new PubSub();

const subscriptionName = process.env.SUBSCRIPTION_NAME;
const timeout = 60;

const subscription = pubsub.subscription(subscriptionName);

let messageCount = 0;

/**
 * Handler for received message.
 * @param {Object} message
 */
const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`Data: ${message.data}`);
  console.log(`tAttributes: ${message.attributes}`);
  messageCount += 1;

  // Ack the messae
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
setTimeout(() => {
  subscription.removeListener('message', messageHandler);
  console.log(`${messageCount} message(s) received.`);
}, timeout * 10000000);