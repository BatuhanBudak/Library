import firebase from "firebase/compat/app";

export const fireBaseModule = (() => {
  const firebaseConfig = {
    apiKey: "AIzaSyAmk93N7QbB7OcQHjRjJd_ZaQ1wDxiAePg",

    authDomain: "library-project-5c6ff.firebaseapp.com",

    projectId: "library-project-5c6ff",

    storageBucket: "library-project-5c6ff.appspot.com",

    messagingSenderId: "966224722696",

    appId: "1:966224722696:web:53029a977858233d04cabd",
  };

  const app = firebase.initializeApp(firebaseConfig);

  return { app };
})();
