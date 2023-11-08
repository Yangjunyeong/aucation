// // https://github.com/godzz733/NeighBrew/tree/feat/BE/FCM/Front/src
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// interface Config {
//   apiKey: string;
//   authDomain: string;
//   projectId: string;
//   storageBucket: string;
//   messagingSenderId: string;
//   appId: string;
//   vapidKey: string;
// }

// const config: Config = {
//   apiKey: import.meta.env.VITE_APP_FCM_API_KEY,
//   authDomain: import.meta.env.VITE_APP_FCM_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_APP_FCM_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_FCM_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_FCM_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_FCM_APP_ID,
//   vapidKey: import.meta.env.VITE_APP_FCM_VAPID,
// };

// const app = initializeApp(config);
// const messaging = getMessaging(app);

// // 토큰값 얻기
// const getTokenAndHandle = () => {
//   getToken(messaging)
//     .then(currentToken => {
//       if (currentToken) {
//         // Send the token to your server and update the UI if necessary
//         // ...
//         console.log(currentToken);
//       } else {
//         // Show permission request UI
//         console.log("No registration token available. Request permission to generate one.");
//         // ...
//       }
//     })
//     .catch(err => {
//       console.log("An error occurred while retrieving token. ", err);
//       // ...
//     });
// };

// // 포그라운드 메시지 수신
// const handleForegroundMessage = () => {
//   onMessage(messaging, payload => {
//     console.log("Message received. ", payload);
//     // ...
//   });
// };

// export { getTokenAndHandle, handleForegroundMessage };
