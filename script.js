const calcBtn = document.getElementById("calculate-button");
const resultContainer = document.getElementById("result");

calcBtn.addEventListener("click", function () {
  const inputNumbers = document.getElementById("input-box").value;

  try {
    const result = add(inputNumbers);
    resultContainer.textContent = "Result: " + result;
  } catch (error) {
    resultContainer.textContent = error.message;
  }
});

function add(numbers) {
  const positiveRegex = /^[1-9]$/;
  const negativeRegex = /^-[1-9]$/;
  const numbersArray = [];
  let negative = "";

  for (let i = 0; i < numbers.length; i++) {
    if (negative) {
      negative += numbers[i];
    }
    if (numbers[i] === "-") {
      negative += "-";
      continue;
    }

    let num = parseInt(numbers[i]);
    if (negative) {
      num = parseInt(negative);
      negative = "";
    }

    if (negativeRegex.test(num) || positiveRegex.test(num)) {
      numbersArray.push(num);
    }
  }

  return sumNumbers(numbersArray);
}

function sumNumbers(numberArray) {
  let sum = 0;
  const negatives = [];

  for (let num of numberArray) {
    const parsedNum = parseInt(num, 10);

    if (parsedNum < 0) {
      negatives.push(parsedNum);
    } else {
      sum += parsedNum;
    }
  }

  if (negatives.length > 0) {
    throw new Error("negative numbers not allowed " + negatives.join(", "));
  }

  return sum;
}
