/*
merges individual .prisma files to one schema.prisma file
*/

const fs = require("fs");

const getSchemaFileList = async (folder, list) => {
  const items = fs.readdirSync(folder);
  const subFolders = [];
  for (let i = 0; i < items.length; i++) {
    const file = items[i];
    const x = folder + "/" + file;
    if (fs.lstatSync(x).isDirectory()) {
      subFolders.push(x);
    } else {
      list.push(x);
    }
  }

  for (let i = 0; i < subFolders.length; i++) {
    await getSchemaFileList(subFolders[i], list);
  }
};

const mergeSchemas = async () => {
  const schemaFolder = "./prisma/schemas";

  const list = [];
  await getSchemaFileList(schemaFolder, list);

  console.log(list);

  const outputFile = "./prisma/schema.prisma";

  fs.writeFileSync(outputFile, "");

  list.forEach((file) => {
    const d = fs.readFileSync(file).toString();
    fs.appendFileSync(outputFile, d + "\n");
  });

  console.log(`Merged ${list.length} schema files into ${outputFile}`);
};

mergeSchemas();
