// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

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
const auth = getAuth(app)
const db = getDatabase()

// Get elements from HTML by their id
let buttonText = document.getElementById('button')
let buttonLink = document.getElementById('link')

// Detect auth state
const your_function = () => {
    onAuthStateChanged(auth, (user) => {
        if (user !== null) {
            console.log('logged in!')
            buttonText.innerText = "Let's see posts! "
            buttonLink.href = 'index.html'
        } else console.log('No user')
    })
}

document.addEventListener('DOMContentLoaded', function () {
    your_function()
})
