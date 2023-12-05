let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let inputArray = resultText.replace(/\r/g, "").split(":");
    for (i = 0; i < inputArray.length; i++) {
      inputArray[i] = inputArray[i].split(/\n/g);
    }
    console.log(inputArray);

    for (i = 0; i < inputArray.length; i++) {
      for (j = 0; j < inputArray[i].length; j++) {
        inputArray[i] = inputArray[i].filter((el) => el != "");
        inputArray[i][j] = inputArray[i][j].split(" ");
      }
    }

    // inputArray structure:
    // inputArray ... all data
    // inputarray[0][0] ... seeds (const seedsArray)
    // inputArray[1] to inputArray[7] ... transformation maps (seed-to-soil)
    // inputArray[i][j][0] ... destination
    // inputArray[i][j][1] ... source
    // inputArray[i][j][2] ... length

    const seedsArray = inputArray[0][0];
    let seed = 0;
    let finalSeedArray = [];

    for (let seedIndex = 0; seedIndex < seedsArray.length; seedIndex++) {
      seed = Number(seedsArray[seedIndex]);

      for (let i = 1; i < inputArray.length; i++) {
        for (let j = 0; j < inputArray[i].length; j++) {
          let destination = Number(inputArray[i][j][0]);
          let source = Number(inputArray[i][j][1]);
          let length = Number(inputArray[i][j][2]);

          if (source <= seed && seed <= source + length - 1) {
            seed = destination + (seed - source);
            break;
          }
        }
      }
      finalSeedArray.push(seed);
    }
    console.log(finalSeedArray);
    console.log(Math.min(...finalSeedArray));
  };
  reader.readAsText(file);
});
