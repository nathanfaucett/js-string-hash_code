var STRING_HASH_CACHE_MIN_STRING_LENGTH = 16,
    STRING_HASH_CACHE_MAX_SIZE = 255,
    STRING_HASH_CACHE_SIZE = 0,
    SRTING_HASH_CACHE = {};


module.exports = stringHashCode;


function stringHashCode(string) {
    if (string.length > STRING_HASH_CACHE_MIN_STRING_LENGTH) {
        return cachedHashString(string);
    } else {
        return hashString(string);
    }
}

function cachedHashString(string) {
    var hash = SRTING_HASH_CACHE[string];

    if (hash === undefined) {
        hash = hashString(string);

        if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
            STRING_HASH_CACHE_SIZE = 0;
            SRTING_HASH_CACHE = {};
        }

        STRING_HASH_CACHE_SIZE++;
        SRTING_HASH_CACHE[string] = hash;
    }

    return hash;
}

function hashString(string) {
    var hash = 0,
        i, il;

    for (i = 0, il = string.length; i < il; i++) {
        hash = (31 * hash + string.charCodeAt(i)) | 0;
    }

    return smi(hash);
}

function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
}
