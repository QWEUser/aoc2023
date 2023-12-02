let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let inputArray = resultText.replace(/\r/g, "").split("\n");
    console.log(inputArray);

    // count result; how many sets are possible?
    let result = 0;

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
      // index colors in maxColorArray = [red, green, blue]
      let maxColorArray = [0, 0, 0];
      loop2: for (j = 0; j < numberColorPairsArray[i].length; j++) {
        //loop through all sets
        loop3: for (k = 0; k < numberColorPairsArray[i][j].length; k++) {
          //loop through each set pair
          cubeColor = numberColorPairsArray[i][j][k][1];
          cubeNumber = Number(numberColorPairsArray[i][j][k][0]);
          if (cubeColor === "red") {
            if (cubeNumber > maxColorArray[0]) {
              maxColorArray[0] = cubeNumber;
              // console.log("max red: " + cubeNumber);
              // console.log("maxColorArray: " + maxColorArray);
            }
          }
          if (cubeColor === "green") {
            if (cubeNumber > maxColorArray[1]) {
              maxColorArray[1] = cubeNumber;
              // console.log("max green: " + cubeNumber);
              // console.log("maxColorArray: " + maxColorArray);
            }
          }
          if (cubeColor === "blue") {
            if (cubeNumber > maxColorArray[2]) {
              maxColorArray[2] = cubeNumber;
              // console.log("max blue: " + cubeNumber);
              // console.log("maxColorArray: " + maxColorArray);
            }
          }
        }
      }
      // console.log(maxColorArray);
      result += maxColorArray.reduce((acc, cur) => acc * cur, 1);
      // console.log(result);
    }
    console.log(result);
  };
  reader.readAsText(file);
});
