

const functions = require('firebase-functions');
const reciveToken = require('./reciveToken')
const deletePost = require('./deletePost')
const createProfile = require('./createProfile')
const createProfileSteem = require('./createProfileSteem')
const saveComment = require('./saveComment')
const editTheme = require('./editTheme')
const upvotePost = require('./upvotePost')
const follow = require('./follow')
const upvoteSteemPost = require('./upvoteSteemPost')
const saveUserSettings = require('./saveUserSettings')
exports.reciveToken = functions.https.onCall(reciveToken.app);
exports.deletePost = functions.https.onRequest(deletePost.app);
exports.createProfile = functions.https.onCall(createProfile.app);
exports.createProfileSteem = functions.https.onCall(createProfileSteem.app);
exports.saveComment = functions.https.onCall(saveComment.app)
exports.editTheme = functions.https.onCall(editTheme.app)
exports.upvotePost = functions.https.onCall(upvotePost.app)
exports.follow = functions.https.onCall(follow.app)
exports.upvoteSteemPost = functions.https.onCall(upvoteSteemPost.app)
exports.saveUserSettings = functions.https.onCall(saveUserSettings.app)