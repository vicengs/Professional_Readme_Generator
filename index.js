/* ---------------------------- */
/* Project  : Readme Grenerator */
/* File     : index.js          */
/* Author   : Vicente Garcia    */
/* Date     : 03/31/2022        */
/* Modified : 03/31/2022        */
/* ---------------------------- */
// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
// TODO: Create an array of questions for user input
//const questions = [];
const promptReadme = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: projectInput => {
                if (projectInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectName',
            message: 'What is your project name? (Required)',
            validate: projectInput => {
                if (projectInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectDescription',
            message: 'Enter a description for your project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a description for your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installInstructions',
            message: 'Enter the instructions to install (Required)',
            validate: installInput => {
                if (installInput) {
                    return true;
                } else {
                    console.log('Please enter the instructions to install!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usageInstructions',
            message: 'Enter the instructions to use (Required)',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please enter the instructions to use!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectCredits',
            message: 'Enter the creator(s), collaborators and/or contributors (Required)',
            validate: contributionInput => {
                if (contributionInput) {
                    return true;
                } else {
                    console.log('Please enter the creator(s), collaborators and/or contributors!');
                    return false;
                }
            }
        },
        {
            type: 'rawlist',
            name: 'license',
            message: 'Choose a license',
            choices: ['None'
                     ,'Apache License 2.0'
                     ,'GNU General Public License v3.0'
                     ,'MIT License'
                     ,'BSD 2-Clause "Simplified" License'
                     ,'BSD 3-Clause "New" or "Revised" License'
                     ,'Boost Software License 1.0'
                     ,'Creative Commons Zero v1.0 Universal'
                     ,'Eclipse Public License 2.0'
                     ,'GNU Affero General Public License v3.0'
                     ,'GNU General Public License v2.0'
                     ,'GNU Lesser General Public License v2.1'
                     ,'Mozilla Public License 2.0'
                     ,'The Unlicense']
        },
  ])
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
//function init() {}
promptReadme()
    .then(answers => {
        console.log(answers);
    })
    .catch(err => {
        console.log(err);
    });
console.log("ES ASINCRONO");
// Function call to initialize app
//init();
