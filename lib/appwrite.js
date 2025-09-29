import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('68d3e082003d65757c6f') //your project ID
    .setPlatform('dev.kas.learnshelf');

export const account  =new Account(client) //create a new instance of account which connect the backend 
export const avatars = new Avatars(client)

//create instance which can interact the databse service
export const databases = new Databases(client)