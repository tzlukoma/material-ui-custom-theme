import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyC6NA4Bgys_Kxhx8UVhktfwrnogXCTmsks',
  authDomain: 'bkr-connect-store.firebaseapp.com',
  databaseURL: 'https://bkr-connect-store.firebaseio.com',
  projectId: 'bkr-connect-store',
  storageBucket: 'bkr-connect-store.appspot.com',
  messagingSenderId: '295733332111',
  appId: '1:295733332111:web:48a2f07e1c8048864708fa'
}

export const app = firebase.initializeApp(firebaseConfig)
