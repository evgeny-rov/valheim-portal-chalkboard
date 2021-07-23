import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import { Portal } from '../types';

const firebaseConfig = {
  apiKey: 'AIzaSyDFdJRklJShYnFt1sWjbH2BJFCC38X_Ul8',
  authDomain: 'valheim-portal-chalkboard.firebaseapp.com',
  projectId: 'valheim-portal-chalkboard',
  storageBucket: 'valheim-portal-chalkboard.appspot.com',
  messagingSenderId: '955698804108',
  appId: '1:955698804108:web:b16ed96fe9dee2090012a9',
  measurementId: 'G-P4911LXV3V',
};

firebase.initializeApp(firebaseConfig);

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  firebase.firestore().collection(collectionPath).withConverter(converter<T>());

const db = {
  portals: dataPoint<Portal>('portals'),
};

export { db };
