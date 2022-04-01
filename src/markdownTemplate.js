module.exports = markdownData => {
    // Destructure page data by section
    //const { name } = markdownData;
    return `# ${markdownData.projectName}
  
## Description
  
${markdownData.projectDescription}


## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

${markdownData.installInstructions}


## Usage

${markdownData.usageInstructions}


## Credits

${markdownData.projectCredits}


## License

${markdownData.license}


## Contributing

${markdownData.contributionGuidelines}


## Tests

${markdownData.contributionGuidelines}
  
    `;
};