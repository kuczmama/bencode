
const INTEGER_START = 0x69 // 'i'
const STRING_DELIM = 0x3A // ':'
const DICTIONARY_START = 0x64 // 'd'
const LIST_START = 0x6C // 'l'
const END_OF_TYPE = 0x65 // 'e'


const parseIntFromBuffer = (buffer, start, end)  => {
    if(start == null) start = 0;
    if(end == null) end = buffer.length;

    let sol = 0;
    let sign = 1;
    for(let i = start; i < end; i++) {
        let num = buffer[i];
        if(num >= 0x30 && num < 0x39) { // 0x30 === 0, 0x39 === 9
            sol = sol * 10 + (num - 0x30);

            continue;
        }

        if(i === start && num === 0x2b) { // +
            continue;
        }

        if(i === start && num === 0x2d) {// -
            sign = -1;
            continue;
        }

        if(num === 0x2e) { // Float break here
            break;
        }

        throw new Error('not a number: buffer[' + i + '] = ' + num)
    }
    return sign * sol;
}

const indexOf = (buffer, el, start, end) => {
    if(start == null) start = 0;
    if(end == null) end = buffer.length;

    for(let i = start; i < end; i++) {
        if(buffer[i] === el) return i;
    }
    return -1;
}

const decode = (data) => {
    if(data == null || data.length === 0) return [0, null];

    // Convert to buffer if not a buffer
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
    const len = buffer.length;
    
    let idx = 0;
    // Integer
    if(buffer[idx] === INTEGER_START) {
        const endIdx = indexOf(buffer, END_OF_TYPE);
        if(endIdx === -1) throw "Invalid Number";

        const curr = parseIntFromBuffer(buffer, 1, endIdx);
        return [String(curr).length + 2, curr]; // +2 for i & e
    } 

    // List
    if(buffer[idx] === LIST_START) {
        let cursor = 1;
        const arr = [];
        while(cursor < len && buffer[cursor] !== END_OF_TYPE) {
            const [entryLength, entry] = decode(buffer.slice(cursor));
            cursor += entryLength;
            arr.push(entry);
        }
        return [cursor + 1, arr];
    }

    // Dictionary
    if(buffer[idx] === DICTIONARY_START) {
        let cursor = 1;
        const obj = {};
        while(cursor < len && buffer[cursor] !== END_OF_TYPE) {
            const [keyLength, key] = decode(buffer.slice(cursor));
            const [valueLength, value] = decode(buffer.slice(cursor + keyLength));
            cursor += keyLength + valueLength;
            obj[key] = value;
        }
        return [cursor + 1, obj];
    }

    // Is Buffer
    const endPos = indexOf(buffer, STRING_DELIM);
    const strSize = parseIntFromBuffer(buffer, 0, endPos);
    const sol = buffer.slice(endPos + 1,  endPos + 1 + strSize).toString();
    return [endPos + 1 + strSize, sol]; // endPos = position Of string , 1 = delimeter, strSize = size of result string
}

module.exports = (str) => decode(str)[1];
