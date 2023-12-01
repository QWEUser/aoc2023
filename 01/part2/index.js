let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let resultArray = resultText.replace(/\r/g, "").split("\n");
    console.log(resultArray);
    numbersArray = [];
    let result = 0;
    const wordNumberPairs = [
      ["one", "1"],
      ["two", "2"],
      ["three", "3"],
      ["four", "4"],
      ["five", "5"],
      ["six", "6"],
      ["seven", "7"],
      ["eight", "8"],
      ["nine", "9"],
    ];
    for (line = 0; line < resultArray.length; line++) {
      let filteredNumber = "";
      const word = resultArray[line];
      for (letter = 0; letter < word.length; letter++) {
        const symbol = word[letter];
        if (!isNaN(Number(symbol))) {
          filteredNumber += symbol;
        }
        for (
          wordNumber = 0;
          wordNumber < wordNumberPairs.length;
          wordNumber++
        ) {
          wordPair = wordNumberPairs[wordNumber][0];
          numberPair = wordNumberPairs[wordNumber][1];
          if (word.slice(letter, letter + wordPair.length) == wordPair) {
            filteredNumber += numberPair;
          }
        }
      }
      const twoDigitNumber =
        filteredNumber.slice(0, 1) + filteredNumber.slice(-1);
      result += Number(twoDigitNumber);
      numbersArray.push(twoDigitNumber);
      console.log(word);
    }
    console.log(numbersArray);
    console.log(result);
  };
  reader.readAsText(file);
});
