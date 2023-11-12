import { INewUser } from '@/types';
import { ID } from 'appwrite';
import { account, avatars, databases } from './config';
import { appwriteConfig } from './config';
import { Query } from 'appwrite';

async function checkUserExists(email: string) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('email', email)]
    );

    return result.documents.length > 0;
  } catch (error) {
    console.error('Error checking user existence:', error);
    return false;
  }
}

export async function createUserAccount(user: INewUser) {
  try {
    const userExists = await checkUserExists(user.email);
    if (userExists) throw new Error('User with such email already exists');

    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error('Could not create account');

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error('Could not get current account');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw new Error('Could not get current user');

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
