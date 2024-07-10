# Easy Quiz [:link:](https://easyquiz1.netlify.app)
Easy Quiz is online test maker for teachers and a collection of various tests for students.
### Features
- Teachers can make online test and share it with students;
- Teachers can independently set the time for the test and score of each question;
- Students can solve many public tests and check their knowledje;
- Once the test starts, a countdown timer starts and the test ends automatically when the time is up;
- At the end of the test, the test is automatically checked and the student's result is sent to the teacher via Telegram bot.
- It also supports Latex commands, which allow you to display mathematical equations in a beautiful and understandable way.
###Try web application
1. Go to [Easy Quiz](https://easyquiz1.netlify.app).
2. Log in with the following example accaunts.

```[
	{
		username:'student',
		password:'student'
	},
	{
		username:'teacher',
		password:'teacher'
	}
]```
# Installation
If you want to check how it works, you can clone the repository and test it.
1. Clone repository.
`git clone git@github.com:DDD5677/Quiz-app.git`
###Backend
2. Install all dependencies for backend.
`cd backend`
`npm install `
3. Create an empty ` .env` file in `/backend`, copy the following contents into it and fill in these variables:
```
PORT = 3000
API_URL  = /api/v1
secret = secret_for_access_token
REFRESH_SECRET = secet_for_refresh_token
TOKEN = token_of_telegram_bot
CHAT_ID  = telegram_id  //CHAT_ID is optional it is need for sending support messages. 
CONNECTION_STRING = mongodb_atlas_url
```
4. Run project in developer mode.
`npm install -D nodemon`
`npm run dev`
5. Run project in production mode.
`npm start`
###Frontend
6. Install all dependencies for frontend.
`cd frontend`
`npm install `
7. Run project in dev mode.
`npm run dev`
8. Build project.
`npm run build`
9. After building, test it locally.
`npm run preview`
