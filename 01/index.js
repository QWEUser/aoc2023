let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let resultArray = resultText.replace(/\r/g, "").split("\n");
    console.log(resultArray);
    let result = 0;
    for (line = 0; line < resultArray.length; line++) {
      let filteredNumber = "";
      for (letter = 0; letter < resultArray[line].length; letter++) {
        const symbol = resultArray[line][letter];
        if (!isNaN(Number(symbol))) {
          filteredNumber += symbol;
        }
      }
      for (digit = 0; digit < filteredNumber.length; digit++) {}
      const twoDigitNumber =
        filteredNumber.slice(0, 1) + filteredNumber.slice(-1);
      result += Number(twoDigitNumber);
    }
    console.log(numbersArray);
    console.log(result);
  };
  reader.readAsText(file);
});
