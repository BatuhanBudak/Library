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
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
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
    pubsub.publish("userreSign");
  };
  const handleSignedOutUser = function () {
    firebase.auth().signOut();
    pubsub.publish("userSignedOut");
  };
  /**
   * TODO
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
  };
  window.addEventListener("load", initApp);
})();
