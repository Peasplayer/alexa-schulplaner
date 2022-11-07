const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Utils = require('./Utils')

const RegisterLessonIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === "RegisterLessonIntent";
    },
    async handle(handlerInput) {
        let prompt = "Es ist ein Fehler aufgetreten";
        const intent = handlerInput.requestEnvelope.request.intent;

        await db.set(Utils.getSlotValue(intent.slots["day"]).id + "." + intent.slots["lesson"].value, Utils.getSlotValue(intent.slots["subject"]).id)

        prompt = "Am " + Utils.getSlotValue(intent.slots["day"]).name
            + " in der " + Utils.getLessonString(intent.slots["lesson"].value)
            + " Stunde hast du " + Utils.getSlotValue(intent.slots["subject"]).name;

        return handlerInput.responseBuilder.speak(prompt).getResponse();
    }
};

module.exports = RegisterLessonIntent;