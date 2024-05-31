import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

// google제공 Authentication
export function signIn({email,password}) {
    return auth().signInWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        const ownerDoc = await firestore().collection('owners').doc(user.uid).get();
        
        if (userDoc.exists) {
            return { user, role: 'user' };
        } else if (ownerDoc.exists) {
            return { user, role: 'owner' };
        } else {
            throw new Error('User role not found');
        }
    });
}

// User의 가입함수
export function signUpUser({ email, password, additionalData }) {
    return auth().createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
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

// Owner의 가입함수
export function signUpOwner({ email, password, additionalData }) {
    return auth().createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
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