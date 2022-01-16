var fs = require('fs');
var utils = require('./utils.js');

module.exports = function (output_folder, datas, languages, headers = "\n", key_format = "\"<%__TAG__%>\"", exportJson = false) {
    try {
        fs.unlinkSync(output_folder);
    } catch (e) {
        // console.log(e);
    }
    try {
        fs.mkdirSync(output_folder);
    } catch (e) {
        // console.log(e);
    }

    function create_folder_language_ios(language, file_name) {

        var content_file_js = headers + "\nexport default {";
        var dataJson = {};

        var content_data = "";
        for (var j = 0; j < data.length; ++j) {
            var item = data[j];

            if (item[language.code]) {
                var text = item[language.code];
                if (typeof text == 'object') {
                    text = text.result;
                }
                text = utils.str_replace("'", "\'", text);
                text = utils.str_replace('"', '\\"', text);
                text = utils.str_replace('_X0008_', '', text);
                let _key = key_format.replace("<%__TAG__%>", item.key);
                content_data += '\n ' + _key + ' : "' + text + '",';
                dataJson[_key] = text;
            }
        }

        content_file_js += content_data + "\n}";

        fs.writeFileSync(output_folder + "/source/" + file_name + ".js", content_file_js, { encoding: "utf8" })
        if (exportJson) {
            fs.writeFileSync(output_folder + "/" + file_name + ".json", JSON.stringify(dataJson), { encoding: "utf8" })
        }

    }
    var keys = Object.keys(datas);

    for (var idx = 0; idx < keys.length; ++idx) {
        var key = keys[idx];
        var data = datas[key];
        for (var i = 0; i < languages.length; ++i) {
            var language = languages[i];

            var file_name = language.code;
            create_folder_language_ios(language, file_name);
        }
    }

    function create_file_i18n() {
        let datas1 = datas.Localizable;
        var content_file = "";

        content_file += `export const KeyTranslate = {\n`;

        for (var j = 0; j < datas1.length; ++j) {
            var item = datas1[j];
            console.log('item --> ', item);
            var text = item.key;
            if (text != null && text != "") {
                if (text.hasOwnProperty("result")) {
                    text = text.result
                }

                // console.log('text', text);

                text = utils.str_replace("&amp;", "&", text);
                text = utils.str_replace("'", "\\'", text);
                text = utils.str_replace('"', '\\"', text);
                text = utils.str_replace('_X0008_', '', text);

                content_file += '\n    ' + item.key + ': "' + item.key + '",';
            }
        }

        content_file += "\n};\n\n";

        fs.writeFileSync(output_folder + "/KeyTranslate.js", content_file, { encoding: "utf8" })
        // console.log("Save ok i18n.js LOCALIZED KEYS: ");
    }


    create_file_i18n()




}