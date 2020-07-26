# Bencode

A Zero Dependency library for encoding and decoding bencoded data.

## About BEncoding

from [Wikipedia](https://en.wikipedia.org/wiki/Bencoding):

Bencode (pronounced like B encode) is the encoding used by the peer-to-peer
file sharing system BitTorrent for storing and transmitting loosely structured data.

It supports four different types of values:
- byte strings
- integers
- lists
- dictionaries

Bencoding is most commonly used in torrent files.
These metadata files are simply bencoded dictionaries.


## Usage

```javascript
var bencode = require( 'bencode' )
```

You can also use node-bencode with browserify to be able to use it in a lot of modern browsers.

### Encoding

```javascript

var data = {
  string: 'Hello World',
  integer: 12345,
  dict: {
    key: 'This is a string within a dictionary'
  },
  list: [ 1, 2, 3, 4, 'string', 5, {} ]
}

var result = bencode.encode( data )

```

#### Output

```
d4:dictd3:key36:This is a string within a dictionarye7:integeri12345e4:listli1ei2ei3ei4e6:stringi5edee6:string11:Hello Worlde
```

### Decoding

```javascript
var data = Buffer.from('d6:string11:Hello World7:integeri12345e4:dictd3:key36:This is a string within a dictionarye4:listli1ei2ei3ei4e6:stringi5edeee')
var result = bencode.decode( data )
```

#### Output

```javascript
{
  string: <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>,
  integer: 12345,
  dict: {
    key: <Buffer 54 68 69 73 20 69 73 20 61 20 73 74 72 69 6e 67 20 77 69 74 68 69 6e 20 61 20 64 69 63 74 69 6f 6e 61 72 79>
  },
  list: [ 1, 2, 3, 4, <Buffer 73 74 72 69 6e 67>, 5, {} ]
}
```

Automagically convert bytestrings to strings:

```javascript
var result = bencode.decode( data )
```

#### Output

```javascript
{
  string: 'Hello World',
  integer: 12345,
  dict: {
    key: 'This is a string within a dictionary'
  },
  list: [ 1, 2, 3, 4, 'string', 5, {} ]
}
```