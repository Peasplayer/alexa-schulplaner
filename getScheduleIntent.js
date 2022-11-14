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
        console.log("0a")
        let prompt = "Es ist ein Fehler aufgetreten";
        console.log("0b" + intent.slots["day"])
        let day = Utils.getSlotValue(intent.slots["day"]).id;
        console.log("0c")

        console.log("1")

        if (Utils.getSlotValue(intent.slots["day"]).id === "today") {
            const date = new Date(Date.now());
            if (date.getDay() >= 5)
                return handlerInput.responseBuilder.speak("Heute hast du keine Schule").getResponse();

            day = Utils.days[date.getDay()];
        }

        console.log("2")

        if (Utils.getSlotValue(intent.slots["day"]).id === "tomorrow") {
            const date = new Date(Date.now()) + 1;
            if (date.getDay() >= 5)
                return handlerInput.responseBuilder.speak("Morgen hast du keine Schule").getResponse();

            day = Utils.days[date.getDay()];
        }

        console.log("3: " + day)

        prompt = Utils.getSlotValue(intent.slots["day"]).name + "hast du";

        for (let i = 1; i <= 8; i++) {
            console.log("4")
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