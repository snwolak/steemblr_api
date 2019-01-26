const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const app = (data, context) => {
  //Adding an upvote to the post.upvotes
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
    if(data.weight === 0) {
      //weight 0 means user is unvoting the post
      docRef.get().then(res => res.data()).then(res => {
        const filtered = res.upvotes.filter(vote => {
          return vote.voter !== data.voter
        })
        const upvotes = res.upvotes !== undefined ? filtered : []
        const actions = res.actions !== undefined ? res.actions - 1 : 0
        return docRef.update({upvotes: upvotes, actions: actions})
      }).catch(err => console.log(err))
    } else if(data.weight > 0) {
      //upvoting the post
      const vote = [
        { 
          timestamp: new Date(),
          id: data.id,
          voter: data.voter,
          uid: data.uid,
          platform: data.platform,
          weight: data.weight
        }
      ]
      docRef.get().then(res => res.data()).then(res => {
        const upvotes = res.upvotes !== undefined ? vote.concat(res.upvotes) : vote
        const actions = res.actions !== undefined ? res.actions + 1 : 1
        return docRef.update({upvotes: upvotes, actions: actions})
      }).catch(err => console.log(err))
    }  
  }
  
};
module.exports = {
  app
}
