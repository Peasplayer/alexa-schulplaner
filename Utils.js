const Utils = {
    getSlotValue(slot) {
        return slot.resolutions.resolutionsPerAuthority[0].values[0].value;
    },
    getLessonString(lesson) {
        lesson = lesson.toString();
        switch (lesson) {
            case "1":
                return "ersten";
            case "2":
                return "zweiten";
            case "3":
                return "dritten";
            case "4":
                return "vierten";
            case "5":
                return "fünften";
            case "6":
                return "sechsten";
            case "7":
                return "siebten";
            case "8":
                return "achten";
        }
    },
    subjects: {
        "reli": "Religion",
        "wpu": "WPU",
        "powi": "PoWi",
        "physics": "Physik",
        "chemistry": "Chemie",
        "music": "Musik",
        "history": "Geschichte",
        "french": "Französisch",
        "sport": "Sport",
        "english": "Englisch",
        "german": "Deutsch",
        "maths": "Mathe"
    }
};

module.exports = Utils;