import { initializeApp } from "firebase/app";
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import firebase from 'firebase/compat/app';

export const firebaseConfigStart = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAmk93N7QbB7OcQHjRjJd_ZaQ1wDxiAePg",
  
    authDomain: "library-project-5c6ff.firebaseapp.com",
  
    projectId: "library-project-5c6ff",
  
    storageBucket: "library-project-5c6ff.appspot.com",
  
    messagingSenderId: "966224722696",
  
    appId: "1:966224722696:web:53029a977858233d04cabd",
  };

  const app = firebase.initializeApp(firebaseConfig);

  let uiConfig = {
    callbacks: {
      // Called when the user has been successfully signed in.
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        return true;
      }
    },
      signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
      // firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: ':3',
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
      window.location.assign(':3');
    }
  };
  
  // Initialize the FirebaseUI Widget using Firebase.
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  // ui.disableAutoSignIn();
  ui.start('#firebaseui-auth-container', uiConfig);
  console.log("asdad");
};


