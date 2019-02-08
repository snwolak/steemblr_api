const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const app = (data, context) => {
  //Adding or removing follow
  console.log(data)
  const docRef = db.collection('users').doc(data.username)
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
    if(data.action === "unfollow") {
      //removing follow
      return docRef.get().then(res => res.data()).then(res => {
        const filtered = res.following.filter(obj => {
          return obj.username !== data.usernameToFollow
        })
        const following = res.following !== undefined ? filtered : []
        return docRef.update({following: following})
      }).catch(err => console.log(err))
    } else if(data.action === "follow") {
      //adding a follow
      const user = [
        { 
          timestamp: Date.now(),
          id: data.id,
          username: data.usernameToFollow,
          platform: data.platform,
        }
      ]
      return docRef.get().then(res => res.data()).then(res => {
        const find = res.following.find(obj => obj.username === data.usernameToFollow)
        if(find) {
          return void 0
        }
        const following = res.following !== undefined ? user.concat(res.following) : vote
        return docRef.update({following: following})
      }).catch(err => console.log(err))
    }  
  }
  
};
module.exports = {
  app
}
