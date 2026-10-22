import prompts from 'prompts';
import chalk from 'chalk';
import { randomInt } from 'crypto';
import fs from 'fs';

async function guessGame() {
    const maxAttempts = 3;

    console.log(chalk.magenta("Welcome to the Guessing Game!"));
    console.log("I'm thinking of a number between 1 and 100.");
    console.log(`You have ${chalk.yellow('3')} attempts to guess the number.`);
    while (attempts < maxAttempts && !guessed) {
        attempts++;
        let validGuess = false;
        let userGuess;
        while(!validGuess) {
            const response = await prompts({
                type: 'text',
                name: 'guess',
                message: `Attempts = ${attempts}/${maxAttempts}`
            });
            console.log(`${userGuess}`)
            
        }
        
    }
    if (userGuess === number) {
            logOutput('Congratulations, you guessed correctly');
            guessed = true;
        } else if (userGuess < number){
            logOutput('Too low');
        } else {
            logOutput('Too high')
        }
    if (!guessed) {
        logOutput('Game over')
        logOutput(`The nujmber was ${number}.`);
    }
    logOutput('\n thants for playing')
}

guessGame();