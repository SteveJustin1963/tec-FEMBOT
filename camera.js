const Alexa = require('ask-sdk-core');
const VideoApp = require('ask-sdk-videoapp');
const Camera = require('ask-sdk-camera');
const APL = require('ask-sdk-apl');

const StartCameraHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const token = VideoApp.generateToken();
    const url = Camera.getCameraStreamUrl(handlerInput.requestEnvelope.context.System.apiEndpoint, token);
    const backgroundImage = 'https://example.com/background.png';

    const aplDirective = APL.renderDocumentDirective({
      token: 'my-apl-token',
      document: {
        type: 'APL',
        version: '1.4',
        mainTemplate: {
          item: {
            type: 'Container',
            width: '100vw',
            height: '100vh',
            backgroundImage: {
              sources: [{
                url: backgroundImage,
                size: '100vw 100vh',
                position: '50% 50%',
                alignment: 'center'
              }]
            },
            items: [{
              type: 'Video',
              source: url,
              scale: 'best-fill',
              autoplay: true,
              audioTrack: 'background',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh'
            }]
          }
        }
      },
      datasources: {}
    });

    return handlerInput.responseBuilder
      .addDirective(aplDirective)
      .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    StartCameraHandler
  )
  .addDirectiveHandlers(
    VideoApp.DirectiveHandler,
    Camera.DirectiveHandler,
    APL.DirectiveHandler
  )
  .lambda();
```
