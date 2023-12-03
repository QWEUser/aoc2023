let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    const inputArray = resultText.replace(/\r/g, "").split("\n");
    // console.log(inputArray);
    // final result of the puzzle
    let result = 0;

    // regex to find the entire number between dots and symbols
    const integerRegex = /[0-9]+/g;

    // regex to check if symbol is a number or a "."
    const numberDotRegex = /\d|\./g;
    const notNumberDotRegex = /([^0-9.])/g;

    //copy the original inputArray, so we ca modify it
    let copyInputArray = [...inputArray];

    //replace all symbols with "n" and add a "." to beginning and end of each string
    for (let [index, line] of copyInputArray.entries()) {
      copyInputArray[index] = "." + line.replaceAll(/([^0-9.])/g, "n") + ".";
    }
    console.log(copyInputArray);

    //loop over inputArray
    for (let [index, line] of copyInputArray.entries()) {
      // in each line, keep searching for numbers, save their value and position, then replace them with dots (e.g. "467" to "...")
      let numberIndex = line.search(integerRegex);
      while (numberIndex != -1) {
        const numberMatch = line.match(integerRegex);
        if (numberMatch) {
          // console.log(numberMatch[0]);
          const nextLine = index + 1;
          const prevLine = index - 1;
          const nextLineRange = copyInputArray[nextLine]?.slice(
            numberIndex - 1,
            numberIndex + numberMatch[0].length + 1
          );
          console.log(numberIndex);
          console.log("nexLineRange:" + nextLineRange);
          const prevLineRange = copyInputArray[prevLine]?.slice(
            numberIndex - 1,
            numberIndex + numberMatch[0].length + 1
          );
          //if number has an adjecent symbol, add the number to result -- DOESNT WORK!!!
          if (
            line[numberIndex + numberMatch[0].length] === "n" ||
            (copyInputArray[nextLine] ? nextLineRange.includes("n") : false) ||
            (copyInputArray[prevLine] ? prevLineRange.includes("n") : false) ||
            // (copyInputArray[nextLine]
            //   ? copyInputArray[nextLine][numberIndex] === "n"
            //   : false) ||
            line[numberIndex - 1] === "n"
          ) {
            console.log(numberMatch[0]);
            result += Number(numberMatch[0]);
          }
          // replace the numberMatch with dots -- WORKS
          line = line.replace(
            numberMatch[0],
            ".".repeat(numberMatch[0].length)
          );
          // console.log(line);
        }
        numberIndex = line.search(integerRegex);
      }
    }
    console.log(result);
  };
  reader.readAsText(file);
});
