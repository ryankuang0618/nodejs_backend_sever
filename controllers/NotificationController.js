var NotificationDao = require('../dao/NotificationDao');

exports.Notification = function(req, res) {
    // 這個註冊的 token 是從手機端的 FCM SDKs 傳來的.
    const admin = require('firebase-admin');
    const serviceAccount = require('/Users/howardchen/Documents/GitLab/backend_server/serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        });

    var registrationToken = 'bbcdddb2066d59324f653c6f476dcd9a96c15f12d0a85e884a8cbaf6f4e81b90';
    var message = {
    data: {
        score: '850',
        time: '2:45'
    },
    token: registrationToken
    };

    // 對這個已註冊 token 的手機裝置傳送訊息
    admin.messaging().send(message)
    .then((response) => {
        // Response 是一個字串型別的 message ID.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
};