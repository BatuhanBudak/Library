import { initializeApp } from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
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

  let uiConfig = {
    callbacks: {
      // Called when the user has been successfully signed in.
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        if (authResult.user) {
          handleSignedInUser(authResult.user);
        }

        // Do not redirect.
        return false;
      },
    },
    signInFlow: "popup",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //  {
      //   provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //   scopes: [
      //     'https://www.googleapis.com/auth/contacts.readonly'
      //   ],
      //   customParameters: {
      //     // Forces account selection even when one account
      //     // is available.
      //     prompt: 'select_account'
      //   }
      //  },
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: "https://www.google.com",
    // Privacy policy url/callback.
    privacyPolicyUrl: "https://www.google.com",
  };

  // Initialize the FirebaseUI Widget using Firebase.
  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  // ui.disableAutoSignIn();
  ui.start("#firebaseui-auth-container", uiConfig);
  ui.disableAutoSignIn();

  const handleSignedInUser = function (user) {
    document.querySelector(".firebase-container").classList.toggle("hidden");
    document.querySelector(".content.hidden").classList.toggle("hidden");

    if (user.isAnonymous) {
      document
        .getElementById("header--signout-button")
        .classList.toggle("hidden");
      document
        .getElementById("header--signin-button")
        .classList.toggle("hidden");
        document.getElementById("photo").style.display = "none";
    } else {
      document.getElementById("name").textContent = user.displayName;
      if (user.photoURL) {
        let photoURL = user.photoURL;
        // Append size to the photo URL for Google hosted images to avoid requesting
        // the image with its original resolution (using more bandwidth than needed)
        // when it is going to be presented in smaller size.
        if (
          photoURL.indexOf("googleusercontent.com") != -1 ||
          photoURL.indexOf("ggpht.com") != -1
        ) {
          photoURL =
            photoURL + "?sz=" + document.getElementById("photo").clientHeight;
        }
        document.getElementById("photo").src = photoURL;
        // document.getElementById('photo').style.display = 'block';
      } else {
        document.getElementById("photo").style.display = "none";
      }
    }
  };

  const handleResign = () => {
    ui.start("#firebaseui-auth-container", uiConfig);
    document.querySelector(".firebase-container").classList.toggle("hidden");
  };

  /**
   * Displays the UI for a signed out user.
   */
  const handleSignedOutUser = function () {
    // document.getElementById('user-signed-in').style.display = 'none';
    // document.getElementById('user-signed-out').style.display = 'block';
    // ui.start('#firebaseui-container', uiConfig);
    firebase.auth().signOut();
    document.getElementById("name").textContent = "Welcome Guest";
    document.getElementById("photo").style.display = "none";
    document
      .getElementById("header--signout-button")
      .classList.toggle("hidden");
    document.getElementById("header--signin-button").classList.toggle("hidden");
  };

  // Listen to change in auth state so it displays the correct UI for when
  // the user is signed in or not.
  firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById("loading").style.display = "none";
    // document.getElementById('loaded').style.display = 'block';
    // user ? handleSignedInUser(user) : handleSignedOutUser();
  });

  /**
   * Deletes the user's account.
   */
  const deleteAccount = function () {
    firebase
      .auth()
      .currentUser.delete()
      .catch(function (error) {
        if (error.code == "auth/requires-recent-login") {
          // The user's credential is too old. She needs to sign in again.
          firebase
            .auth()
            .signOut()
            .then(function () {
              // The timeout allows the message to be displayed after the UI has
              // changed to the signed out state.
              setTimeout(function () {
                alert("Please sign in again to delete your account.");
              }, 1);
            });
        }
      });
  };

  const initApp = function () {
    document
      .getElementById("header--signout-button")
      .addEventListener("click", handleSignedOutUser);

    document
      .getElementById("header--signin-button")
      .addEventListener("click", handleResign);
    // document.getElementById('delete-account').addEventListener(
    //     'click', function() {
    //       deleteAccount();
    //     });

    // document.getElementById('recaptcha-normal').addEventListener(
    //     'change', handleConfigChange);
    // document.getElementById('recaptcha-invisible').addEventListener(
    //     'change', handleConfigChange);
    // // Check the selected reCAPTCHA mode.
    // document.querySelector(
    //     'input[name="recaptcha"][value="' + getRecaptchaMode() + '"]')
    //     .checked = true;

    // document.getElementById('email-signInMethod-password').addEventListener(
    //     'change', handleConfigChange);
    // document.getElementById('email-signInMethod-emailLink').addEventListener(
    //     'change', handleConfigChange);
    // // Check the selected email signInMethod mode.
    // document.querySelector(
    //     'input[name="emailSignInMethod"][value="' + getEmailSignInMethod() + '"]')
    //     .checked = true;
    // document.getElementById('email-disableSignUp-status').addEventListener(
    //     'change', handleConfigChange);
    // document.getElementById("email-disableSignUp-status").checked =
    //     getDisableSignUpStatus();
    // document.getElementById('admin-restricted-operation-status').addEventListener(
    //     'change', handleConfigChange);
    // document.getElementById("admin-restricted-operation-status").checked =
    //     getAdminRestrictedOperationStatus();
  };

  window.addEventListener("load", initApp);
})();
