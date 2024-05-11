/*
    Shrimpo V2
    Made By Polish-Penguin-Dev
*/

const natural = require("natural");
const fs = require("fs");

class Shrimpo {
    constructor(arg = {}) {
        if(!arg.defaults) arg.defaults = ["I don't know that one."];

        this.defaults = arg.defaults;
        this.trained = {};
    }

    train(arg = {}) {
        if(arg.intent == undefined || arg.data === undefined || arg.responses === undefined) throw new Error("Please Provide The Intent, Data and Responses In The Train Function!");
        if(arg.similarity === undefined) arg.similarity = 0.25;

        this.trained[arg.intent] = {
            data: arg.data.map(phrase => phrase.toLowerCase()),
            responses: arg.responses,
            similarity: arg.similarity
        };
    }

    import(path) {
        if(path == undefined) throw new Error("Please Provide The Path In The Import Function!");

        const json = JSON.parse(fs.readFileSync(path, "utf8"));

        for (const intent in json) {
            this.trained[intent] = {
                data: json[intent].data.map(phrase => phrase.toLowerCase()),
                responses: json[intent].responses,
                similarity: json[intent].similarity
            };
        }
    }

    ask(prompt) {
        if (!prompt) throw new Error("Please Provide A Prompt In The Ask Function.");

        let hMatch = null;
        let hSimilarity = -1;
        const lPrompt = prompt.toLowerCase();

        for (const intent in this.trained) {
            this.trained[intent].data.forEach(phrase => {
                const similarity = natural.DiceCoefficient(lPrompt, phrase);

                if (similarity >= this.trained[intent].similarity && similarity > hSimilarity) {
                    hMatch = intent;
                    hSimilarity = similarity;
                }
            });
        }

        if (hMatch !== null) {
            const responses = this.trained[hMatch].responses;
            const rResponse = responses[Math.floor(Math.random() * responses.length)];

            return rResponse;
        } else {
            return this.defaults[Math.floor(Math.random() * this.defaults.length)];
        }
    }
}

module.exports = Shrimpo;