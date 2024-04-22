const {
  generateAddFile,
  generateValidationFile,
  generateTypesFile,
  generateEditFile,
  generateFormInputFields,
  generateIndex,
  generateAppAddFile,
  generateAppViewFile,
  generateAppHomeFile,
} = require("./magic/magic-functions");
const modelDetails = require("./magic/templates/finance/modelDetails/budgetAppro");

generateAddFile(modelDetails);
generateValidationFile(modelDetails);
generateTypesFile(modelDetails);
generateEditFile(modelDetails);
generateFormInputFields(modelDetails);
generateIndex(modelDetails);
generateAppAddFile(modelDetails);
generateAppViewFile(modelDetails);
generateAppHomeFile(modelDetails);
