import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export function signIn({email,password}) {
    return auth().signInWithEmailAndPassword(email,password);
}

export function signUpUser({ email, password, additionalData }) {
    return auth().createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
    // 사용자 생성 후 추가 데이터를 Firestore에 저장하는 예시
        await firestore().collection('users').doc(user.uid).set({
            id:user.uid,
            name: additionalData.name,
            birth: additionalData.birth,
            workplace:null
        });
        return { user };
    })
    .catch(error => {
        throw error;
    });
}
export function signUpOwner({ email, password, additionalData }) {
    return auth().createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
    // 사용자 생성 후 추가 데이터를 Firestore에 저장하는 예시
        await firestore().collection('owners').doc(user.uid).set({
            id:user.uid,
            ownername: additionalData.ownername,
            businessnumber: additionalData.businessnumber
        });
        return { user };
    })
    .catch(error => {
        throw error;
    });
}

export function subscribeAuth(callback) {
    return auth().onAuthStateChanged(callback);
}

export function signOut() {
    return auth().signOut();
}