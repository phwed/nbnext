import {
  setUser,
  setUsername,
  clearUser,
  clearUsername,
  setLoginLoading,
} from "../slices/authSlice";

import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const setUserMiddleware = (user) => async (dispatch) => {
  console.log(user, "from middleware");

  dispatch(setLoginLoading(true));

  // set user in firestore firebase v9
  await setDoc(doc(db, "users", user.uid), {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  })
    .then(async (res) => {
      const uid = user.uid;
      const usernamesRef = collection(db, "usernames");

      const q = query(usernamesRef, where("uid", "==", uid));

      console.log(uid);
      await getDocs(q)
        .then((querySnapshot) => {
          // check if querySnapshot is not empty
          if (querySnapshot.empty) {
            console.log("no matching documents");
            dispatch(setUser(user));
            dispatch(clearUsername());
            dispatch(setLoginLoading(false));
          } else {
            console.log("matching documents");
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data().uid);
              dispatch(setUser(user));
              dispatch(setUsername(doc.id));
              dispatch(setLoginLoading(false));
            });
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setLoginLoading(false));
        });
    })
    .catch((error) => {
      console.log(error);
      dispatch(setLoginLoading(false));
    });
};

export const setPreferedUsernameMiddleware =
  (username, uid) => async (dispatch) => {
    console.log(username, "from middleware");

    // set user in firestore firebase v9
    await setDoc(doc(db, "usernames", username), {
      uid: uid,
    }).then((res) => {
      console.log("username added to firestore", res);
      dispatch(setUsername(username));
    });
  };



export const logoutMioddleware = () => async (dispatch) => {};
