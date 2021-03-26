import { auth, firestore } from './firebase';

export const signup = (email, password, name) => auth()
  .createUserWithEmailAndPassword(email, password)
  .then((registeredUser) => {
    firestore.collection('users')
      .doc(registeredUser.user.uid)
      .set({
        uid: registeredUser.user.uid,
        name,
        rooms: [],
      });
  });

export const signin = (email, password) => auth().signInWithEmailAndPassword(email, password);

export const signout = () => auth().signOut();
