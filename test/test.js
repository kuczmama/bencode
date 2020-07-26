const bencode = require('..');

const assert = (actual, expected) => {
    if(isEqual(expected, actual)) {
        console.log(".");
    } else {
        console.log(`Expected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`);
    }
}
const isEqual = (expected, actual) => {
    if(expected === actual) return true;
    if(typeof expected !== typeof actual) return false;
    if(Array.isArray(expected) && Array.isArray(actual)) {
        if(expected.length !== actual.length) return false;
        let sol = true;
        for(let i = 0; i < expected.length; i++) {
            sol = sol && isEqual(expected[i], actual[i]);
        }
        return sol;
    }
    return JSON.stringify(expected) === JSON.stringify(actual);
}

const test = (data, encoded) => {
    if(encoded == null) encoded = bencode.encode(data);
    assert(bencode.encode(data), encoded);
    assert(bencode.decode(encoded), data);
}

test(42, 'i42e');
test(0, 'i0e');
test(-42, 'i-42e');
test('spam', '4:spam');
test('abcdefghij', '10:abcdefghij');
test(['spam', 42], 'l4:spami42ee');
test({bar: 'spam', foo: 42}, 'd3:bar4:spam3:fooi42ee');

test({a: [1,2,[3]], o: 1});
test(null);
test([[],[],[],[[],[]]]);
let data = {
    string: 'Hello World',
    integer: 12345,
    dict: {
      key: 'This is a string within a dictionary'
    },
    list: [ 1, 2, 3, 4, 'string', 5, {} ]
};
assert(bencode.encode(data), 'd4:dictd3:key36:This is a string within a dictionarye7:integeri12345e4:listli1ei2ei3ei4e6:stringi5edee6:string11:Hello Worlde')