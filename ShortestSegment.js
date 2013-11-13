
var s = "This is a test. This is a programming test. This is a programming test in any language.\n4\nthis\na\ntest\n\programming";



var ShortestSubSegment = function ShortestSubSegment( input ) {

    this._input;
    this._parts;

    if ( input ) {
        this.addInput( input );
    }

    
    this._permArr = [];
    this._usedChars = [];
    this._matches = [];
    return this;
};

ShortestSubSegment.prototype.addInput = function addInput( input ) {
    var parts = input.split('\n'),
        paragraph = parts.shift(),
        //hmm, i was a given a count, i should probably use it, but im not smart enough :(
        count = parseInt(parts.shift(), 10);

    this._parts = parts;
    this._input = paragraph.replace(/[^\sa-zA-Z_\-]/g,'');
};

//barrowed from http://stackoverflow.com/questions/9960908/permutations-in-javascript
ShortestSubSegment.prototype.permutate = function permutate(parts) {

    //first time through its called as undefined
    if (!parts) {
        parts = this._parts;
    }

    
    var usedChars = this._usedChars,
        permArr = this._permArr,
        i,
        ch;

    for (i = 0; i < parts.length; i++) {
        ch = parts.splice(i, 1)[0];
        usedChars.push(ch);
        if (parts.length === 0) {
            permArr.push(usedChars.slice());
        }
        this.permutate(parts);
        parts.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr
};

// Turns the permutated arrays into a regex string
ShortestSubSegment.prototype.regexifyArray = function regexifyArray() {
    var arr = this._permArr;
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].join('\\.?\\s');
    }
};


ShortestSubSegment.prototype.getMatches = function getMatches() {
    var permArray = this._permArr,
        matches = this._matches,
        input = this._input;

    for (var i = 0; i < permArray.length; i++ ) {
        var regx = permArray[i],
            re = new RegExp(regx, 'i');
        if (re.test(input)) {
            matches.push(re.exec(input)[0]);
        }
    }
};

ShortestSubSegment.prototype.getShortest = function getShortest() {
    var matches = this._matches,
        s = matches[0].length,
        elem;
    for (var i = 0; i < matches.length; i++) {
        if (matches[i].length <= s) {
            elem = matches[i];
        }
        s = matches[i].length;
    }

    return elem;
};

ShortestSubSegment.prototype.exec = function() {
    this.permutate();
    this.regexifyArray();
    this.getMatches();

    return this.getShortest();
};



var segment = new ShortestSubSegment(s);
var shortestSegment = segment.exec();
alert(shortestSegment);



