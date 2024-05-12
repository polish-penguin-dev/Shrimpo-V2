# Shrimpo V2 🦐

![PoweredByNatural](https://github.com/polish-penguin-dev/Shrimpo-V2/assets/74113025/97a3ae3f-4032-4a3a-979e-1296624b83e1) ![UsingDiceCoefficient](https://github.com/polish-penguin-dev/Shrimpo-V2/assets/74113025/a063cbf2-82f6-42f5-86d5-1cb89626cbd1)

Ever wanted to create simple chatbots without paying lots to OpenAI? Shrimpo is for you!
Shrimpo matches the training data it is provided with and compares it to user prompts to return a result.
It's not exactly "AI", but works well for simple cases or simple customer service settings.

# 1. Train

The first step to creating a chatbot is training it to match user prompts to an 'intent' (category) and then giving it a set of responses it will send back.
If a prompt is provided that cannot be matched to a category, a random response from the defaults will be returned. 
You can specify a minimum similarity of a user prompt to what it has been trained to achieve a wider range of responses or a more specific range (0.25 by default).

```js
    const Shrimpo = require("shrimpo");
    const bot = new Shrimpo({
        defaults: ["Sorry, I don't know that one.", "Could you please repeat?"]
    });

    bot.train({
        intent: "greeting",
        data: ["Hi", "Hello", "Yellow", "Hello There!"],
        responses: ["Greetings from Shrimpo!"],
        similarity: 0.5
    });
```

# 2. Ask

After training your bot, you are ready to talk to it!

```js
console.log(bot.ask("Hello!"));
//"Greetings from Shrimpo!"
```

# 3. Datasets

If your chatbot has lots of training data, you can turn it into a dataset. Datasets are written in JSON, like so:

```json
[
    {
        "intent": "greeting",
        "data": [],
        "responses": [],
        "similarity": 0
    },
    {
        "intent": "insult",
        "data": [],
        "responses": [],
        "similarity": 0
    }
]
```

Then they can be imported like so:

```js
bot.import("./datset.json");
```