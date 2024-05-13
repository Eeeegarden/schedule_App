import firestore from '@react-native-firebase/firestore';

export const ownerCollection = firestore().collection('owners');

export function createOwner({id,ownername,businessnumber}){
    return ownerCollection.doc(id).set({
        id,
        ownername,
        businessnumber
    });
}

export async function getOwner(id){
    const doc = await ownerCollection.doc(id).get();
    return doc.data();
}
