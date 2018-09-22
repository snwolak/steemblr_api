const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const requestIp = require('request-ip');
const app = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const ip = requestIp.getClientIp(req);
  if (ip === '') {
    db.collection("posts").doc(req.body.permlink).delete().then(() => {
      console.log("Document successfully deleted!");
      return void 0;
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
    res.status(200).send('OK')
    res.end()
    return void 0;
   
  } else {
    res.status(403)
    res.end()
    return void 0;
  }
}
module.exports = {
  app
}