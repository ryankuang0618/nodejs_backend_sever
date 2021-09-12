var NotificationDao = require('../dao/NotificationDao');

exports.Notification = function(req, res) {
    // 這個註冊的 token 是從手機端的 FCM SDKs 傳來的.
    const admin = require('firebase-admin');
    const serviceAccount = require('/Users/howardchen/Documents/GitLab/backend_server/serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        });

    var registrationToken = 'c_wIKa5GvEY5jPf_nr7-fU:APA91bHWfjVs5NNASPZ5kwsGtpFEDztXRq5DeI-u0_N2ELfU06LkWFhn6Zu5SSPDKlgFR7DDt-Nd-17EZBJWP9nXChK7bsx3XwgQsEPQCoDjknClNp8futb5_d9aWsapxd2VJWMZ1-9a';
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