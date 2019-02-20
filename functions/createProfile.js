const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const blog = require('./blog')
const app = (data, context) => {
  

  const docRef = db.collection('users').doc(data.displayName);
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
  if(checkToken){ 
    const profile = docRef.set({ isNSFWAllowed: false, owner: data.uid, platform: "email" }).then(res => { return res})
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    const layout = docRef.collection('blog').doc('layout').set(blog.layout({displayName: data.displayName}), { merge: true}).then(res => { return res})
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    return Promise.all([profile, layout]).then(values => values)
    
  }
  
 
};

module.exports = {
  app
}
