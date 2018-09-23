const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const requestIp = require('request-ip');
const app = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const ip = requestIp.getClientIp(req);
  if (ip === "") {
    const docRef = db.collection('posts').doc(req.body.permlink);
    docRef
    .get()
    .then(doc => {
      if (doc.exists) {
        const post = doc.data()
        if(post.author === req.body.author) {
          db.collection("posts").doc(req.body.permlink).delete();
          return void 0;
        } else {
          console.log("Unauthorized", req.body.author, req.body.permlink)
          return void 0;
        }
        
      } else {
        console.log('No such document', req.body.permlink);
        res.end();
        return void 0;
      }
    })
    .catch(error => {
      console.log(error);
    });
    
    res.status(200).send('OK')
    res.end()
    return void 0;
   
  } else {
    res.status(403)
    res.end()
    return void 0;
  }
}
module.exports = {
  app
}