const fs = require('fs');
const XLSX = require('xlsx');
const scoresService = require('./scoresService');

const {Readable} = require('stream')

function parseScoresFromExcel(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file.filepath, (err, data) => {
            if (err) {
                reject(err);
            }
            const workbook = XLSX.read(data, { type: "buffer" });
            const ws = workbook.Sheets[workbook.SheetNames[0]];
            const scores = XLSX.utils.sheet_to_json(ws);
            resolve(scores);
        })
    })
}

async function ExportScoresToExcel(room) {
    const scoresFile = XLSX.utils.book_new();
    scoresFile.Props = {
        Title: `${room.name} scores`,
        Author: "Classroom",
        CreatedDate: new Date()
    };

    /* GeneralInfor Sheet */
    const generalInforData = [
        ["Pulse title:", 1],
        ["Total sponsor:", 2],
        ["Total sponsor completed:", 3],
        ["Total sponsor not completed:", 4],
        ["Exported at:", new Date()],
    ];

    const allStudentsInClass = await scoresService.getAllStudentsInClass(room.id);
    const allGradesInClass = await scoresService.getAllGradesInClass(room.id);

    const generalInforSheet = XLSX.utils.aoa_to_sheet(generalInforData);
    XLSX.utils.book_append_sheet(scoresFile, generalInforSheet, "Sheet1");

    /*Write file excel*/
    const file = XLSX.write(scoresFile, { type: "buffer" });
    var stream = new Readable();
    stream.push(file);
    stream.push(null);

    return stream;
}

module.exports = { parseScoresFromExcel, ExportScoresToExcel };