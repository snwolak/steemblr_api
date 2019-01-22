const settings = require('./settings')
const cors = require('cors')({origin: settings.origin,  optionsSuccessStatus: 200});
const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const blog = require('./blog')
const app = (req, res) => {
  cors(req, res, () => {  
  const data = req.body
  const docRef = db.collection('users').doc(req.body.steemAccount);
  const checkToken = defaultApp.app.auth().verifyIdToken(data.token)
  
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    if(uid === data.uid) {
      return true
    } else {
      return false;
    }
  }).catch((error) => {
    // Handle error
  });
  if(checkToken) {
    console.log(data)
    docRef.set({ isNSFWAllowed: false, owner: req.body.steemAccount, platform: "steem" }).then(res => { return res})
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    docRef.collection('blog').doc('layout').set(data.blog, { merge: true}).then(res => { return res})
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    res.status(200).send(req.body);
    res.end()
  }
  
  })
};
module.exports = {
  app
}
