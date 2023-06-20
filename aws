const Alexa = require('ask-sdk-core');
const AWS = require('aws-sdk');
const arduinoEndpoint = 'http://<your-arduino-ip>/led';

const TurnOnLedHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'TurnOnLed';
  },
  handle(handlerInput) {
    const color = handlerInput.requestEnvelope.request.intent.slots.color.value;
    const command = { led: color };
    const jsonCommand = JSON.stringify(command);
    
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonCommand
    };
    
    return fetch(arduinoEndpoint, options)
      .then(response => response.json())
      .then(data => {
        const speechText = `Ok, turning on the ${color} LED.`;
        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      })
      .catch(error => {
        console.error(error);
        const speechText = 'Sorry, there was an error while communicating with the Arduino.';
        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      });
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    TurnOnLedHandler
  )
  .lambda();
```
