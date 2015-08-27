var tape = require("tape"),
    stringHashCode = require("..");


tape("stringHashCode(string: String) should return hash code for string", function(assert) {
    assert.equals(stringHashCode("This is a Java string"), 586653468);
    assert.end();
});
