let fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function (e) {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let resultText = reader.result;
    let inputArray = resultText.replace(/\r/g, "").split("\n");
    for (i = 0; i < inputArray.length; i++) {
      inputArray[i] = inputArray[i].split(" ");
    }
    console.log(inputArray);

    //function to give value to a single card
    function cardValue(card) {
      if (Number(card)) {
        return Number(card);
      } else if (card === "T") {
        return 10;
      } else if (card === "J") {
        return 11;
      } else if (card === "Q") {
        return 12;
      } else if (card === "K") {
        return 13;
      } else if (card === "A") {
        return 14;
      }
    }

    // function to give value to the hand according to the type rules (five of a kind, four of a kind, etc.)
    function handType(cardsSet) {
      const kindsArray = [];
      for (l = 0; l < cardsSet.length; l++) {
        kindsArray.push(cardsSet[l][1]);
      }
      //five of a kind
      if (kindsArray.includes(5)) {
        return 6;
      }
      //four of a kind
      else if (kindsArray.includes(4)) {
        return 5;
      }
      //full house
      else if (kindsArray.includes(3) && kindsArray.includes(2)) {
        return 4;
      }
      //three of a kind
      else if (kindsArray.includes(3)) {
        return 3;
      }
      //two pairs
      else if (
        kindsArray.includes(2) &&
        kindsArray.reduce((acc, curr) => acc + curr, 0) == 5
      ) {
        return 2;
      }
      //one pair
      else if (kindsArray.includes(2)) {
        return 1;
      }
      //high card
      else {
        return 0;
      }
    }

    //count the number of repeating cards in current hand and put them in ["card", count] pairs. Example: "32T3K" => [["3", 2], ["2", 1], ["T", 1], ["K", 1]]
    function toCardCountArray(cardsSet, cards) {
      let cardsCountArray = [];
      for (j = 0; j < cardsSet.length; j++) {
        cardsCountArray.push([cardsSet[j], 0]);
        let cardPointsCount = 0;
        for (k = 0; k < cards.length; k++) {
          if (cards[k] === cardsSet[j]) {
            cardPointsCount++;
          }
        }
        cardsCountArray[j][1] = cardPointsCount;
      }
      return cardsCountArray;
    }

    //quicksort function

    //create pivot values

    //pivot array [hand, value] pair. Example:["32T3K", 765]:
    const pivot = inputArray[0];

    //pivot cards. Example: "32T3K"
    const pivotCards = inputArray[0][0];

    //create an array containing every face card only once
    const pivotCardsSet = Array.from(new Set(pivotCards.split("")));

    //create pivotCards type value
    const pivotCardsCountArray = toCardCountArray(pivotCardsSet, pivotCards);
    const pivotHandType = handType(pivotCardsCountArray);
    // console.log(pivotCardsCountArray);
    // console.log(pivotHandType);

    //sorted input data
    // const sortArr = [...inputArray];
    const sortedArray = (sortArr = [...inputArray]) => {
      if (sortArr.length <= 1) {
        return sortArr;
      }

      let pivot = sortArr[0];
      let leftArr = [];
      let rightArr = [];

      for (let m = 1; m < sortArr.length; m++) {
        const hand = sortArr[m];
        const cards = sortArr[m][0];
        const points = sortArr[m][1];
        const cardsSet = Array.from(new Set(cards.split("")));

        const cardsCountArray = toCardCountArray(cardsSet, cards);
        const currentHandType = handType(cardsCountArray);
        if (currentHandType < pivotHandType) {
          leftArr.push(sortArr[m]);
        } else if (currentHandType === pivotHandType) {
          for (n = 0; n < cards.length; n++) {
            const currentCardValue = cardValue(cards[n]);
            const pivotCardValue = cardValue(pivotCards[n]);
            if (currentCardValue === pivotCardValue) {
              continue;
            } else if (currentCardValue < pivotCardValue) {
              leftArr.push(sortArr[m]);
            } else {
              rightArr.push(sortArr[m]);
            }
          }
        } else {
          rightArr.push(sortArr[m]);
        }
      }
      return [...sortedArray(leftArr), pivot, ...sortedArray(rightArr)];
    };

    console.log(sortedArray());

    // for (i = 1; i < inputArray.length; i++) {
    //   const hand = inputArray[i];
    //   const cards = inputArray[i][0];
    //   const points = inputArray[i][1];
    //   const cardsSet = Array.from(new Set(cards.split("")));

    //   const cardsCountArray = toCardCountArray(cardsSet, cards);
    //   const currentHandType = handType(cardsCountArray);
    //   // console.log(cardsCountArray);
    //   // console.log(currentHandType);
    // }
  };
  reader.readAsText(file);
});
