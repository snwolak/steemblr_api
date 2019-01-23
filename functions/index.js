

const functions = require('firebase-functions');
const reciveToken = require('./reciveToken')
const syncPosts = require('./syncPosts')
const deletePost = require('./deletePost')
const createProfile = require('./createProfile')
const createProfileSteem = require('./createProfileSteem')
const saveComment = require('./saveComment')
const editTheme = require('./editTheme')

exports.syncPosts = functions.https.onRequest(syncPosts.app);
exports.reciveToken = functions.https.onRequest(reciveToken.app);
exports.deletePost = functions.https.onRequest(deletePost.app);
exports.createProfile = functions.https.onCall(createProfile.app);
exports.createProfileSteem = functions.https.onCall(createProfileSteem.app);
exports.saveComment = functions.https.onCall(saveComment.app)
exports.editTheme = functions.https.onCall(editTheme.app)