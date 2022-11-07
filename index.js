const Alexa = require('ask-sdk-core');
const express = require("express");
const {ExpressAdapter} = require("ask-sdk-express-adapter");
const { QuickDB } = require("quick.db");

const launchRequest = require('./launchRequest')
const registerLessonIntent = require('./registerLessonIntent')
const getScheduleIntent = require('./getScheduleIntent')

const skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        launchRequest,
        registerLessonIntent,
        getScheduleIntent
    )
    .create();

const db = new QuickDB();
const app = express();
const adapter = new ExpressAdapter(skill, true, true);

app.post('/', adapter.getRequestHandlers());

app.listen(3000, () => console.log("Server is up on port 3000"))