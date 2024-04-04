// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyC3bqPNh0N-Yk9rGZ-M-E1EdYBdJ0F0hkM',
    authDomain: 'open-up-queue.firebaseapp.com',
    projectId: 'open-up-queue',
    storageBucket: 'open-up-queue.appspot.com',
    messagingSenderId: '8105934529',
    appId: '1:8105934529:web:cb771f5db77b28c2855e40',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)

// Get form/input from HTML by their id
let form = document.getElementById('form')
let firstName = document.getElementById('first-name')
let lastName = document.getElementById('last-name')
let email = document.getElementById('email')
let password = document.getElementById('password')

const signUp = (event) => {
    event.preventDefault()

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((credentials) => {
            console.log(credentials)
            set(ref(db, 'users/' + credentials.user.uid), {
                firstname: firstName.value,
                lastnsame: lastName.value,
            }).then(() => {
                console.log('User created with uid:', credentials.user.uid)
                window.location.href = 'login.html'
            })
        })
        .catch((error) => {
            alert('Fill credentials correctly or check your internet')
            // alert(error.message)
            // console.log(error.code)
            // console.log(error.message)
        })
}

form.addEventListener('submit', signUp)
