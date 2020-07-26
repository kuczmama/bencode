isEqual = (expected, actual) => {
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


module.exports.assert = (actual, expected) => {
    if(isEqual(expected, actual)) {
        console.log(".");
    } else {
        console.log(`Expected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`);
    }
}