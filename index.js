/* ---------------------------- */
/* Project  : Readme Generator  */
/* File     : index.js          */
/* Author   : Vicente Garcia    */
/* Date     : 03/31/2022        */
/* Modified : 04/03/2022        */
/* ---------------------------- */
// Add access to inquirer functions & methods to use prompt
const inquirer = require('inquirer');
// Add access to code file with markdown template
const readmeTemplate = require('./src/markdownTemplate.js');
// Add access to code file to write and save README.md file
const generateReadme = require('./utils/generateMarkdown.js');
// Function to ask personal information
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
                    if (emailInput.indexOf("@") < 0){
                        console.log('@ <- Please enter a valid e-mail!');
                        return false;
                    }
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
        },
        {
            type: 'input',
            name: 'repository',
            message: 'Enter the repository name:',
            validate: repositoryInput => {
                if (repositoryInput) {
                    return true;
                } else {
                    console.log('Please enter the repository name!');
                    return false;
                }
            }
        }
    ])
};
// Function to ask project information
const promptProject = readmeAnswers => {
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
    .then(projectData => {
        // Initialize project array
        readmeAnswers.project = [];
        // Add to array the project info
        readmeAnswers.project.push(projectData);
        return readmeAnswers;
    })
};
// Declare variable to know if is the first time to ask about images, if is first time show a message
let firstTime = true;
// Declare variable with question, initialized for first time
let txtMessage = 'Would you like to include an image? (include extension)';
// Function to include, or not, images
const promptImages = readmeAnswers => {
    if (firstTime){
        // If is the first time initialize images array
        readmeAnswers.images = [];
        // Show message in prompt just the first time
        console.log(`
  ==========================================================================
  If you want place images please put the images in the path ./assets/images
  ==========================================================================
        `)
        // Change variable to indicate that it is no longer the first time the next time
        firstTime = false;
    }else{
        // Change the question for the next time(s)
        txtMessage = 'Would you like to include another image?';
    }
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmImage',
            message: txtMessage,
            default: true
        },
        {
            type: 'input',
            name: 'image',
            message: 'Provide the name of the image:',
            when: ({ confirmImage }) => {
              if (confirmImage) {
                return true;
              } else {
                return false;
              }
            }
        },
    ])
    .then(imagesData => {
        // Add to array the image info
        readmeAnswers.images.push(imagesData);
        if (imagesData.confirmImage) {
            // If user wants to include another image, call the function again
            return promptImages(readmeAnswers);
          } else {
            // If user is done with images, exit and go to next function (markdown template) 
            return readmeAnswers;
          }
    })
};
// Function call to initialize app
// Call function to ask personal information
promptPersonal()
    // Call function to ask project information
    .then(promptProject)
    // Call function to include, or not, images
    .then(promptImages)
    // Call function to put information in a template
    .then(readmeAnswers => {
        return readmeTemplate(readmeAnswers);
    })
    // Call function to generate README file
    .then(readmeData => {
        return generateReadme(readmeData);
    })
    // Show message if successful process
    .then(readmeFile => console.log(readmeFile.message))
    // Show message if error
    .catch(err => console.log(err));