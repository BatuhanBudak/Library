import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { pubsub } from "./pubsub";

export const firebaseUiModule = (() => {
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
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "https://www.google.com",
    privacyPolicyUrl: "https://www.google.com",
  };

  let ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-modal-auth-container", uiConfig);
  ui.disableAutoSignIn();

  const handleSignedInUser = function (user) {
    pubsub.publish("userSignedIn", user);
  };
  const handleResign = () => {
    ui.start("#firebaseui-modal-auth-container", uiConfig);
    ui.disableAutoSignIn();
    pubsub.publish("userreSign");
  };
  const handleSignedOutUser = function () {
    firebase.auth().signOut();
    pubsub.publish("userSignedOut");
  };
  
  const initApp = function () {
    document
      .getElementById("header--signout-button")
      .addEventListener("click", handleSignedOutUser);

    document
      .getElementById("header--signin-button")
      .addEventListener("click", handleResign);
  };
  window.addEventListener("load", initApp);
})();
