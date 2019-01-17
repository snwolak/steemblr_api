const settings = require('./settings')
const cors = require('cors')({origin: settings.origin,  optionsSuccessStatus: 200});
const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();

db.settings(settings);

const app = (req, res) => {
  cors(req, res, () => { 
  const data = req.body
  const docRef = db.collection('posts').doc(req.body.permlink)
  const checkToken = defaultApp.app.auth().verifyIdToken(data.token)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    if(decodedToken.name === data.username) {
      return true
    } else {
      return false;
    }
  })
  if(checkToken) {
    const comment = [
      {
        id: data.id, 
        permlink: data.id,
        body: data.comment, 
        author: data.username, 
        platform: data.platform,
        timestamp: Date.now(),
        isReply: data.isReply,
        replyTo: data.replyTo
      }]
    docRef.get().then(res => res.data()).then(res => {
      const comments = comment.concat(res.comments)
      return docRef.update({comments: comments, actions: res.actions + 1})
    }).catch(err => console.log(err))
    
    res.status(200).send('OK');
    res.end()
  }
  })
};
module.exports = {
  app
}
