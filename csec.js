// function getKeywordOrder(keyword) {
//     var alphabet = "abcdefghijklmnopqrstuvwxyz"; //This is the alphabet
//     var key = keyword.toLowerCase(); //This will make the keyword all lower case so that it can be compared to the alphabet above
//     var keyLength = key.length; //This will get the length of the key word to be used in the for loop iteration.    var keyOrder = {} // This will be the object that will be returned, it will contain the order of the keyword
//     var keyOrder = {} // This will be the object that will be returned, it will contain the order of the keyword //This will create a dictionary of the key word, with the value being the position of the letter in the alphabet.
//     for (var i = 0; i < keyLength; i++) {
//         if (keyOrder[key[i]]) { //This will allow for duplicate letters in the keyword
//             keyOrder[key[i] + i] = alphabet.indexOf(key[i]); //This will add the index of the letter to the key order object
//         }
//         keyOrder[key[i]] = alphabet.indexOf(key[i]) //Key[i] is the letter in the key word, and alphabet.indexOf(key[i]) is the position of the letter in the alphabet.
//     } //The keyorder will now be remapped to the order 0,1,2...n  //For example if the key word was "bad" then the keyorder would be {b:1, a:0, d:3}  //This will be remapped to {b:0, a:1, d:2} //This will be done by sorting the keyorder by the value, and then remapping the key to the order 0,1,2...n
//     var sortedKeyOrder = Object.keys(keyOrder).sort(function (a, b) {
//         return keyOrder[a] - keyOrder[b] //This will sort the keyorder by the value
//     }); //This will remap the keyorder to the order 0,1,2...n
//     for (var i = 0; i < sortedKeyOrder.length; i++) {
//         keyOrder[sortedKeyOrder[i]] = i;
//     }
//     return keyOrder; //This will return the keyOrder object so that it can be used in the main function.
// }

function getKeywordOrder(keyword) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz"; //This is the alphabet
    var key = keyword.toLowerCase(); //This will make the keyword all lower case so that it can be compared to the alphabet above
    var keyLength = key.length; //This will get the length of the key word to be used in the for loop iteration.    var keyOrder = {} // This will be the object that will be returned, it will contain the order of the keyword
    var letters = []; //This will be an array of the letters in the keyword
    var letterOrder = []; //This will be an array of the order of the letters in the keyword
    var sortedLetterOrder = []; //This will be an array of the sorted order of the letters in the keyword
    for (var i = 0; i < keyLength; i++) { //This will loop through the keyword
        var letter = key[i]; //This will get the letter in the keyword
        letters.push(letter); //This will add the letter to the letters array
        letterOrder.push(alphabet.indexOf(letter)); //This will add the position of the letter in the alphabet to the letterOrder array
    }

    letterOrder.map(function (letterNumber, index) { //This will loop through the letters array
        //This will get the lowest value in the letterOrder array without considering null/undefined values
        var filteredLetterOrder = letterOrder.filter(function (value) {
            return value != null;
        });
        // console.log(filteredLetterOrder, "filteredLetterOrder");
        var lowestValue = Math.min.apply(Math, filteredLetterOrder); //This will get the lowest value in the letterOrder array
        // console.log(letterOrder, "letterOrder");
        // console.log("Lowest Value: " + lowestValue + " IndexOf: " + letterOrder.indexOf(lowestValue), "index", index); //This will put undefined in the letterOrder array where the lowest value was
        sortedLetterOrder[letterOrder.indexOf(lowestValue)] = index;
        // console.log(sortedLetterOrder, "sortedLetterOrder");
        letterOrder[letterOrder.indexOf(lowestValue)] = undefined;
    });
    // console.log(sortedLetterOrder, "sortedLetterOrder");
    return {
        letters: letters,
        letterOrder: sortedLetterOrder
    }; //This will return the letters and letterOrder arrays
}

function gridBasedTranspositionCipher(plaintext, keyword) {
    //This will get the length of the keyword
    var columnLength = keyword.length; //This will be the length of the columns in the grid
    //This will get the length of the plaintext //The row length is usually the length of the plaintext divided by the length of the keyword, but this will not work if the plaintext is not a multiple of the keyword length so it's ceiled.
    var rowLength = Math.ceil(plaintext.length / columnLength); //This will be the length of the rows in the grid
    //This will create the grid
    var grid = []; //This will be the grid//This will create the rows
    for (var i = 0; i < rowLength; i++) {
        grid[i] = []; //This will create the rows
    }
    //This will create the columns
    for (var i = 0; i < rowLength; i++) {
        for (var j = 0; j < columnLength; j++) {
            grid[i][j] = ""; //This will create the columns
        }
    }
    //This will add the plaintext to the grid
    var plaintextIndex = 0; //This will be the index of the plaintext
    for (var i = 0; i < rowLength; i++) {
        for (var j = 0; j < columnLength; j++) {
            if (plaintextIndex < plaintext.length) {
                grid[i][j] = plaintext[plaintextIndex]; //This will add the plaintext to the grid
                plaintextIndex++; //This will increment the plaintext index
            }
        }
    }//This will firstly get the order of the keyword
    // console.log("grid", grid);
    var keywordOrder = getKeywordOrder(keyword);//This will then sort the grid based on the keyword order
    var sortedGrid = []; //This will be the sorted grid //This will lowercase the keyword
    keyword = keyword.toLowerCase();//This will iterate the keyword string
    // console.log("keywordOrder", keywordOrder);
    //This will loop through the keywordOrder.letterOrder array
    keywordOrder.letterOrder.map(function (letterNumber, index) { //This will add all column at the index of the letterNumber to the sortedGrid array
        var rowToUse = keywordOrder.letterOrder.indexOf(index); //This will get the row to use
        grid.map(function (row) {
            sortedGrid.push(row[rowToUse]);
        });
    });
    return "The plaintext is: " + plaintext + " The keyword is: " + keyword + " The ciphertext is: " + sortedGrid.join(""); //This will return the plaintext, keyword and ciphertext
}

// console.log(gridBasedTranspositionCipher("OLAWALEJUWON", "CLEVER"));
// console.log(gridBasedTranspositionCipher("IAMTHESPY", "BAD"));
console.log(gridBasedTranspositionCipher("thepacketisintheletterbox", "OLA"));
console.log(gridBasedTranspositionCipher("thepacketisintheletterbox", "OLAW"));
console.log(gridBasedTranspositionCipher("thepacketisintheletterbox", "OLAWA"));

// console.log(gridBasedTranspositionCipher("theeaglelandstonight", "base"));

