/* ------------------------------ */
/* Project  : Readme Grenerator   */
/* File     : generateMarkdown.js */
/* Author   : Vicente Garcia      */
/* Date     : 03/31/2022          */
/* Modified : 03/31/2022          */
/* ------------------------------ */
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
/*function generateMarkdown(data) {
  return `# ${data.title}

`};
module.exports = generateMarkdown;*/



const fs = require('fs');
//const writeFile
module.exports = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            // If there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                // Return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }
            // If everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};
/*const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            // If there's an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                // Return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }
            // If everything went well, resolve the Promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File copied!'
            });
        });
    });
};*/
//module.exports = { writeFile, copyFile };
