let userCredentials = JSON.parse(sessionStorage.getItem('user-credentials'))
let userInfo = JSON.parse(sessionStorage.getItem('user-info'))
let comments = document.getElementById('comments')
let commentInput = document.getElementById('comment')
let post = document.getElementById('post')
let info = document.getElementById('info')
let signOutBtn = document.getElementById('signout')

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { get, child, getDatabase, ref, set } from 'firebase/database'

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

const Filter = require('bad-words')

const customFilter = new Filter()

const enWords = require('../dictionary/en_extra_words.json')
const ruWords = require('../dictionary/ru_extra_words.json')
const kzWords = require('../dictionary/kz_extra_words.json')
// customFilter.addWords(...kzWords)
// customFilter.addWords(...ruWords)
// кирилица не поддерживается
customFilter.addWords(...enWords)

async function getCommentHTML(commentElement) {
    const { comment, date, username } = commentElement
    try {
        let x = await fetch('component/comment.html')
            .then((res) => res.text())
            .then((data) => {
                return {
                    data: JSON.parse(
                        JSON.stringify(
                            data
                                .replace(/{username}/gm, username)
                                .replace(/{comment}/gm, comment)
                                .replace(/{date}/gm, date)
                        )
                    ),
                }
            })
        return x.data
    } catch (error) {
        console.log(error)
    }
}

comments.innerHTML = ''
async function getComments() {
    comments.innerHTML = ''
    get(child(ref(db), 'comments')).then(async (s) => {
        let array = s.val()
        console.log(array)
        for (let element in array) {
            console.log(array[element])
            comments.innerHTML += await getCommentHTML(array[element])
        }
    })
}

const postComment = () => {
    getComments()
    const newComment = {
        comment: customFilter.clean(commentInput.value),
        date: new Date().getTime(),
        username: userCredentials.email.split('@')[0],
    }

    get(child(ref(db), 'comments')).then((snap) => {
        if (snap.exists()) {
            get(child(ref(db), 'comments')).then((s) => {
                let array = s.val()

                console.log(array)

                array.push(newComment)

                set(ref(db, 'comments'), array)

                commentInput.value = ''
            })
        } else {
            console.log('No such document!')
            set(ref(db, 'comments'), [newComment])
        }
    })
}

const isLogged = () => {
    getComments()
    if (!sessionStorage.getItem('user-credentials'))
        window.location.href = 'login.html'
    else {
        //     info.innerHTML = `
        // user with email "${userCredentials.email}" logged in <br>
        // Hello ${userInfo.firstname + ' ' + userInfo.lastname}
        // `
    }
}

const signOut = () => {
    sessionStorage.removeItem('user-credentials')
    sessionStorage.removeItem('user-info')
    window.location.href = 'login.html'
}

window.addEventListener('load', isLogged)
signOutBtn.addEventListener('click', signOut)
post.addEventListener('click', postComment)

window.requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback) {
            window.setTimeout(callback, 1000 / 60)
        }
    )
})()
window.requestAnimFrame
