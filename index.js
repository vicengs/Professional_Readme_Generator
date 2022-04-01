/* ---------------------------- */
/* Project  : Readme Generator  */
/* File     : index.js          */
/* Author   : Vicente Garcia    */
/* Date     : 03/31/2022        */
/* Modified : 04/01/2022        */
/* ---------------------------- */
// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const readmeTemplate = require('./src/markdownTemplate.js');
const generateReadme = require('./utils/generateMarkdown.js');
// TODO: Create an array of questions for user input
//const questions = [];
const promptPersonal = () => {
    console.log(`
  ========================================
  Please provide your personal information
  ========================================
  `)
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your e-mail?',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('Please enter a valid e-mail!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username:',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        }
    ])
};
const promptProject = () => {
    console.log(`
  ======================================
  Please provide the project information
  ======================================
      `)
        return inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is your project name?',
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
            message: 'Enter a description for your project:',
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
            message: 'Enter the instructions to install:',
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
            message: 'Enter the instructions to use:',
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
            name: 'contributionGuidelines',
            message: 'Enter the contribution guidelines:',
            validate: contributionInput => {
                if (contributionInput) {
                    return true;
                } else {
                    console.log('Please enter the scontribution guidelines!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'testInstructions',
            message: 'Enter the instructions to test:',
            validate: testInput => {
                if (testInput) {
                    return true;
                } else {
                    console.log('Please enter the instructions to test!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmLicense',
            message: 'Would you like to include a License?',
            default: true
        },
        {
            type: 'rawlist',
            name: 'license',
            message: 'Choose a license:',
            choices: ['Apache License 2.0'
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
                     ,'The Unlicense'],
            when: ({ confirmLicense }) => {
                if (confirmLicense) {
                    return true;
                } else {
                    return false;
                }
            }
        }
  ])
};

// TODO: Create a function to write README file
//function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
//function init() {}
promptPersonal()
    .then(promptProject)
    .then(readmeAnswers => {
        return readmeTemplate(readmeAnswers);
    })
    .then(readmeData => {
        return generateReadme(readmeData);
    })
    .then(readmeFile => {
        console.log(readmeFile.message);
    })
    .catch(err => {
        console.log(err);
    });
// Function call to initialize app
//init();
