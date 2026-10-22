// Imporing necessary external packages and native Node.js modules
import prompts from 'prompts';
import chalk from 'chalk';
import { randomInt } from 'crypto';
import fs from 'fs';

// Helper funciton to print the console and save a clean copy
function logOutput(message, logFile = 'game-log.txt') {
    console.log(message);
    // used gemini to try to understand this part (i think this removes the chalk colors)
    const cleanMessage = message.replace(/\u001b\[[0-9;]*m/g, '');
    fs.appendFileSync(logFile, cleanMessage + '\n');
}

async function guessGame() {
    fs.writeFileSync('game-log.txt', '');  // creates a fresh log file

    // nubmer generation and keeping track of attempts
    const number = randomInt(1, 11);
    const MAX_ATTEMPTS = 3;
    let attempts = 0;
    let guessed = false;

    //Displaying the game
    logOutput(chalk.magenta("GUESS THE NUMBER!"));
    logOutput(chalk.cyan('----------------------------------'));
    logOutput("Guess a number between 1 and 10.");
    logOutput(`You have ${MAX_ATTEMPTS} attempts!\n`);

    // Main loop for the game
    while (attempts < MAX_ATTEMPTS && !guessed) {
        attempts++;
        let validGuess = false;
        let userGuess;

        // Loop that keeps looping until a valid number is provides
        while(!validGuess) {
            const response = await prompts({
                type: 'text',
                name: 'guess',
                message: `Attempts = ${attempts}/${MAX_ATTEMPTS}: Enter your guess`
            });
            // Game exit by Ctrl+C or Esc
            if (response.guess == undefined) {
                logOutput(chalk.red('\nGame exited.'));
                process.exit(0);
            }    

            const input = response.guess;

            // Blocking any attempts to put non number or numbers that are not between 1 - 10
            try {
                // using trim() to reject empty inputs
                if (typeof input !== 'string' || input.trim() === ''){
                    throw new Error('A guess is required.');
                }
                const num = Number(input);
                // this rejects non numbers
                if (isNaN(num) || !Number.isInteger(num)) {
                    throw new Error('Please enter a valid whole number.');
                }
                //this prevents a number less than 1 to go through
                if (num < 1) {
                    throw new Error('Guess must be at least 1.');
                }
                // this prevents a number greater than 10 to go through
                if (num > 10) {
                    throw new Error('Guess cannot exceed 10.');
                }

                userGuess = num
                validGuess = true
            } catch(error){
                // if anything goes wrong an error message in red appears
                logOutput(chalk.red(error.message));
            }
        }
        
    // logic to give a hint or to show that you guessed correctly
    if (userGuess === number) {
            logOutput('Congratulations, you guessed correctly');
            guessed = true;
        } else if (userGuess < number){
            logOutput('Too low');
        } else {
            logOutput('Too high')
        }
    }    
    // Once you run out of guesses the game closes
    if (!guessed) {
        logOutput('Game over')
        logOutput(`The number was ${number}.`);
    }
    logOutput('\n Thanks for playing')
    
}
// this would start the guessGame
guessGame();