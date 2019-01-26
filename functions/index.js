

const functions = require('firebase-functions');
const reciveToken = require('./reciveToken')
const deletePost = require('./deletePost')
const createProfile = require('./createProfile')
const createProfileSteem = require('./createProfileSteem')
const saveComment = require('./saveComment')
const editTheme = require('./editTheme')
const upvotePost = require('./upvotePost')

exports.reciveToken = functions.https.onRequest(reciveToken.app);
exports.deletePost = functions.https.onRequest(deletePost.app);
exports.createProfile = functions.https.onCall(createProfile.app);
exports.createProfileSteem = functions.https.onCall(createProfileSteem.app);
exports.saveComment = functions.https.onCall(saveComment.app)
exports.editTheme = functions.https.onCall(editTheme.app)
exports.upvotePost = functions.https.onCall(upvotePost.app)