import { Client, Account, Avatars } from 'react-native-appwrite';

const client = new Client()
    .setProject('64a7f3f4e2f5d0d6b2e1') //your project ID
    .setPlatform('dev.kas.learnshelf');

export const account  =new Account(client) //create a new instance of account which connect the backend 
export const avatars = new Avatars(client)