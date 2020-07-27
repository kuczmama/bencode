const bencode = require("../lib");
const utils = require("./utils/utils");

const test = (data, encoded) => {
  if (encoded == null) encoded = bencode.encode(data);
  utils.assert(bencode.encode(data), encoded);
  utils.assert(bencode.decode(encoded), data);
};

console.log("Running tests...\n");

// Numbers
test(42, "i42e");
test(0, "i0e");
test(-42, "i-42e");
test(9, "i9e");

// String
test("spam", "4:spam");
test("abcdefghij", "10:abcdefghij");

// Array
test(["spam", 42], "l4:spami42ee");
test({ bar: "spam", foo: 42 }, "d3:bar4:spam3:fooi42ee");

// Dictionary
test({ a: [1, 2, [3]], o: 1 });

// Null Data
test(null);
test([[], [], [], [[], []]]);
let data = {
  string: "Hello World",
  integer: 12345,
  dict: {
    key: "This is a string within a dictionary",
  },
  list: [1, 2, 3, 4, "string", 5, {}],
};

utils.assert(
  bencode.encode(data),
  "d4:dictd3:key36:This is a string within a dictionarye7:integeri12345e4:listli1ei2ei3ei4e6:stringi5edee6:string11:Hello Worlde"
);

const fs = require("fs");
const path = require("path");
const torrent = fs.readFileSync(
  path.resolve(__dirname, "./data/arch.iso.torrent")
);

const decodedTorrent = bencode.decode(torrent);
utils.assert(decodedTorrent["url-list"].length, 310);
utils.assert(decodedTorrent.info.name, "archlinux-2020.07.01-x86_64.iso");

utils.printTestResults();
