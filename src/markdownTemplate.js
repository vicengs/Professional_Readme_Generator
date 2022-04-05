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
const addContent = (license, screenshots) => {
    if (license && screenshots) {
        return `* [License](#license)
* [Screenshots](#screenshots)
`;
    }else if (license){
        return `* [License](#license)
`;
    }else if (screenshots){
        return `* [Screenshots](#screenshots)
`;
    };
    return "";
};
// Funtion to generate license section
const generateLicense = (license, description) => {
    if (!license) {
        return "";
    };
    return `

## License

${license} - ${description}
`;
};
// Funtion to generate screenshots section
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
![${altText}](/assets/images/${image})`;
        })
        .join("")
    }`;
};
// Principal exported async function to avoid continue if API is not resolve
module.exports = async markdownData => {
//const funcioncita = async markdownData =>{
    // Destructure page data by section
    const { name, github, email, repository, images } = markdownData;
    const { projectName, projectDescription, installInstructions, usageInstructions, contributionGuidelines, testInstructions, confirmLicense, license } = markdownData.project[0];
    // Declare variables to storage API license values
    let key;
    let id;
    let description;
    // The API is called just if user choose license
    if (license){
        // Call API and storage in licenses API url
        const licensesApiUrl = await fetch("https://api.github.com/licenses");
        // Convert licenses result to json to manipulate
        const licensesApi = await Promise.all([licensesApiUrl.json()]);
        // Loop to all licenses
        for (let i=0; i<licensesApi[0].length; i++){
            // Compare license name with values in array if is equal get API with specific license
            if (license === licensesApi[0][i].name){
                // Call API and storage in license API url
                const licenseApiUrl = await fetch("https://api.github.com/licenses/"+licensesApi[0][i].key);
                // Convert license result to json to manipulate
                const licenceApi = await Promise.all([licenseApiUrl.json()]);
                // Assign values of API array to variables
                key = licenceApi[0].key;
                id = licenceApi[0].spdx_id;
                description = licenceApi[0].description;
            };
        };
    };
    // Return README template
    return `# ${projectName}

[![Github](https://img.shields.io/static/v1?label=Github&message=${github}&color=yellow)](https://github.com/${github}) [![Email](https://img.shields.io/static/v1?label=Email&message=${name.replace(/ /g,"%")}&color=informational)](mailto:${email}) ${generateBadge(id, key)}
## Description
  
${projectDescription}


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
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

#### Github
  
- https://github.com/${github}
  
#### E-mail
  
- For more questions contact me at ${email}
${generateLicense(license, description)}
${generateScreenshots(images)}`;
};