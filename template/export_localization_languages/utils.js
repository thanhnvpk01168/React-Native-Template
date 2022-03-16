/*
 * Developer : Morgan
 * Date : 12/26/2015
 */

var fs = require('fs');
var path = require('path');

var url = require('url');


module.exports = {
    supportImageExts:['png', 'jpg', 'gif', 'jpeg'],
    isIdRethink: function(id){
        return typeof id == 'string' && validate.single(id, {presence: true, length:{is:36}}) === undefined;
    },
    isStringDate: function(str){
        return typeof str == 'string' && !isNaN((new Date(str)).getTime());
    },
    isUrl: function(string){
        var ob = url.parse(string);

        return ob.protocol != null && ob.slashes === true;
    },
    getRandomPass: function(){
        var uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lowers = "abcdefghijklmnopqrstuvwxyz";
        var digits = "01234567890";
        var all = uppers + lowers + digits;
        var choices = [uppers,lowers,digits];
        var checks = [];

        var password = "";
        var ranLength = Math.ceil(Math.random()*10)+6;
        for(var i=0; i<ranLength; i++){
            var choice = choices[Math.ceil(Math.random()*3)-1];
            var choiceItem = choice[Math.ceil(Math.random()*(choice.length))-1]
            password += choiceItem;
        }

        for(var i=0; i<3; i++){ // Append needed values to end
            var choice = choices[i];
            var choiceItem = choice[Math.ceil(Math.random()*(choice.length))-1]
            password += choiceItem;
        }

        password = password.split('').sort(function(){
            return 0.5 - Math.random();
        }).join('');

        return password;
    },
    base64_decode: function(base64str, file) {
        // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
        var bitmap = new Buffer(base64str, 'base64');
        // write buffer to file
        fs.writeFileSync(file, bitmap);
    },
    isImageBase64: function(string){
        return typeof string == 'string' && string.length > 0 && (string.indexOf('data:image/png;base64,') == 0 ||
            string.indexOf('data:image/jpg;base64,') == 0 ||
            string.indexOf('data:image/gif;base64,') == 0 ||
            string.indexOf('data:image/jpeg;base64,') == 0);
    },
    isCountryCode: function(code){
        return typeof code == 'string' && typeof config.app.countryCodes[code] == 'object';
    },
    getExtFileImageByBase64: function(string){
        if(string.indexOf('data:image/png;base64,') == 0){
            return 'png';
        }else if(string.indexOf('data:image/jpg;base64,') == 0){
            return 'jpg';
        }else if(string.indexOf('data:image/gif;base64,') == 0){
            return 'gif';
        }else if(string.indexOf('data:image/jpeg;base64,') == 0){
            return 'jpeg';
        }

        return 'png';
    },
    getBase64ByString: function(string, ext){

        return string.replace('data:image/'+ext+';base64','');
    },
    insteadAllCharactersToBackspace: function(string){
        return string.replace(/(\~|\`|!|\@|\#|\$|\%|\^|\&|\*|\(|\)|_|\-|\+|\\|\=|>|<|\,|\.|\/|\?|:|;|"|'|\r|\t|\0|\n|\v)/g, ' ').replace(/\s+/g, ' ');
    },
    capitalizeFirstLetter: function(string) {
        return typeof string == 'string' ? string[0].toUpperCase() + string.slice(1) : string;
    },
    getCurrentDate: function(){
        var d = new Date();
        
        return new Date( d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), Math.abs( d.getTimezoneOffset() / 60 ) );
    },
    resizeImageFile: function(file, imagesfolder, imageThumbsfolder, width){
        var def = deferred();
        var ext = path.extname(file).replace('.', '');
        var basename = path.basename(file, '.'+ext);
        
        if(module.exports.supportImageExts.indexOf(ext) != -1){
            
            var srcPath = imagesfolder+basename+'.'+ext;
                
            im.identify(srcPath, function(err, features){
                if (err) throw err;
                // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
                
                var dstPath = imageThumbsfolder+basename+'-'+width+'.'+ext;
                if(features.width > width){
                    im.resize({
                        srcPath: srcPath,
                        dstPath: dstPath,
                        width:   width,
                        format: ext,
                        }, function(err, stdout, stderr){
                            if (err) console.log(err, stdout, stderr);
                            def.resolve(true);
                        });
                }else{
                    fs.createReadStream(srcPath).pipe(fs.createWriteStream(dstPath));
                    def.resolve(true);
                }
                
            });
        }else{
            def.resolve(null);
        }
        
        
        return def.promise;
    },
    copyObjectsByRules: function(obj1, obj2, rules){
        for(var i = 0; i < rules.length; ++i){
            var rule = rules[i];
            var hasKey = typeof obj1[rule.from];
            hasKey = rule.from != null && ['object', 'boolean', 'string'].indexOf(hasKey) != -1;

            if(hasKey){
                obj2[rule.to] = obj1[rule.from];
            }
        }
    },
    str_replace: function (search, replace, subject, countObj) { // eslint-disable-line camelcase
        //  discuss at: http://locutus.io/php/str_replace/

        var i = 0
        var j = 0
        var temp = ''
        var repl = ''
        var sl = 0
        var fl = 0
        var f = [].concat(search)
        var r = [].concat(replace)
        var s = subject
        var ra = Object.prototype.toString.call(r) === '[object Array]'
        var sa = Object.prototype.toString.call(s) === '[object Array]'
        s = [].concat(s)

        if (typeof (search) === 'object' && typeof (replace) === 'string') {
            temp = replace
            replace = []
            for (i = 0; i < search.length; i += 1) {
                replace[i] = temp
            }
            temp = ''
            r = [].concat(replace)
            ra = Object.prototype.toString.call(r) === '[object Array]'
        }

        if (typeof countObj !== 'undefined') {
            countObj.value = 0
        }

        for (i = 0, sl = s.length; i < sl; i++) {
            if (s[i] === '') {
                continue
            }
            for (j = 0, fl = f.length; j < fl; j++) {
                temp = s[i] + ''
                repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
                s[i] = (temp).split(f[j]).join(repl)
                if (typeof countObj !== 'undefined') {
                    countObj.value += ((temp.split(f[j])).length - 1)
                }
            }
        }
        return sa ? s : s[0]
    }
};