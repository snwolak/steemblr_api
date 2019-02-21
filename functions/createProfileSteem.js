const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const app = (data, context) => {
   
  const docRef = db.collection('users').doc(data.steemAccount);
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
    const profile = docRef.set({ isNSFWAllowed: false, owner: data.steemAccount, platform: "steem", following: [] }).then(res => { return res})
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    const layout = docRef.collection('blog').doc('layout').set(data.blog, { merge: true}).then(res => { return res})
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    return Promise.all([profile, layout]).then(values => values)
  }
  
 
};
module.exports = {
  app
}
