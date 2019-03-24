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
        const filtered = res.upvotes.filter(vote => {
          return vote.voter !== data.voter
        })
        const upvotes = res.upvotes !== undefined ? filtered : []
        return docRef.update({upvotes: upvotes})
      }).catch(err => console.log(err))
    } else if(data.weight > 0) {
      //upvoting the post
      const vote = [
        { 
          action: "upvote",
          timestamp: new Date(),
          id: data.id,
          voter: data.voter,
          username: data.voter,
          uid: data.uid,
          platform: data.platform,
          weight: data.weight
        }
      ]
      return docRef.get().then(res => res.data()).then(res => {
        const find = res.upvotes.find(obj => obj.uid === data.uid)
        if(find) {
          return void 0
        }
        const upvotes = res.upvotes !== undefined ? vote.concat(res.upvotes) : vote
        return docRef.update({upvotes: upvotes})
      }).catch(err => console.log(err))
    }  
  }
  
};
module.exports = {
  app
}
