
# Minon Mentor
Welcome to our innovative web app that revolutionizes training and knowledge sharing within your organization. With our powerful features, you can effortlessly compose captivating training tutorials, craft engaging questionnaires, empower your staff through effective training, and foster a collaborative work environment for seamless knowledge exchange.


## Env variables

`FRONT_END_PORT` `PORT`

`SECRET` `EXPIRITY_IN_HOURS`

`POSTGRES_USER` `POSTGRES_PASSWORD` `POSTGRES_PORT` `DB_NAME`

`TWILLIO_NUMBER` `TWILLIO_ACCOUNT_SID` `TWILLIO_AUTH_TOKEN`

`EMAIL_ACCOUNT` `EMAIL_PASSWORD`


## Get Started
### Client
- ```npm i``` to install the required node modules
- ```npm test``` to run the client tests
- ```npm start``` to run the front app

Env variables

`VITE_BE_BASE_URL`


### Server
- ```npm i``` to install the required node modules
- ```npm test``` to run the server tests
- ```npm start``` to run the server

Env variables

`FRONT_END_PORT` `PORT`

`SECRET` `EXPIRITY_IN_HOURS`

`POSTGRES_USER` `POSTGRES_PASSWORD` `POSTGRES_PORT` `DB_NAME`

`TWILLIO_NUMBER` `TWILLIO_ACCOUNT_SID` `TWILLIO_AUTH_TOKEN`

`EMAIL_ACCOUNT` `EMAIL_PASSWORD`
## Features

- User authentication
- Create/Edit/Delete posts
- See diferent users posts
- Tests in front and back end

- User Registration: Register as a new user with email and phone number verification.
- User Login: Log in to access the web app and personalized features.
- User Roles: The first registered user becomes the admin with special privileges.
- Admin Approval: New user registrations are marked as pending and require admin approval.
- Admin Dashboard: Access a dashboard with an overview of team statistics and profile information.
- Tutorial Creation: Admin can create multiple tutorials with different types and features.
- Tagged Tutorials: Create tutorials with tags and optional quizzes for targeted learning.
- General Tutorials: Create tutorials without specific tags or quizzes for broader knowledge sharing.
- Quiz Integration: Include quizzes in tutorials to assess user understanding and knowledge retention.
- User Statistics: View individual user statistics, including test results and tutorial completion.
- User Profile: Access and update personal profile information.
- General Tutorials: View a collection of general tutorials available for all users.
- Tagged Tutorials: Explore tutorials based on specific tags for focused learning.
- Locked Tutorials: Identify tutorials that are currently locked and inaccessible to the user.
- User Approval: Admin can accept or reject pending user registrations.
## Stack

**Front-end:** Vite, MaterialUI, Typescript, Jest

**Back-end:** Bcrypt, Express, Typescript, Multer, JWT, Nodemailer, Sequelize, Express-Validator, Twillio

**Database:** Postgres

## Authors

- [@Antonio](https://github.com/AntonioSilvaVaz)
- [@Rene](https://github.com/ReneCodes)
- [@Caian](https://github.com/CaianKeyes)
- [@Marko](https://github.com/markogra)

