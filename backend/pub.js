require('dotenv').config();
  
const {PubSub} = require(`@google-cloud/pubsub`);

const pubsub = new PubSub();

// In this example, the message is current time
const data = new Date().toString();
const dataBuffer = Buffer.from(data);
const topicName = 'projects/causal-tracker-312605/topics/MyTopic';

pubsub
  .topic(topicName)
  .publish(dataBuffer)
  .then(messageId => {
    console.log(`Message ${messageId} published.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
});