import { Client, Account, Avatars, Databases } from 'react-native-appwrite';
import Constants from 'expo-constants'; //access custom configuration data defined in app.json(using extra key)

const extra = Constants.expoConfig?.extra ?? {};
const endpoint = extra.APPWRITE_ENDPOINT;
const projectId = extra.APPWRITE_PROJECT_ID;

export const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId) //your project ID

export const account  =new Account(client) //create a new instance of account which connect the backend 
export const avatars = new Avatars(client)

//create instance which can interact the databse service
export const databases = new Databases(client)