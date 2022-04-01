/* ------------------------------ */
/* Project  : Readme Generator    */
/* File     : markdownTemplate.js */
/* Author   : Vicente Garcia      */
/* Date     : 03/31/2022          */
/* Modified : 04/01/2022          */
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


module.exports = markdownData => {
    // Destructure page data by section
    const { name, github, projectName, projectDescription, installInstructions, usageInstructions, projectCredits, contributionGuidelines, license,  } = markdownData;
    return `# ${markdownData.projectName}
  
## Description
  
${markdownData.projectDescription}


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Test](#test)
* [License](#license)
* [Questions](#questions)


## Installation

${markdownData.installInstructions}


## Usage

${markdownData.usageInstructions}


## Contributing

${markdownData.contributionGuidelines}


## Tests

${markdownData.contributionGuidelines}


## License

${markdownData.license}


## Questions

${markdownData.github}

  
    `;
};