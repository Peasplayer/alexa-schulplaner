const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Utils = require('./Utils')

const GetScheduleIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === "GetScheduleIntent";
    },
    async handle(handlerInput) {
        let prompt = "Es ist ein Fehler aufgetreten";
        const intent = handlerInput.requestEnvelope.request.intent;

        //await db.set(Utils.getSlotValue(intent.slots["day"]).id + "." + intent.slots["lesson"], Utils.getSlotValue(intent.slots["subject"]).id)

        prompt = "Am " + Utils.getSlotValue(intent.slots["day"]).name + "hast du";

        for (let i = 1; i <= 8; i++) {
            let subject = await db.get(Utils.getSlotValue(intent.slots["day"]).id + "." + i)
            console.log("2: " + i)
            if (subject !== undefined) {
                console.log("3")
                prompt += " in der " + Utils.getLessonString(i)
                    + " Stunde " + Utils.subjects[subject] + ","
                console.log("4: " + prompt.toString())
            }
        }

        return handlerInput.responseBuilder.speak(prompt).getResponse();
    }
};

module.exports = GetScheduleIntent;