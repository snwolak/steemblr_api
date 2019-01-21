const settings = require('./settings')
const cors = require('cors')({origin: settings.origin,  optionsSuccessStatus: 200});
const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const blog = require('./blog')
const app = (req, res) => {
  cors(req, res, () => {  
  const data = req.body
  const docRef = db.collection('users').doc(req.body.displayName);
  console.log(data)
  const checkToken = defaultApp.app.auth().verifyIdToken(data.token)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    if(decodedToken.name === data.displayName) {
      return true
    } else {
      return false;
    }
  }).catch((error) => {
    // Handle error
  });
  if(checkToken)
  docRef.set({ isNSFWAllowed: false, owner: req.body.email }).then(res => { return res})
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
  docRef.collection('blog').doc('layout').set(blog.layout({displayName: req.body.displayName}), { merge: true}).then(res => { return res})
  .catch((error) => {
    console.error("Error writing document: ", error);
  });
  res.status(200).send(req.body);
  res.end()
  })
};

module.exports = {
  app
}
