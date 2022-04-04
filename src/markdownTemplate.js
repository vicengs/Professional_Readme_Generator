/* ------------------------------ */
/* Project  : Readme Generator    */
/* File     : markdownTemplate.js */
/* Author   : Vicente Garcia      */
/* Date     : 03/31/2022          */
/* Modified : 04/01/2022          */
/* ------------------------------ */
var miVariable;
const fetch = require('node-fetch');
const generateBadge = license => {
    if (!license){
      return "";
    }
    return `[![License](https://img.shields.io/badge/${license}-informational.svg)](http://choosealicense.com/licenses/${license}/)

`;
};
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
const getBadge = licenseName => { 
  return new Promise((resolve, reject) => {
    fetch("https://api.github.com/licenses")
    .then((response) => {
        return response.json();
    })
    .then((resp) => {
        for (let i=0; i<resp.length; i++){
            if (resp[i].name === licenseName){
                fetch(`https://api.github.com/licenses/${resp[i].key}`)
                .then((respuesta) => {
                    return respuesta.json();
                })
                .then((respu) => {
                    if (1 === 2){
                      reject(respu);
                      // Return out of the function to avoid execute the resolve() function as well
                      return;
                    }
                    resolve({
                      ok: true,
                      message: `HOLA -> ${respu.description}`
                    }); //DSFCDXFC
                });
                //return ` IMPRIMETE -> ${resp[i].key}`;
                //;
            };
        };
    })
  });//DSFDSFD
};
const generateLicense = license => {
    if (!license) {
        return "";
    };
    getBadge(license).then((dato) => console.log(dato));
    console.log("AQUI SE PIERDE OTRA VEZ -> ")
    return `

## License

${license} - ${getBadge(license).then((dato) => {return "dato"})}
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
![${altText}](assets/images/${image})`;
        })
        .join("")
    }`;
};
module.exports = markdownData => {
    // Destructure page data by section
    const { name, github, email, images } = markdownData;
    const { projectName, projectDescription, installInstructions, usageInstructions, contributionGuidelines, testInstructions, confirmLicense, license } = markdownData.project[0];
    return `# ${projectName}

${generateBadge(license)}
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