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
      return docRef.get().then(res => res.data()).then(res => {
        const filtered = res.active_votes.filter(vote => {
          return vote.voter !== data.voter
        })
        const votes = res.active_votes !== undefined ? filtered : []
        return docRef.update({active_votes: votes})
      }).catch(err => console.log(err))
    } else if(data.weight > 0) {
      //upvoting the post
      const vote = [
        { 
          timestamp: new Date(),
          id: data.id,
          voter: data.voter,
          uid: data.uid,
          weight: data.weight
        }
      ]
      return docRef.get().then(res => res.data()).then(res => {
        const find = res.active_votes.find(obj => obj.uid === data.uid)
        if(find) {
          return void 0
        }
        const votes = res.active_votes !== undefined ? vote.concat(res.active_votes) : vote
        return docRef.update({active_votes: votes})
      }).catch(err => console.log(err))
    }  
  }
  
};
module.exports = {
  app
}
