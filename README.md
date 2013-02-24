# utf8.js

UTF8 byte sequence encoding decoding of strings without a encodeURIComponent
hack.

## Usage

Example:
```javascript
// From string to bytes:
var bytes = utf8.stringToUTF8Bytes('hello utf8 € $');
// bytes = [104,101,108,108,111,32,117,116,102,56,32,226,130,172,32,36];
// From bytes to string:
var str = utf8.UTF8BytesToString(bytes)
// str = 'hello utf8 € $'
```

## API

```javascript
/**
 * Convert string to UTF8 byte sequence.
 * @param {string} str javascript string (unicode).
 * @param {Array.<number>} byte sequence.
 */
function stringToUTF8Bytes (str) {}

/**
 * Convert UTF8 byte sequence to string.
 * @param {Array.<number>} bytes UTF8 byte sequence.
 * @param {?string} result string or null on error (invalid input).
 */
function UTF8BytesToString(bytes) {}
```

It supports require.js (see example/example.html), but also works without it.
If require.js is not available, the API is exported to window.utf8.
