const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Utils = require('./Utils')

const GetScheduleIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === "GetScheduleIntent";
    },
    async handle(handlerInput) {
        const intent = handlerInput.requestEnvelope.request.intent;
        let prompt = "Es ist ein Fehler aufgetreten";
        let day = Utils.getSlotValue(intent.slots["day"]).id;

        if (Utils.getSlotValue(intent.slots["day"]).id === "today") {
            const date = new Date(Date.now());
            if (date.getDay() >= 5 || date.getDay() === 0)
                return handlerInput.responseBuilder.speak("Heute hast du keine Schule").getResponse();

            day = Utils.days[date.getDay() - 1];
        }

        if (Utils.getSlotValue(intent.slots["day"]).id === "tomorrow") {
          const today = new Date()
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)
            if (tomorrow.getDay() >= 5 || tomorrow.getDay() === 0)
                return handlerInput.responseBuilder.speak("Morgen hast du keine Schule").getResponse();

            day = Utils.days[tomorrow.getDay() - 1];
        }

        prompt = Utils.getSlotValue(intent.slots["day"]).name + " hast du";

        for (let i = 1; i <= 8; i++) {
            let subject = await db.get(day + "." + i)
            if (subject !== undefined) {
                prompt += " in der " + Utils.getLessonString(i)
                    + " Stunde " + Utils.subjects[subject] + ","
            }
        }

        return handlerInput.responseBuilder.speak(prompt).getResponse();
    }
};

module.exports = GetScheduleIntent;