import {  createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {db , auth , storage } from "../config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { ref , uploadBytes , getDownloadUrl} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js"



const form = document.querySelector(`#form`);
const firstname = document.querySelector(`#firstname`);
const lastname = document.querySelector(`#lastname`);
const email = document.querySelector(`#email`);
const password = document.querySelector(`#password`);
const registerBtn = document.querySelector(`#register`);
const profileImage = document.querySelector(`#profileimage`);



form.addEventListener(`submit` , async (event) => {
  console.log(email.value);
  console.log(password.value);
  console.log(firstname.value);
  console.log(lastname.value);
  console.log(profileImage.files[0]);

  const profileImageUrl = await showUrl(profileImage.files[0]);
  console.log(`URL Image ==>` , profileImageUrl);

  
createUserWithEmailAndPassword(auth, email.value, password.value)
.then( async (userCredential) => {
  const user = userCredential.user;
  console.log(user.uid);
});
    try {
    const docRef = await addDoc(collection(db, "users"), {

    firstName:firstname.value ,
    lastName: lastname.value ,
    email:email.value ,
    profileImage: profileImageUrl,
    uid: user.uid,

    });
    console.log(`Documment Written With ID` , docRef.id);

    window.location = ` login.html`;

    }catch (e) {
    console.error("Error adding document: ", e);
    };
});



// REGISTER USER 

// form.addEventListener(`submit` , async (event) =>{
//     event.preventDefault();

//     try {
//     const docRef = await addDoc(collection(db, "users"), {
//     firstName:firstname.value ,
//     lastName: lastname.value ,
//     email:email.value ,
//     });
//         console.log(docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       };
// });




// createUserWithEmailAndPassword(auth, email.value, password.value)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     console.log(user);
    
//     window.location = `login.html`
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(errorMessage);
    
//   });



// IMAGE URL FUNCTION

async function showUrl(files){

    const storageRef = ref(storage , email.value);
    try {
        const uploadImg = await uploadBytes(storageRef , files);
        const url = await getDownloadUrl(storageRef);
        console.log(url);
        return url;
    } catch (error) {
        console.log(error);
    };

};


showUrl();
