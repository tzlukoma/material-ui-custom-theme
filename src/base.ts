import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: 'AIzaSyC6NA4Bgys_Kxhx8UVhktfwrnogXCTmsks',
  authDomain: 'bkr-connect-store.firebaseapp.com',
  databaseURL: 'https://bkr-connect-store.firebaseio.com',
  projectId: 'bkr-connect-store',
  storageBucket: 'bkr-connect-store.appspot.com',
  messagingSenderId: '295733332111',
  appId: '1:295733332111:web:48a2f07e1c8048864708fa'
}

firebase.initializeApp(firebaseConfig)

if (window.location.hostname === 'localhost') {
  console.log(
    'testing locally -- hitting local functions and firestore emulators'
  )
  firebase.functions().useEmulator('http://localhost:5001',5001)
  firebase.firestore().settings({
    host: 'localhost:8080',
    ssl: false
  })
}
export const app = firebase
export const storage = firebase.storage()
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const analytics = firebase.analytics()
