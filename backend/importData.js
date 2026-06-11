const mongoose = require("mongoose");
const XLSX = require("xlsx");
const dotenv = require("dotenv");
const Business = require("./models/Business");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
    importExcel();
});

async function importExcel() {

    const workbook = XLSX.readFile("../dataset.xlsx");

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = XLSX.utils.sheet_to_json(sheet);

    await Business.deleteMany({});

    await Business.insertMany(data);

    console.log(`${data.length} records imported`);

    process.exit();
}