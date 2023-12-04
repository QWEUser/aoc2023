let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let inputArray = resultText.replace(/\r/g, "").split("\n");
    console.log(inputArray);
    let playerNumbersArray = [];
    let winningNumbersArray = [];
    let result = 0;

    for (let [lineIndex, line] of inputArray.entries()) {
      playerNumbersArray[lineIndex] = line
        .split(": ")[1]
        .split(" | ")[0]
        .split(/\s+/g);
      winningNumbersArray[lineIndex] = line
        .split(": ")[1]
        .split(" | ")[1]
        .split(" ");
    }

    for (let [index, line] of playerNumbersArray.entries()) {
      playerNumbersArray[index] = playerNumbersArray[index].filter(
        (el) => el != ""
      );
    }
    for (let [index, line] of winningNumbersArray.entries()) {
      winningNumbersArray[index] = winningNumbersArray[index].filter(
        (el) => el != ""
      );
    }
    // console.log(playerNumbersArray);
    // console.log(winningNumbersArray);

    let cardsWonArray = [];
    let cardsCopiesArray = new Array(inputArray.length).fill(1);

    for (i = 0; i < playerNumbersArray.length; i++) {
      let lineScore = 0;
      for (j = 0; j < playerNumbersArray[i].length; j++) {
        curPlayerNumber = playerNumbersArray[i][j];
        for (k = 0; k < winningNumbersArray[i].length; k++) {
          if (curPlayerNumber == winningNumbersArray[i][k]) {
            lineScore++;
          }
        }
      }
      cardsWonArray.push(lineScore);
      // result += lineScore;
      // console.log(`line ${i}: ${result}`);
    }
    console.log(cardsCopiesArray);
    console.log(cardsWonArray);
    for (i = 0; i < cardsWonArray.length; i++) {
      for (k = 0; k < cardsCopiesArray[i]; k++) {
        for (j = 0; j < cardsWonArray[i]; j++) {
          cardsCopiesArray[i + j + 1]++;
        }
      }
    }
    console.log(cardsCopiesArray);
    result = cardsCopiesArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    console.log(result);
  };
  reader.readAsText(file);
});
