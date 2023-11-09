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

// const Config = {
//   apiKey: "AIzaSyAcROxN0Cs7nAlSMdzm_h-8tmNarPJoWzU",
//   authDomain: "aucation-f5a83.firebaseapp.com",
//   projectId: "aucation-f5a83",
//   storageBucket: "aucation-f5a83.appspot.com",
//   messagingSenderId: "409998959069",
//   appId: "1:409998959069:web:9ce727e4b1297228e49634",
//   measurementId: "G-755RTX3Q1G",
// };

// const app = initializeApp(Config);
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
