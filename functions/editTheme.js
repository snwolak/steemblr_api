const settings = require('./settings')
const cors = require('cors')({origin: settings,  optionsSuccessStatus: 200});
const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const app = (req, res) => {
  cors(req, res, () => { 
  const data = JSON.parse(req.body)
  const docRef = db.collection('users').doc(data.username).collection("blog").doc("layout");
  const checkToken = defaultApp.app.auth().verifyIdToken(data.token)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    if(decodedToken.name === data.username) {
     
      return true
    }
    return false;
  }).catch(err => err);
  if(checkToken) {
    docRef
    .update(data.layout).catch(err => err)
  }
  const p = Promise.all([checkToken]).then(res => {
    return res;
  })
  res.status(200).send('success');
  return p, res.end()
  })
};

module.exports = {
  app
}
