const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();

const app = (data, context) => {
  console.log(data)
  const docRef = db.collection('posts').doc(data.permlink)
  const checkToken = defaultApp.app.auth().verifyIdToken(data.token)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    if(uid === data.uid) {
      return true
    } else {
      return false;
    }
  }).catch(err => console.log(err))
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
    return docRef.get().then(res => res.data()).then(res => {
      const comments = res.comments !== undefined ? comment.concat(res.comments) : comment
      return docRef.update({comments: comments})
    }).catch(err => console.log(err))
    
    
  }
  
};
module.exports = {
  app
}
