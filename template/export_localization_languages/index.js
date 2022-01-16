
var Excel = require('exceljs');
var fs = require('fs');

var path_excel = process.argv[2] ? process.argv[2] : __dirname + "/xls-files/language_file.xlsx";
var output_folder = __dirname + "/../src/translations";
var LocalizationTabNames = ["L1"];
// var LocalizationTabNames = ["RELeafApp"];
// var KeyFormat = "\"<%__TAG__%>\"";
// var HEADER_IMPORTING = "";
var HEADER_IMPORTING = "";
var KeyFormat = "<%__TAG__%>";

var workbook = new Excel.Workbook();

var data_languages = [];
var key = [];

var languages = [
    { code: 'en', numCol: 2 },
    { code: 'fr', numCol: 3 },
    { code: 'jp', numCol: 4 }
];
workbook.xlsx.readFile(path_excel).then(function () {
    for (var i = 0; i < languages.length; i++) {
        let lang = languages[i];
        console.log('Progressing ', lang);
        // build Localizable.strings
        workbook.eachSheet(function (worksheet, sheetId) {
            let sheet_name = worksheet.name;
            if (LocalizationTabNames.indexOf(sheet_name) >= 0) {
                data_languages = []
                key = []
                worksheet.eachRow(function (row, rowNumber) {
                    if (rowNumber == 1) {
                        return;
                    }

                    // if (typeof (row.getCell(1).value) === 'string') {
                    //     if (row.getCell(1).value.length > 0) {
                    //         key = row.getCell(1).value
                    //     }
                    // }

                    data_languages.push({ key: row.getCell(1).value, [lang.code]: row.getCell(lang.numCol).value });
                });
                var datas = {
                    "Localizable": data_languages,
                };

                require(__dirname + '/rn-export-file.js')(output_folder, datas, [lang], HEADER_IMPORTING, KeyFormat, false);

            }
        });
    }

})

