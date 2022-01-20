export const onChangeAlias = (value) => {
    let str = value + '';
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        ' ',
    );
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    return str;
};

export const randomUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const randomUniqueIdWithDate = () => {
    let d = new Date();
    return d.getTime();
};

export const removeALlWhiteSpace = (value) => {
    return value.replace(/ /g, '')
};

export const onlyOneSpaceBetweenTwoWords = (value) => {
    return value.replace(/ + /g, ' ').trim()
};

const email_regex = /(^([0-9a-zA-Z]{1,})+\@+([0-9a-zA-Z]{1,})(\.([a-zA-Z]{2,})){1,})+$/gi;
export const checkEmail = (value) => {
    return email_regex.test(value);
};

export const replaceAll = (source = '', textReplace = '', textInstead = '') => {
    return source.split(textReplace).join(textInstead);
};
