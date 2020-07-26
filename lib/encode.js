const encode = (data) => {
    if(data == null) return null;

    if(typeof data === 'number') {
        return `i${data}e`;
    }
    if(typeof data === 'string') {
        return `${data.length}:${data}`;
    }

    if(Array.isArray(data)) {
        return `l${data.map(el => encode(el)).join('')}e`;
    }

    if(typeof data === 'object') {
        return `d${Object.keys(data).sort().map((k) => `${encode(k)}${encode(data[k])}`).join('')}e`;
    }
    throw `Unable to encode ${data}`;
};


module.exports = encode;