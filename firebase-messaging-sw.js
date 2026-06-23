importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCzTNt5paz1_Kl956MrwaG7bpFwYxCap1c",
    authDomain: "cash-on-57cf6.firebaseapp.com",
    projectId: "cash-on-57cf6",
    storageBucket: "cash-on-57cf6.appspot.com",
    messagingSenderId: "885877974146",
    appId: "1:885877974146:web:70acb497384bcf7f1b009b"
});

const messaging = firebase.messaging();

// Background message handler (app closed or minimized)
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received:', payload);

    const title = payload.notification?.title || '🩸 Blood Request';
    const options = {
        body: payload.notification?.body || 'Someone needs blood matching yours',
        icon: 'https://i.ibb.co/tMgqgFyz/Picsart-26-05-31-20-43-43-856.webp',
        badge: 'https://i.ibb.co/tMgqgFyz/Picsart-26-05-31-20-43-43-856.webp',
        tag: 'cswft-blood-request',
        renotify: true,
        data: payload.data || {}
    };

    self.registration.showNotification(title, options);
});

// Notification click — open app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('https://ajonnyesports.github.io/cswftlifebloodwebsite/');
        })
    );
});
