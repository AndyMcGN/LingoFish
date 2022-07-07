## LingoFish
This repo is our final project for the ironhack bootcamp. The project, LingoFish, is a language learning platform, which allows users to upload, read and share texts in foreign languages and learn vocabulary by getting instant translations of words with a simple click.

#### Environment Variables
To start the project, you need to create a .env file with the following variables:
 | Name | Value | 
 |---|---|
 | MONGODB_URI | The url mongo provides when you create your database cluster including the username and password. | 
 | SESSION_SECRET | Any (random) string used for creatings sessions | 
You can optionally add CLOUDINARY_KEY, CLOUDINARY_NAME and CLOUDINARY_SECRET to use cloudinary storage for user-uploaded photos.

Other env vars are PORT and ORIGIN, but they have defaults in the code so you only need to add them if you want to configure them.
