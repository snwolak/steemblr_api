const defaultApp = require('./defaultApp')
const db = defaultApp.app.firestore();
const requestIp = require('request-ip');
const app = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const ip = requestIp.getClientIp(req);
  
  if (ip === '') {   
    const docRef = db.collection('posts').doc(req.body.post.permlink);
    
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const post = doc.data()
          if(post.trending === true) {
            docRef.set(req.body.post, { merge: true});
            res.end();
            return void 0;
          } else {
            console.log("Trending:", req.body.post.rating, req.body.post.rating > 0.80 ? true : false)
            docRef.set(req.body.post, { merge: true});
            docRef.set({trending: req.body.post.rating > 0.80 ? true : false}, {merge: true})
            res.end();
            return void 0;
          }
          
        } else {
          console.log('No such document', req.body.post.permlink);
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