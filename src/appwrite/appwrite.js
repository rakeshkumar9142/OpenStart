// src/lib/appwrite.js
import { Client, Databases, Account, Teams, ID } from "appwrite"; // 👈 1. Add Teams here

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const teams = new Teams(client); // 👈 2. And export it here
export { ID }; // export ID utility so you don’t import it separately