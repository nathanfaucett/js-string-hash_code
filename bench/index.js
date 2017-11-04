var Benchmark = require("benchmark"),
    stringHashCode = require("..");


var suite = new Benchmark.Suite();


suite.add("string hash code", function() {
    stringHashCode("this a javascript string");
});

suite.add("immutable string hash code", function() {
    ImmutableStringHashCode("this a javascript string");
});


var STRING_HASH_CACHE_MIN_STRLEN = 16,
    STRING_HASH_CACHE_MAX_SIZE = 255,
    STRING_HASH_CACHE_SIZE = 0,
    stringHashCache = {};

function ImmutableStringHashCode(o) {
    return o.length > STRING_HASH_CACHE_MIN_STRLEN ?
        cachedHashString(o) :
        hashString(o);
}

function cachedHashString(string) {
    var hashed = stringHashCache[string];
    if (hashed === undefined) {
        hashed = hashString(string);
        if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
            STRING_HASH_CACHE_SIZE = 0;
            stringHashCache = {};
        }
        STRING_HASH_CACHE_SIZE++;
        stringHashCache[string] = hashed;
    }
    return hashed;
}

function hashString(string) {
    var hashed = 0;
    for (var ii = 0; ii < string.length; ii++) {
        hashed = (31 * hashed + string.charCodeAt(ii)) | 0;
    }
    return smi(hashed);
}

function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
}


suite.on("cycle", function(event) {
    console.log(String(event.target));
});

suite.on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
    console.log("=========================================\n");
});

console.log("\n= String Hash Code ======================");
suite.run();
