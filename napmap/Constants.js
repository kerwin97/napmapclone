import firebase from 'firebase';

export const usersDB = firebase.firestore().collection(`usersDB`);
export const routesDB = firebase.firestore().collection(`routesDB`);