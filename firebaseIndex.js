import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.1/firebase-app.js";
import { getDatabase, set, ref, update, get } from "https://www.gstatic.com/firebasejs/10.5.1/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.1/firebase-auth.js";
      
const firebaseConfig = {
    apiKey: "AIzaSyDlGGDbdAnntuJPu9znmx2HRxeoxvb_Bc4",
    authDomain: "campus-club-hub-a2f5b.firebaseapp.com",
    databaseURL: "https://campus-club-hub-a2f5b-default-rtdb.firebaseio.com",
    projectId: "campus-club-hub-a2f5b",
    storageBucket: "campus-club-hub-a2f5b.appspot.com",
    messagingSenderId: "131774428532",
    appId: "1:131774428532:web:3b9296146483cd6121a821"
};
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
  
document.addEventListener('DOMContentLoaded', function () {
    console.log('Document loaded');
    const auth = getAuth();
    const database = getDatabase(app);
    const trialElement = document.getElementById('trial');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = user.uid;
            const userRef = ref(database, 'users/' + userId);
            get(userRef).then((snapshot) => {
                const userData = snapshot.val();
                trialElement.innerHTML = `<a href="./myProfile.html"><button id="back">Welcome, ${userData.username}</button></a>`;
            });
        } else {
            trialElement.innerHTML = '<a href="./login.html" id="trial"><button id="back">Log In</button></a>';
        }
    });
});

const logOutButton = document.getElementById('logout');
logOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    const dt = new Date();
    const user = auth.currentUser;
    if (user) {
        update(ref(database, 'users/' + user.uid), {
            last_logout: dt
        }).then(() => {
            signOut(auth).then(() => {
            document.getElementById('trial').innerHTML = '<a href="./login.html"><button id="back">Log In</button></a>';
            alert('User logged out.');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('Error!');
            });
        }).catch((error) => {
            console.error(error);
        });
    }
});