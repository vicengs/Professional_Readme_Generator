/* ------------------------------ */
/* Project  : Readme Generator    */
/* File     : markdownTemplate.js */
/* Author   : Vicente Garcia      */
/* Date     : 03/31/2022          */
/* Modified : 04/01/2022          */
/* ------------------------------ */
const fetch = require('node-fetch');
const addContent = (license, screenshoots) => {
    if (license && screenshoots) {
        return `* [License](#license)
* [Screenshots](#screenshots)`;
    }else if (license){
        return "* [License](#license)";
    }else if (screenshoots){
        return "* [Screenshots](#screenshots)";
    };
    return "";
};
const getBadge = licenseName => { 
    fetch("https://api.github.com/licenses")
    .then((response) => {
        return response.json();
    })
    .then((resp) => {
        for (let i=0; i<resp.length; i++){
            if (resp[i].name === licenseName){
                console.log(resp[i].key);
                return ` IMPRIMETE -> ${resp[i].key}`;
                ;
            };
        };
    })
};
const generateLicense = license => {
    if (!license) {
        return "";
    };
    let prueba = getBadge(license);
    console.log(prueba); 
    return `
## License

${license}
`;
};
const generateScreenshots = (screenshots) => {
    if (!screenshots[0].image) {
        return "";
    };
    return `
## Screenshots
    ${screenshots
        .filter(({ confirmImage }) => confirmImage)
        .map(({ image }) => {
            let altText = image;
            altText = altText.substring(0,altText.indexOf("."));
            return `
![${altText}](assets/images/${image})
`;
        })
        .join("")
    }`;
};
module.exports = markdownData => {
    // Destructure page data by section
    const { name, github, email, images } = markdownData;
    const { projectName, projectDescription, installInstructions, usageInstructions, contributionGuidelines, testInstructions, confirmLicense, license } = markdownData.project[0];
    return `# ${projectName}
[![License](https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)
[![License](https://img.shields.io/badge/License-Hola%20Mundo-green.svg)](http://choosealicense.com/licenses/mit/)
[![License](https://img.shields.io/badge/License-Hola%20Mundo-green)](http://choosealicense.com/licenses/mit/)
## Description
  
${projectDescription}


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Test](#test)
* [Credits](#credits)
* [Questions](#questions)
${addContent(confirmLicense,images[0].confirmImage)}


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

For more questions contact me at ${email}
${generateLicense(license)}
${generateScreenshots(images)}`;
};