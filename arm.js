const AWS = require('aws-sdk');
const iotData = new AWS.IotData({ endpoint: 'YOUR_IOT_ENDPOINT' });

const MoveRobotHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MoveRobotIntent';
  },
  async handle(handlerInput) {
    const direction = handlerInput.requestEnvelope.request.intent.slots.direction.value;
    const speed = handlerInput.requestEnvelope.request.intent.slots.speed.value;

    const payload = {
      direction,
      speed
    };

    const params = {
      topic: 'robot/arm/control',
      payload: JSON.stringify(payload),
      qos: 0
    };

    await iotData.publish(params).promise();

    return handlerInput.responseBuilder
      .speak(`Moving the robot arm to the ${direction} at speed ${speed}.`)
      .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    MoveRobotHandler
  )
  .lambda();
```
