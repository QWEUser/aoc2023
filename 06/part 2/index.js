let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let inputArray = resultText.replace(/\r/g, "").split("\n");
    for (i = 0; i < inputArray.length; i++) {
      inputArray[i] = inputArray[i].split(":");
      inputArray[i].shift();
      inputArray[i][0] = inputArray[i][0].replace(/\s+/g, "");
      console.log(inputArray[i][0]);
      // inputArray[i] = inputArray[i].filter((el) => el != "");
      // inputArray[i] = inputArray[i].map((el) => Number(el));
    }
    console.log(inputArray);

    //this is a brute force approach to the problem. The other, more elegant approach, is to solve the problem using a quadratic equation.

    const gameTimeArray = inputArray[0];
    const gameDistaneceArray = inputArray[1];
    let resultArray = [];
    let result = 1;

    for (i = 0; i < gameTimeArray.length; i++) {
      const gameTime = gameTimeArray[i];
      const gameDistance = gameDistaneceArray[i];
      let count = 0;

      for (let boatTime = 1; boatTime < gameTime; boatTime++) {
        let boatSpeed = boatTime;
        let boatTravelTime = gameTime - boatTime;
        let distanceTraveled = boatSpeed * boatTravelTime;
        if (distanceTraveled > gameDistance) {
          count++;
        }
      }
      resultArray.push(count);
      result = result * count;
    }
    console.log(resultArray);
    console.log(result);
  };
  reader.readAsText(file);
});
