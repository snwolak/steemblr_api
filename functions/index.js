

const functions = require('firebase-functions');
const reciveToken = require('./reciveToken')
const syncPosts = require('./syncPosts')
const deletePost = require('./deletePost')

exports.syncPosts = functions.https.onRequest(syncPosts.app);
exports.reciveToken = functions.https.onRequest(reciveToken.app);
exports.deletePost = functions.https.onRequest(deletePost.app);