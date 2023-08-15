import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

//firebase auth의 state가 변하면 콜백 실행
export function onUserStateChange(callback) {
  //1. 사용자가 있는 경우(로그인한 경우)
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  //2. 사용자가 어드민 권한을 가지고 있는지 확인
  //3.그 정보에 따라 isAdmin에 true 혹은 false 추가
  //3. {...user,isAdmin : true/false}
  // admin 정보는 firebase database 에 있다.
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      //admins 배열안에 user의 uid가 있는지 확인 후 가져오기
      const isAdmin = admins.includes(user.uid);
      console.log(isAdmin);
      return { ...user, isAdmin }; //사용자의 정보와 idAdmin의 정보 추가
    }
    return user; //admin이 아닌경우
  });
}
