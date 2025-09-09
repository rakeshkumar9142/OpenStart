// src/lib/appwrite.js
import { Client, Databases, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID }; // export ID utility so you don’t import it separately
