import {
  auth,
  db,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from '@/config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  displayName: string;
  email: string | null;
  photoURL: string | null;
  providerId: string;
  phoneNumber?: string;
  createdAt: Date;
}

const createUserProfile = async (user: any, additionalData?: Partial<UserProfile>): Promise<UserProfile> => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userData: UserProfile = {
    uid: user.uid,
    displayName: user.displayName || 'Anonymous',
    email: user.email || null,
    photoURL: user.photoURL || null,
    providerId: user.providerData[0]?.providerId || 'anonymous',
    phoneNumber: user.phoneNumber || additionalData?.phoneNumber || null,
    createdAt: new Date(),
  };

  await setDoc(userRef, userData, { merge: true });
  return userData;
};

export const registerWithEmail = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber?: string
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const userProfile = await createUserProfile(user, { displayName: `${firstName} ${lastName}`, phoneNumber });
    return { user: userProfile };
  } catch (error: any) {
    return { error };
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const userProfile = await createUserProfile(user);
    return { user: userProfile };
  } catch (error: any) {
    return { error };
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const userProfile = await createUserProfile(user);
    return { user: userProfile };
  } catch (error: any) {
    return { error };
  }
};

export const loginWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const userProfile = await createUserProfile(user);
    return { user: userProfile };
  } catch (error: any) {
    return { error };
  }
};

export const loginAnonymously = async () => {
  try {
    const { user } = await signInAnonymously(auth);
    const userProfile = await createUserProfile(user);
    return { user: userProfile };
  } catch (error: any) {
    return { error };
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
    return {};
  } catch (error: any) {
    return { error };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return {};
  } catch (error: any) {
    return { error };
  }
};
