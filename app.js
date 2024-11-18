// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACw5CB5K3_e9-eroseXMJJ_eZ7l5739wI",
  authDomain: "ecomm-database2.firebaseapp.com",
  projectId: "ecomm-database2",
  storageBucket: "ecomm-database2.firebasestorage.app",
  messagingSenderId: "667749276754",
  appId: "1:667749276754:web:aa7896875bade31ab5938b",
  measurementId: "G-Q0EP5VFK09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getDatabase(app);
export const auth = getAuth(app);

function saveData() {
  const username = document.getElementById("username").value;

  const db = getDatabase();
  const userRef = ref(db, 'users/' + username);

  set(userRef, {
      username: username,
      timestamp: new Date().toISOString()
  }).then(() => {
      alert("Data saved successfully!");
  }).catch((error) => {
      console.error("Error saving data:", error);
  });
}

const userList = document.getElementById("userList");

function displayData() {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
        userList.innerHTML = ""; // Clear the list
        snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            const li = document.createElement("li");
            li.textContent = `Username: ${user.username}, Timestamp: ${user.timestamp}`;
            userList.appendChild(li);
        });
    });
}

displayData();

function updateData() {
  const username = document.getElementById("usernameUpdate").value;

  const db = getDatabase();
  const userRef = ref(db, 'users/' + username);

  set(userRef, {
      username: username,
      updated: true
  }).then(() => {
      alert("Data updated successfully!");
  }).catch((error) => {
      console.error("Error updating data:", error);
  });
}

import { remove } from "firebase/database";

function deleteData() {
    const username = document.getElementById("usernameDelete").value;

    const db = getDatabase();
    const userRef = ref(db, 'users/' + username);

    remove(userRef).then(() => {
        alert("Data deleted successfully!");
    }).catch((error) => {
        console.error("Error deleting data:", error);
    });
}
