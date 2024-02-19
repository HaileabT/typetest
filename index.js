const textBox = document.getElementById("playground");
const placeholder = document.querySelector(".placeholder");
const placeholderData = placeholder.textContent;
let begin = true;
let seconds = 0;
function secondCount() {
  seconds++;
}
function calculateWords(para, time) {
  let letterAmount = 0;
  for (let i = 0; i < para.length; i++) {
    if (!/p{C}/.test(para.substring(i, i + 1)) && para.charAt(i) !== " ") {
      letterAmount++;
    }
  }
  if (time) {
    return parseInt((letterAmount / 5) * (60 / time));
  }
  return parseInt((letterAmount / 5) * 3);
}

// const averageWord = calculateWords(placeholderData);

let pointer = 0;
let errors = 0;
let second;
let s;
const runLogic = (e) => {
  s = seconds;
  if (begin) {
    second = setInterval(secondCount, 1000);
    setTimeout(runEvaluator, 20000);
    begin = false;
  }
  if (e.inputType === "insertLineBreak") {
    textBox.value = textBox.value.slice(0, -1);
    return;
  }
  if (e.inputType !== "deleteContentBackward") {
    if (e.data !== placeholderData.charAt(pointer)) {
      errors++;
    }
    pointer++;
  } else {
    pointer--;
    errors = 0;
    for (let i = 0; i < pointer; i++) {
      if (textBox.value.charAt(i) !== placeholderData.charAt(i)) {
        errors++;
      }
    }
  }
  if (pointer === placeholderData.length) {
    console.log(s);
    let rpm = calculateWords(placeholderData, s);
    console.log(rpm + " RPM");
  }
  //   console.log("errors: " + errors);
};

function runEvaluator() {
  const averageWord = calculateWords(textBox.value);
  console.log(averageWord + " WPM");
}

textBox.addEventListener("input", runLogic);
