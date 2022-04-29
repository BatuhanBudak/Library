import { pubsub } from "./pubsub";

export const uiController = (() => {
  const firebaseContainer = document.querySelector(".firebase-modal-container");
  const mainContentContainer = document.querySelector(".content.hidden");
  const signOutButton = document.getElementById("header--signout-button");
  const signInButton = document.getElementById("header--signin-button");
  const userPhoto = document.getElementById("header--photo");
  const userName = document.getElementById("header--name");

  const handleSignedInUser = (user) => {
    firebaseContainer.classList.toggle("hidden");
    mainContentContainer.classList.remove("hidden");

    if (user.isAnonymous) {
      signOutButton.classList.add("hidden");
      signInButton.classList.remove("hidden");
      userPhoto.style.display = "none";
    } else {
      userName.textContent = user.displayName;
      if (user.photoURL) {
        userPhoto.style.display = "block";
        let photoURL = user.photoURL;
        // Append size to the photo URL for Google hosted images to avoid requesting
        // the image with its original resolution (using more bandwidth than needed)
        // when it is going to be presented in smaller size.
        if (
          photoURL.indexOf("googleusercontent.com") != -1 ||
          photoURL.indexOf("ggpht.com") != -1
        ) {
          photoURL = photoURL + "?sz=" + userPhoto.clientHeight;
        }
        userPhoto.src = photoURL;
      } else {
        userPhoto.style.display = "none";
      }
    }
  };
  const handleSignedOutUser = function () {
    
    userName.textContent = "Welcome Guest";
    userPhoto.style.display = "none";
    signOutButton.classList.add("hidden");
    signInButton.classList.remove("hidden");
  };
  const handleResign = () => {
    firebaseContainer.classList.toggle("hidden");
    signOutButton.classList.remove("hidden");
    signInButton.classList.add("hidden");
  };

  pubsub.subscribe("userSignedIn", handleSignedInUser);
  pubsub.subscribe("userSignedOut",handleSignedOutUser );
  pubsub.subscribe("userreSign", handleResign );
})();
