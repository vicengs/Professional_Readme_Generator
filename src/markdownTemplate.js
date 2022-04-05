/* ------------------------------ */
/* Project  : Readme Generator    */
/* File     : markdownTemplate.js */
/* Author   : Vicente Garcia      */
/* Date     : 03/31/2022          */
/* Modified : 04/04/2022          */
/* ------------------------------ */
// Add access to node-fetch to manage API's
const fetch = require('node-fetch');
// Function to generate Badge
const generateBadge = ( id, key ) => {
    if (!key){
      return "";
    }
    return `[![License](https://img.shields.io/static/v1?label=License&message=${id}&color=green)](http://choosealicense.com/licenses/${key}/)

`;
};
// Function to add elements (license and/or screenshots) to table of contents
const addContent = (license, screenshoots) => {
    if (license && screenshoots) {
        return `* [License](#license)
* [Screenshots](#screenshots)
`;
    }else if (license){
        return `* [License](#license)
`;
    }else if (screenshoots){
        return `* [Screenshots](#screenshots)
`;
    };
    return "";
};
const generateLicense = (license, description) => {
    if (!license) {
        return "";
    };
    return `

## License

${license} - ${description}
`;
};
const generateScreenshots = (screenshots, github, repository) => {
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
![${altText}](https://github.com/${github}/${repository}/blob/main/assets/images/${image})`;
        })
        .join("")
    }`;
};
module.exports = async markdownData => {
//const funcioncita = async markdownData =>{
    // Destructure page data by section
    const { name, github, email, repository, images } = markdownData;
    const { projectName, projectDescription, installInstructions, usageInstructions, contributionGuidelines, testInstructions, confirmLicense, license } = markdownData.project[0];
    let key;
    let id;
    let description;
    if (license){
        const api = await fetch("https://api.github.com/licenses");
        const r1 = await api.clone();
        const results = await Promise.all([api.json()]);
        for (let i=0; i<results[0].length; i++){
            if (license === results[0][i].name){
                const api1 = await fetch("https://api.github.com/licenses/"+results[0][i].key);
                const r12 = await api1.clone();
                const results3 = await Promise.all([api1.json()]);
                key = results3[0].key;
                id = results3[0].spdx_id;
                description = results3[0].description;
            };
        };
    };
    return `# ${projectName}

${generateBadge(id, key)}
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
${generateLicense(license, description)}
${generateScreenshots(images, github, repository)}`;
};