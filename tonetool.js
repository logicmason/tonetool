// * Javascript Pinyin Tone Tool
// * Mark Wilbur
// * Copyright (c) 2005-2013
// * You may copy this script or include it in your own page if you give credit and link back to
// * http://toshuo.com
// If you find any errors, please email me at mark@toshuo.com
// - The first vowel in the syllable is the only one to become accented
// - For the u: (umlat) character, this converter follows the convention of using the letter v.

var vowels = "aeiouvü";
var capvowels = "AEIOUVÜ";
var umlatu = "ü";
var tones = "āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ";

function addtones(input) {
  var result = [];
  var chunks = input.split(/(\b.*?\b|[1-5])/);
  _(chunks).each(function(item, i){
    if (chunks[i+1] && chunks[i+1].match(/[1-5]/)) {
      return;
    } else if (chunks[i-1] && item.match(/[1-5]/)) {
      result.push(tonifyWord(chunks[i-1], item));
    } else {
      result.push(item);
    };
    return;
  });
  return result.join("");
};

function tonifyWord(word, toneNum) {
  var captured, usevowel = 1;
  if ((captured = word.match(/i[aeou]/i)) ||
      (captured = word.match(/u[aeio]/i)) ||
      (captured = word.match(/[vü]e/i))) usevowel = 2;
  if (usevowel === 2) return word.replace(captured[0][1], numToMark(captured[0][1], toneNum));
  captured = word.match(/[aeiouvü]/i);
  return word.replace(captured[0][0], numToMark(captured[0][0], toneNum));
}

function numToMark(vowel, num) {
  var i = vowels.indexOf(vowel);
  return (tones[i + 6 * (num-1)]);
}

str = "wo3 bu2 que4ding4 yao4buyao4 wanr2"
addtones(str);

// function addtones(input) {

//    textin = input;
//    textin.toLowerCase();

//    currentword = "";
//    currentchar = "";
//    i = 0;
//    numletters = textin.length;
//    textout = ""; // final output
//    tempword = "";
//    usevowel = 1; // which vowel will have the tone over it
//    foundvowel = 0;
//    capitalize = false;
//    possible_apostrophe = false;

//    for (i = 0; i <= numletters; i++) {
//       currentchar = textin.charAt(i);
//       currentnumvalue = currentchar - 1;

//       // numbers 1-5 are tone marks, build the word until we hit one
//       if (!(currentchar.match(/[1-5]/))) {
//          if (currentchar.match(/[aeiouvü]/i)) foundvowel++;
//          // if the last character was a vowel and this isn't...
//          if (((foundvowel != 0)) && (currentchar.match(/[^aeiouvüngr]/i)) || (currentchar == "")) {
//             textout = textout + currentword;
//             currentword = currentchar;
//          } else {
//             currentword = currentword + currentchar;
//          }
//       } // if !match 1-5
//       // the character must be a tone mark
//       else {

//          tempword = ""; // the word being built in this loop
//          foundvowel = 0; // number of vowels found in the word
//          usevowel = 1; // which vowel (1st or 2nd) will get the tone mark
//          // step through each character in word
//          wordlen = currentword.length;

//          // If it doesn't have vowels, just output it
//          if (!(currentword.match(/[aeiouvü]/i))) {
//             textout = textout + currentword + currentchar;
//             currentword = "";
//             possible_apostrophe = false;
//          }

//          // the tone goes over the second vowel for these combinations
//          if (currentword.match(/i[aeou]/i)) usevowel = 2;
//          if (currentword.match(/u[aeio]/i)) usevowel = 2;
//          if (currentword.match(/[vü]e/i)) usevowel = 2;
         
//          //add apostrophe to separate vowels of two words with tone marks
//          if (possible_apostrophe) if (currentword.match(/^[aeiouvü]/i)) textout = textout + '\'';
//          possible_apostrophe = true; 

//          // We'll check either the first or the first two vowels, depending on which should have the tone
//          for (j = 0;
//          (j <= wordlen) && (foundvowel < usevowel); j++) {

//             // Check to see if the character is a vowel
//             for (vowelnum = 0; vowelnum < 7; vowelnum++) {


//                if ((currentword.charAt(j) == vowels[vowelnum]) || (currentword.charAt(j) == capvowels[vowelnum])) {
//                   // It's a vowel - convert to corresponding numbered tone character from tones array
//                   // If tone is 5th (Neutral tone) - Leave it as the normal vowel
//                   (currentword.charAt(j) == capvowels[vowelnum]) ? capitalize = true : capitalize = false;
//                   if (currentnumvalue <= 3) {
//                      if (vowelnum == 6) currentchar = tones[5 + (currentnumvalue * 6)]; // Handle the damned ü for Europeans who can input it directly
//                      else currentchar = tones[vowelnum + (currentnumvalue * 6)];
//                   } else {
//                      if (vowelnum == 5) currentchar = umlatu; //neutral tone umlat
//                      else currentchar = vowels[vowelnum]; //all other neutral tones
//                   }

//                   if (capitalize) currentchar = currentchar.toUpperCase();
//                   foundvowel++; // Increment the counter for vowels found in the word
//                   if (foundvowel >= usevowel) {
//                      // rebuild word with the tone if this vowel should have the tone
//                      tempword = "";
//                      for (k = 0; k <= wordlen; k++) {
//                         if (k == j) {
//                            tempword = tempword + currentchar;
//                         } else { //just copy from the input, but turn all remaining v's into umlated u's
//                            if (currentword.charAt(k) == vowels[5]) tempword = tempword + umlatu;
//                            else tempword = tempword + currentword.charAt(k);
//                         }
//                      }
//                      currentword = "";
//                   }
//                }
//             }
//             textout = textout + tempword;
//          } // else -deal with numbers
//       }
//    }
//    return textout;
// }
