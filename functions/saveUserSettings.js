const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();

const app = (data, context) => {
  const docRef = db.collection('users').doc(data.username);
  const checkToken = defaultApp.app.auth().verifyIdToken(data.token)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    if(uid === data.uid) {
     
      return true
    }
    return false;
  }).catch(err => err);
  if(checkToken) {
    docRef
    .update({settings: data.payload}).catch(err => err)
  }
  const p = Promise.all([checkToken]).then(res => {
    return res;
  })
  
  return p
  
};

module.exports = {
  app
}
