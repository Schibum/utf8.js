describe('utf8 tests', function() {
  var toUTF8 = utf8.stringToUTF8Bytes;
  var toStr = utf8.UTF8BytesToString;

  /**
   * Converting a string to utf8 bytes and back to a string whould be an
   * identity operation.
   **/
  function expectIdentity(str) {
    expect(toStr(toUTF8(str))).toEqual(str);
  }

  it('should convert string to utf8 bytes', function() {
    // Test with some arbitrary characters from
    // http://www.utf8-chartable.de/unicode-utf8-table.pl
    expect(toUTF8('$')).toEqual([0x24]);
    expect(toUTF8('¢')).toEqual([0xC2, 0xA2]);
    expect(toUTF8('כ')).toEqual([0xd7, 0x9b]);
    expect(toUTF8('θ')).toEqual([0xce, 0xb8]);
    expect(toUTF8('€')).toEqual([0xE2, 0x82, 0xAC]);
    expect(toUTF8('𤭢')).toEqual([0xF0, 0xA4, 0xAD, 0xA2]);
    expect(toUTF8('􀀎')).toEqual([0xf4, 0x80, 0x80, 0x8e]);
    // longer string
    expect(toUTF8(' €$')).toEqual([0x20, 0xE2, 0x82, 0xAC, 0x24]);
    // Got so far? Be happy!
    expect(toUTF8('😃')).toEqual([0xf0, 0x9f, 0x98, 0x83]);
  });

  it('should convert utf8 bytes to string', function() {
    // Test with some arbitrary characters from
    // http://www.utf8-chartable.de/unicode-utf8-table.pl
    expect(toStr([0x24])).toEqual('$');
    expect(toStr([0xC2, 0xA2])).toEqual('¢');
    expect(toStr([0xd7, 0x9b])).toEqual('כ');
    expect(toStr([0xce, 0xb8])).toEqual('θ');
    expect(toStr([0xE2, 0x82, 0xAC])).toEqual('€');
    expect(toStr([0xF0, 0xA4, 0xAD, 0xA2])).toEqual('𤭢');
    expect(toStr([0xf4, 0x80, 0x80, 0x8e])).toEqual('􀀎');
    // longer string
    expect(toStr([0x20, 0xE2, 0x82, 0xAC, 0x24])).toEqual(' €$');
    // Got so farhappy!
    expect(toStr([0xf0, 0x9f, 0x98, 0x83])).toEqual('😃');
  });

  it('should return null on invalid byte encodings', function() {
    expect(toStr([0xE2, 0x24, 0xAC])).toBeNull();
    expect(toStr([0xE2, 0xAC])).toBeNull();
  });

  it('should be consistent', function() {
    expectIdentity('#äöl€$😃');
    expectIdentity('汉字/漢字 "Ha');
  });

});
