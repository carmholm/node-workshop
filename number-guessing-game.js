// Generate a random number between 1 and 100. Using the browser functions prompt and alert, ask the user to guess the number. You should give them 4 tries to guess the number. If they guess wrong, tell them if it’s higher or lower. If they guess right, congratulate them. Otherwise, give them a message saying what the correct number was, as well as their list of guesses.

var guess = {
    properties: {
        number: {
            description: 'Guess a number between 1 and 100',
            type: 'integer',
            required: true
        },
    }
};

var prompt = require('prompt');

prompt.start();

prompt.get(guess, function(err, result) {

    var randomNumber = Math.floor((Math.random() * (100 - 1)) + 1);

    if (result.number > randomNumber) {
        console.log("Woah! Too high, try a lower number.");
    }
    else if (result.number < randomNumber) {
        console.log("Not quite...try a higher number.");
    }
    else {
        console.log("You got it, amazing!");
        return;
    }

    prompt.get(guess, function(err, result2) {

        if (result2.number > randomNumber) {
            console.log("Woah! Too high, try a lower number.");
        }
        else if (result2.number < randomNumber) {
            console.log("Not quite...try a higher number.");
        }
        else {
            console.log("You got it, amazing!");
            return;
        }

        prompt.get(guess, function(err, result3) {

            if (result3.number > randomNumber) {
                console.log("Woah! Too high, try a lower number. Last try!");
            }
            else if (result3.number < randomNumber) {
                console.log("Not quite...try a higher number. Last try!");
            }
            else {
                console.log("You got it, amazing!");
                return;
            }

            prompt.get(guess, function(err, result4) {

                if (result4.number !== randomNumber) {
                    console.log("Sorry! " + result.number + "," + result2.number + "," + result3.number + " and " + result4.number + " were all wrong. The correct number was " + randomNumber + ".");
                }
                else {
                    console.log("Lucky duck! You got it!");
                }
            });
        });
    });
});
