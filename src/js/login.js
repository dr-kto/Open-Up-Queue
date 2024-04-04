// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, get, ref, child } from 'firebase/database'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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
const dbRef = ref(db)

// Get form/input from HTML by their id
let form = document.getElementById('form')
let email = document.getElementById('email')
let password = document.getElementById('password')

const signIn = (event) => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((credentials) => {
            console.log(credentials)
            get(child(dbRef, 'users/' + credentials.user.uid)).then(
                (snapshot) => {
                    if (snapshot.exists) {
                        sessionStorage.setItem(
                            'user-info',
                            JSON.stringify({
                                firstname: snapshot.val().firstname,
                                lastname: snapshot.val().lastname,
                            })
                        )
                        sessionStorage.setItem(
                            'user-credentials',
                            JSON.stringify(credentials.user)
                        )
                        window.location.href = 'home.html'
                    }
                }
            )
        })
        .catch((error) => {
            alert('Enter valid credentials or check your connection ')
            // alert(error.message)
            // console.log(error.code)
            // console.log(error.message)
        })
}

form.addEventListener('submit', signIn)
