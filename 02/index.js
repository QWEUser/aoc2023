let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let inputArray = resultText.replace(/\r/g, "").split("\n");
    console.log(inputArray);

    // index colors in maxColorArray = [red, green, blue]
    let maxColorArray = [12, 13, 14];

    // count result; how many sets are possible?
    let countSets = 0;

    // remove "game xx: " from lines
    const gamesArray = inputArray.map((line) => line.split(": ").pop());

    // split lines by game sets
    const setsArray = gamesArray.map((line) => line.split("; "));

    //split each array element by cubes color
    const cubesByColorArray = setsArray.map((arr) =>
      arr.map((el) => el.split(", "))
    );

    //split each "xx color" string into ["xx", "color"] pairs
    const numberColorPairsArray = cubesByColorArray.map((arr) =>
      arr.map((subArr) => subArr.map((el) => el.split(" ")))
    );
    console.log(numberColorPairsArray);

    // check each ["xx", "color"] pair and compare the number of cubes with max possible colors in maxColorArray
    loop1: for (i = 0; i < numberColorPairsArray.length; i++) {
      // loop through all games
      let gameIsValid = true;
      loop2: for (j = 0; j < numberColorPairsArray[i].length; j++) {
        //loop through all sets
        loop3: for (k = 0; k < numberColorPairsArray[i][j].length; k++) {
          //loop through each set pair
          cubeColor = numberColorPairsArray[i][j][k][1];
          cubeNumber = numberColorPairsArray[i][j][k][0];
          if (cubeColor === "red") {
            if (cubeNumber > maxColorArray[0]) {
              console.log("red: " + numberColorPairsArray[i][j]);
              gameIsValid = false;
            }
          }
          if (cubeColor === "green") {
            if (cubeNumber > maxColorArray[1]) {
              console.log("green: " + numberColorPairsArray[i][j]);
              gameIsValid = false;
            }
          }
          if (cubeColor === "blue") {
            if (cubeNumber > maxColorArray[2]) {
              console.log("blue: " + numberColorPairsArray[i][j]);
              gameIsValid = false;
            }
          }
        }
      }

      //if all sets in the game are valid, add the game ID (+1) to countSets
      if (gameIsValid) {
        countSets += i + 1;
        // countSets += numberColorPairsArray[i].length;
      }
    }
    console.log(countSets);
  };
  reader.readAsText(file);
});
