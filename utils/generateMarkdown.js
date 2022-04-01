/* ------------------------------ */
/* Project  : Readme Generator    */
/* File     : generateMarkdown.js */
/* Author   : Vicente Garcia      */
/* Date     : 03/31/2022          */
/* Modified : 04/01/2022          */
/* ------------------------------ */
// Add access to fs functions & methods to manage (create) files
const fs = require("fs");
// Exported function to generate README file
module.exports = fileContent => {
    return new Promise((resolve, reject) => {
        // Call fs function called writeFile to: 
        // Create README.md file (path and name first argument)
        // With the data (in second argument)
        // And lastly an error control function
        fs.writeFile("./dist/README.md", fileContent, createFileError => {
            // If there's an error when create file, send the error as a response (received by the catch method in index)
            if (createFileError) {
                reject(createFileError);
                // Return out of the function to avoid execute the resolve() function as well
                return;
            }
            // If file was created well, send the successful message to the index method that called here to create file
            resolve({
                ok: true,
                message: `  =================================
  File README.md created!
  ---------------------------------
  Review distribution folder (dist)
  =================================`
            });
        });
    });
};