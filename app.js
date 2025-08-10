// let gameseq = [];
// let userseq = [];
// let btns = ["yellow", "red", "purple", "green"];
// let started = false;
// let level = 0;

// let h2 = document.querySelector("h2");

// // Start game on keypress
// document.addEventListener("keypress", function () {
//   if (!started) {
//     started = true;
//     levelup();
//   }
// });

// // Game flash for next level button
// function gameflash(btn) {
//   btn.classList.add("flash");
//   setTimeout(() => {
//     btn.classList.remove("flash");
//   }, 250);
// }

// // Flash when user clicks
// function userflash(btn) {
//   btn.classList.add("userflash");
//   setTimeout(() => {
//     btn.classList.remove("userflash");
//   }, 250);
// }

// // Move to next level
// function levelup() {
//   userseq = [];
//   level++;
//   h2.innerText = `Level ${level}`;

//   let randidx = Math.floor(Math.random() * 4);
//   let randcolor = btns[randidx];
//   let randbtn = document.getElementById(randcolor);
//   gameseq.push(randcolor);

//   gameflash(randbtn);
// }

// // Check user input
// function checkans(idx) {
//   if (userseq[idx] === gameseq[idx]) {
//     if (userseq.length === gameseq.length) {
//       setTimeout(levelup, 1000);
//     }
//   } else {
//     h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to restart.`;
//     document.body.style.backgroundColor = "red";
//     setTimeout(() => {
//       document.body.style.backgroundColor = "white";
//     }, 150);
//     reset();
//   }
// }

// // Button click handler
// function btnpress() {
//   let btn = this;
//   userflash(btn);
//   let usercolor = btn.getAttribute("id");
//   userseq.push(usercolor);
//   checkans(userseq.length - 1);
// }

// // Add click listeners
// let allbtns = document.querySelectorAll(".btn");
// allbtns.forEach((btn) => {
//   btn.addEventListener("click", btnpress);
// });

// // Reset game
// function reset() {
//   started = false;
//   gameseq = [];
//   userseq = [];
//   level = 0;
// }
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let resultShown = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const num = button.getAttribute('data-num');
    const op = button.getAttribute('data-op');
    const id = button.id;

    if (id === 'clear') {
      currentInput = '';
      display.textContent = '0';
      resultShown = false;
    } 
    else if (id === 'backspace') {
      if (!resultShown) {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || '0';
      }
    }
    else if (id === 'equals') {
      try {
        let expression = currentInput;
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
        if (expression.trim() === '') return;
        let res = eval(expression);
        if (res === undefined) return;
        display.textContent = res;
        currentInput = res.toString();
        resultShown = true;
      } catch (e) {
        display.textContent = 'Error';
        currentInput = '';
      }
    }
    else if (num !== null) {
      if (resultShown) {
        currentInput = num === '.' ? '0.' : num;
        display.textContent = currentInput;
        resultShown = false;
      } else {
        // Prevent multiple dots in the same number
        const parts = currentInput.split(/[\+\-\*\/]/);
        if (num === '.' && parts[parts.length -1].includes('.')) return;

        currentInput += num;
        display.textContent = currentInput;
      }
    }
    else if (op !== null) {
      if (currentInput === '') return;
      if (resultShown) {
        resultShown = false;
      }
      // Prevent two operators in a row
      if (/[+\-*/]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1) + op;
      } else {
        currentInput += op;
      }
      display.textContent = currentInput;
    }
  });
});

