
const cors = require('cors')({origin: '*',  optionsSuccessStatus: 200});
const defaultApp = require('./defaultApp')


const app = (data, context) => {
  const uuid = data.uuid;
  return defaultApp.app.auth().createCustomToken(uuid).then((customToken) => {
      const token = {
        token: customToken
      };
     
      return token;
    }).catch(e => {
      console.log(e)
    });
};

module.exports = {
  app
}
