import { Client, Account, Avatars, Databases, Storage } from 'react-native-appwrite';
import Constants from 'expo-constants'; //access custom configuration data defined in app.json(using extra key)

const extra = Constants.expoConfig?.extra ?? {};
const endpoint = extra.APPWRITE_ENDPOINT;
const projectId = extra.APPWRITE_PROJECT_ID;
const databaseId = extra.APPWRITE_DATABASE_ID;
const collectionId = extra.APPWRITE_COLLECTION_ID;
const resourcesCollectionId = extra.APPWRITE_RESOURCES_COLLECTION_ID;
const resourcesBucketId = extra.APPWRITE_RESOURCES_BUCKET_ID; 

export const ids = {
    databaseId,
    resourcesCollectionId,
    resourcesBucketId,
    collectionId
}

export const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId) //your project ID

export const account  =new Account(client) //create a new instance of account which connect the backend 
export const avatars = new Avatars(client)
export const databases =  new Databases(client) //create instance which can interact the database service
export const storage = new Storage(client)

