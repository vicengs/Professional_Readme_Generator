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
// Create the about section
const generateLicense = licenses => {
    if (!licenses) {
      return '';
    }
    return `

## License

${licenses}
`;
};

const generateScreenshots = screenshots => {
    if (!screenshots[0].image) {
      return '';
    }
    return `
## Screenshots
    ${screenshots
      .filter(({ eachImage }) => eachImage)
      .map(({ image }) => {
        return `HOLA MUNDO ${image}`;
      })
      .join('')
    }
    ${screenshots
      .filter(({ eachImage }) => eachImage)
      .map(({ image }) => {
        return `HOLA MUNDO ${image}`;
      })
      .join('')
    }
    otro`;
};

module.exports = markdownData => {
    // Destructure page data by section
    const { name, github, email, images } = markdownData;
    const { projectName, projectDescription, installInstructions, usageInstructions, contributionGuidelines, testInstructions, license } = markdownData.project[0];
    return `# ${projectName}
  
## Description
  
${projectDescription}


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Test](#test)
* [License](#license)
* [Questions](#questions)


## Installation

${installInstructions}


## Usage

${usageInstructions}


## Contributing

${contributionGuidelines}


## Tests

${testInstructions}


## Credits

Made by ${name}


## Questions

### Github

https://github.com/${github}

### E-mail

${email}
${generateLicense(license)}
${generateScreenshots(images)}`;
};