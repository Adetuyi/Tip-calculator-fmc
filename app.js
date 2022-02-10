//Declare variables
const people = document.querySelector("#people");
const btns = document.querySelector(".btns");
const msg = document.querySelectorAll(".msg");
const bill = document.querySelector("#bill");
const right = document.querySelector(".right");
const totalArea = document.querySelector(".total");
const tip = document.querySelector(".tip");
let rate;
//Add event listeners
people.addEventListener("keyup", calculate);

bill.addEventListener("keyup", () => {
  //Checks if people input is filled, if it is it runs calc

  //recheck the value of #people not what is in the declared variable above

  const people = document.querySelector("#people").value;

  if (people !== "") {
    calculate();
  }
});

//Adds event listeners to the tip buttons
btns.addEventListener("click", (e) => {
  const focus = document.querySelector("#focus");
  if (focus !== null) {
    //removes the focus id that highlights the buttons

    focus.id = "";
  }
  if (e.target.tagName === "BUTTON") {
    //adds the focus id that highlights the buttons

    e.target.id = "focus";
    rate = e.target.textContent;

    //Gets the rate from the buttons and removes the %

    rate = parseInt(rate.slice(0, rate.indexOf("%")));
    calculate();
  } else if (e.target.tagName === "INPUT") {
    e.target.addEventListener("keyup", () => {
      //Gets rate from custom input

      rate = parseFloat(e.target.value);
      calculate();
    });
  }
});

//Resets the inputs
right.addEventListener("click", (e) => {
  if (e.target.id == "reset") {
    bill.value = "";
    rate = "";
    people.value = "";
    tip.textContent = "$0.00";
    totalArea.textContent = "$0.00";
    e.target.id = "";
    document.querySelector("#focus").id = "";
    document.querySelector("#custom").value = "";
  }
});

//Calculates the tip and total

function calculate() {
  //Only runs when people input has a value

  if (parseInt(people.value) === 0) {
    //Displays an error message if people input is zero

    showError("Can't be zero", 2, true);
  } else if (people.value !== "") {
    //Proceeds

    //Recheck bill
    const bill = document.querySelector("#bill");
    if (bill.value === "") {
      //Displays an error message if bill input is empty

      showError("Can't be empty", 0, true);
    } else if (parseInt(bill.value) === 0) {
      //Displays an error message if bill input is zero

      showError("Can't be zero", 0, true);
    } else if (!rate) {
      //Displays an error message to select tip

      showError("Select a tip rate", 1);
    } else {
      let total =
        ((rate / 100) * parseFloat(bill.value)) / parseInt(people.value);

      //Displays tip

      tip.textContent = `$${total.toFixed(2)}`;

      //Displays total

      totalArea.textContent = `$${(
        total.toFixed(2) * parseInt(people.value)
      ).toFixed(2)}`;

      //Make reset button light up
      document.querySelector(".reset").id = "reset";
    }
  }
}

//SHows the error messages in related field

function showError(message, index, warn) {
  //Highlights the border of the input tag

  //Timouts remove the messages after some seconds

  if (warn) {
    msg[index].parentElement.nextElementSibling.style.border =
      "1px solid hsl(0, 100%, 75%)";
    setTimeout(() => {
      msg[index].parentElement.nextElementSibling.style.border =
        "1px solid #fff";
    }, 3000);
  }

  msg[index].textContent = message;

  setTimeout(() => {
    msg[index].textContent = "";
  }, 3000);
}
