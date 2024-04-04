let userCredentials = JSON.parse(sessionStorage.getItem('user-credentials'))
let userInfo = JSON.parse(sessionStorage.getItem('user-info'))
let comments = document.getElementById('comments')
let comment = document.getElementById('comment')
let post = document.getElementById('post')
let info = document.getElementById('info')
let signOutBtn = document.getElementById('signout')

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { get, child, getDatabase, ref, set } from 'firebase/database'
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

const signOut = () => {
    sessionStorage.removeItem('user-credentials')
    sessionStorage.removeItem('user-info')
    window.location.href = 'login.html'
}

const Filter = require('bad-words')

const customFilter = new Filter()

const enWords = require('../dictionary/en_extra_words.json')
const ruWords = require('../dictionary/ru_extra_words.json')
const kzWords = require('../dictionary/kz_extra_words.json')
// customFilter.addWords(...kzWords)
// customFilter.addWords(...ruWords)
// кирилица не поддерживается
customFilter.addWords(...enWords)

const postComment = () => {
    get(child(ref(db), 'comments/' + userCredentials.uid)).then((s) => {
        let array = s.val().comments
        array.push({
            comment: customFilter.clean(comment.value),
            date: new Date().getTime(),
        })
        set(ref(db, 'comments/' + userCredentials.uid), {
            comments: array,
            username: userCredentials.email,
        })
        comment.value = ''
    })
}

const isLogged = () => {
    if (!sessionStorage.getItem('user-credentials'))
        window.location.href = 'login.html'
    else {
        //     info.innerHTML = `
        // user with email "${userCredentials.email}" logged in <br>
        // Hello ${userInfo.firstname + ' ' + userInfo.lastname}
        // `
    }
}

window.addEventListener('load', isLogged)
// signOutBtn.addEventListener('click', signOut)
post.addEventListener('click', postComment)
