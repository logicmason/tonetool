describe("Tone Tool", function() {
  var phrase;

  beforeEach(function() {

  });

  it("should return empty for an empty string", function() {
    var input = "";
    expect(addtones(input)).toEqual("");
  });

  it("should correctly handle a single word", function(){
    var input = "jue2ding4";
    expect(addtones(input)).toEqual("juédìng");
  });

  it("should correctly handle words with a v for a u umlaut", function(){
    var input = ["lv4", "v2", "ce4lve4"];
    var correctOutput = ["lǜ", "ǘ", "cèlüè"];
    _(input).each(function(thing, i) {
      console.log(correctOutput);
      expect(addtones(thing)).toEqual(correctOutput[i]);
    });
  });

  it("should correctly handle words with a an existing ü", function(){
    var input = ["lü4", "ü2", "ce4lüe4"];
    var correctOutput = ["lǜ", "ǘ", "cèlüè"];
    _(input).each(function(thing, i) {
      console.log(correctOutput);
      expect(addtones(thing)).toEqual(correctOutput[i]);
    });
  });

  it("should correctly handle words following neutral tones", function(){
    var input = ["Wo3 bu2 ren4shi ta1", "Ta1men xian1 qu4 ba", "liang3 ge xuan3ze2"];
    var correctOutput = ["Wǒ bú rènshi tā", "Tāmen xiān qù ba", "liǎng ge xuǎnzé"];
    _(input).each(function(thing, i) {
      console.log(correctOutput);
      expect(addtones(thing)).toEqual(correctOutput[i]);
    });
  });

  it("should correctly handle initial and retroflexive Rs", function(){
    var input = ["ri4", "ru2guo3", "wanr2", "wan2r", "er4", "er2zi", "jia1renr2"];
    var correctOutput = ["rì", "rúguǒ", "wánr", "wánr", "èr", "érzi", "jiārénr"];
    _(input).each(function(thing, i) {
      console.log(correctOutput);
      expect(addtones(thing)).toEqual(correctOutput[i]);
    });
  });

  it("should add a hyphen where necessary", function(){
    expect(addtones("Xi1an1")).toEqual("Xī'ān");
    expect(addtones("Ren2ai4")).toEqual("Rén'ài");
    expect(addtones("hai3ou1")).toEqual("hǎi'ōu");
  });

  it("should correctly handle a complex sentence", function(){
    var input = ["Ao4men2 wan2r wanr2 Zhong1guo2 Xi1an1 nv2er2 weir4"];
    var correctOutput = ["Àomén wánr wánr Zhōngguó Xī'ān nǘ'ér wèir"];
    _(input).each(function(thing, i) {
      console.log(correctOutput);
      expect(addtones(thing)).toEqual(correctOutput[i]);
    });
  });
});