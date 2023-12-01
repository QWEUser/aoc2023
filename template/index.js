let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let resultArray = resultText.replace(/\r/g, "").split("\n");
    console.log(resultArray);
  };
  reader.readAsText(file);
});
