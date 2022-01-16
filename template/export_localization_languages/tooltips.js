var fs = require('fs');


module.exports = function (output_folder, data, languages) {
    try{
    fs.unlinkSync(output_folder);
    }catch(e){
        // console.log(e);
    }
    try{
    fs.mkdirSync(output_folder);
    }catch(e){
        // console.log(e);
    }

    function create_folder_language(language){
        var folder_language = output_folder+'/'+language.code;
        try{
            fs.mkdirSync(folder_language);
        }catch(e){
            // console.log(e);
        }
        var tooltips = {};
        for(var j = 0; j < data.length;++j){
            var item = data[j];

            if(item[language.code]){
                var text = item[language.code];
                if(item.key.indexOf('kTooltip') != -1){
                    var tooltip = {
                        "has_link": 1,
                        "page_url": "https://hexsee.com/help",
                        "text": text
                      }
                    tooltips[item.key] = tooltip;
                }
            }
        }

        fs.writeFile(folder_language+"/tooltips.json", JSON.stringify(tooltips), {encoding:"utf8"})

    }
    

    for(var i = 0; i < languages.length; ++i){
        var language = languages[i];
        create_folder_language(language);
    }


}