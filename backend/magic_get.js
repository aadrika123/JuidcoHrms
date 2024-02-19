const fs = require('fs');

const creator_name = "Bijoy Paitandi";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 07-02-2024
 * | Created for- Autogenerating APIs
 * | Status- open
 */


const prismaFolder = './prisma';
const daoFolder = "./src/component/juidcoFinance/dao";
const controllerFolder = "./src/component/juidcoFinance/controller";
const routeFolder = "./src/component/juidcoFinance/route";


const toPascalCase = (s) => {
    s = s.replace("_", "-");
    return s = s.replace(/\w+/g,
    function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}).replaceAll("-", "");
}

const toCamelCase = (s) => {
    s = toPascalCase(s);
    return s.charAt(0).toLowerCase() + s.substring(1);
}

const generatePrismaSchema = (modelDetails) => {
    const aggregateSchemaFile = prismaFolder + "/schema.prisma";
    let schema = "";
    schema += `\n////${modelDetails.name}: Managed by: ${creator_name}\n`;
    schema += `model ${modelDetails.name}{\n`;

    modelDetails.fields.forEach(field => {
        const fieldName = field.name.padEnd(20);
            if(field.hasOwnProperty('constraint')){
                const fieldType = field.type.padEnd(20);
                const constraint = field.constraint;
                
                schema += `\t${fieldName}${fieldType}${constraint}\n`;
                
            }else{
                schema += `\t${fieldName}${field.type}\n`;
            }
            
    });

    schema += `}\n`;
    
    fs.appendFile(aggregateSchemaFile, schema, function (err) {
        if (err) throw err;
    });

    console.log('Schema generated: ' + aggregateSchemaFile);
}


const generateSeeder = (modelDetails, recordCount) => {
    const seederName = `${modelDetails.name}_seeder`;
    const seederFilePath = `${prismaFolder}/seeder/${seederName}.ts`;
    let data = "";
    data += 'import { PrismaClient  } from "@prisma/client";\n';
    data += 'import { faker } from "@faker-js/faker";\n';
    data += 'const prisma = new PrismaClient();\n';
    data += `const ${seederName} = async () => {\n`;
    
    data += `const number_of_records = ${recordCount};\n`;
    data += `for(let i=0;i<number_of_records; i++){\n`;
    data += `const record ={\n`;

    modelDetails.fields.forEach(field => {
        if(field.name == 'id'){}
        else if(field.name.endsWith('id')){
            data += `${field.name}: 1,\n`;
        }else if(field.name === 'created_at'){
            data += `${field.name}: faker.date.past(),\n`;
        }else if(field.name == "updated_at"){
            data += `${field.name}: faker.date.recent(),\n`;
        }else if(field.type === 'Int' || field.type === 'Float'){
            data += `${field.name}: faker.datatype.number(),\n`;
        }else if(field.type === 'DateTime'){
            data += `${field.name}: faker.date.past(),\n`;
        }else if(field.type === 'DateTime'){
            data += `${field.name}: faker.date.past(),\n`;
        }else if(field.name === 'name'){
            data += `${field.name}: faker.lorem.word(),\n`;
        }
        else if(field.type === 'String'){
            data += `${field.name}: faker.lorem.sentence(),\n`;
        }else{
            console.log("Unknown data type for " + field.name);
        }
    });

    data += '};\n';
    data += `await prisma.${modelDetails.name}.create({data: record});\n`;
    data += `}};\n`;
    data += `export default ${seederName};`;
 
    
    fs.writeFileSync(seederFilePath,data,{encoding:'utf8',flag:'w'});
    console.log("Seeder created: " + seederFilePath); 
    
}


const generateDao = (modelDetails) => {
    const daoClassName = toPascalCase(modelDetails.name)+"Dao";
    const daoFilePath = `${daoFolder}/${daoClassName}.ts`;
    var templateData = fs.readFileSync('./magic/templates/only_get/dao.ts').toString();
    
    templateData = templateData.replaceAll("{{banks}}", modelDetails.name);
    templateData = templateData.replaceAll("{{BankDao}}", daoClassName);

    
    fs.writeFileSync(daoFilePath,templateData,{encoding:'utf8',flag:'w'});
    console.log("Dao file: " + daoFilePath);
    
}


const generateController = (modelDetails) => {
    const nameInPascalCase = toPascalCase(modelDetails.name);
    const nameInCamelCase = toCamelCase(modelDetails.name);

    const controllerClassName = nameInPascalCase + "Controller";
    const controllerFilePath = `${controllerFolder}/${controllerClassName}.ts`;
    var templateData = fs.readFileSync('./magic/templates/all_apis/controller.ts').toString();

    templateData = templateData.replaceAll("{{BillInvoices}}", nameInPascalCase);
    templateData = templateData.replaceAll("{{billInvoices}}", nameInCamelCase);

    fs.writeFileSync(controllerFilePath, templateData, {encoding: 'utf8', flag: 'w'});
    console.log("Controller file: " + controllerFilePath);
}

const generateRouteFile = (modelDetails) => {
    const nameInPascalCase = toPascalCase(modelDetails.name);
    const nameInCamelCase = toCamelCase(modelDetails.name);
    const apiRouteName = modelDetails.name.replace('_', '-');

    const routeClassName = nameInPascalCase + "Route";
    const routeFilePath = `${routeFolder}/${routeClassName}.ts`;

    let templateData = fs.readFileSync('./magic/templates/all_apis/route.ts').toString();

    templateData = templateData.replaceAll("{{BillInvoices}}", nameInPascalCase);
    templateData = templateData.replaceAll("{{bill-invoices}}", apiRouteName);

    fs.writeFileSync(routeFilePath, templateData, {encoding: 'utf8', flag: 'w'});
    console.log("Route file: " + routeFilePath);
}

// Modify the modelDetails below
const modelDetails = {
    name: "chickens",
    fields: [
        {name: 'id', type: 'Int', constraint: '@id @default(autoincrement())'},
        {name: 'name', type: 'String'},
        {name: 'remarks', type: 'String'},
        
        {name: 'created_at', type: 'DateTime', constraint: '@default(now()) @map("created_at")'},
        {name: 'updated_at', type: 'DateTime', constraint: '@updatedAt @map("updated_at")'},
    ]
};
generatePrismaSchema(modelDetails);
generateSeeder(modelDetails, 10);
generateDao(modelDetails);
//generateController(modelDetails);
//generateRouteFile(modelDetails);

console.log("\n\nThings to do now: \n");
console.log("review the generated schema in schema.prisma file, add relations to other tables if required")
console.log("review the generated files, fix imports");
console.log("move the files to correct folders if required");
console.log("register the seeder in seed.ts")
console.log("register the api router in route.ts");
console.log("delete the migrations folder");
console.log("npx prisma migrate dev --name init");
console.log("npx prisma migrate reset");





