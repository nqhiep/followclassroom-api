const fs = require('fs');
const XLSX = require('xlsx');

function parseDataFromExcel(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file.filepath, (err, data) => {
            if (err) {
                reject(err);
            }
            const workbook = XLSX.read(data, { type: "buffer" });
            const ws = workbook.Sheets[workbook.SheetNames[0]];
            const dataset = XLSX.utils.sheet_to_json(ws);
            resolve(dataset);
        })
    })
}


module.exports = { parseDataFromExcel };