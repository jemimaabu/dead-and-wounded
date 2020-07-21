var difficulty = document.getElementById("difficulty-level").value;
var input = document.getElementById("user-input");
input.maxLength = difficulty;
var targetNumber = [];

generatetargetNumber();

// Generate array of 4 unique random numbers
function generatetargetNumber() {
	while (targetNumber.length < difficulty) {
		const rand = Math.floor(Math.random() * 9);
		if (targetNumber.indexOf(rand) == -1)
			targetNumber.push(rand);
	}
}

// Change difficulty level
document.getElementById("difficulty-level").onchange = function () {
	difficulty = document.getElementById("difficulty-level").value;
	input.maxLength = difficulty;
	input.value = "";
	document.getElementById("result-body").innerHTML = "";
};

function countDeadAndWounded(userInput) {
	const userArray = ("" + userInput).split("");
	let dead = 0;
	let wounded = 0;

	for (var i = 0; i < userArray.length; i++) {
		if (userArray[i] == targetNumber[i])
			dead++;

		for (var j = 0; j < userArray.length; j++)
			if (i !== j && userArray[i] == targetNumber[j])
				wounded++;
	}

	return { dead: dead, wounded: wounded }
}

function addResultRow(guessNum, resultText) {
	var tableBody = document.getElementById("result-body")
	var guessCell = document.createElement("td");
	var resultCell = document.createElement("td");
	var newRow = document.createElement("tr");
	guessCell.innerHTML = guessNum;
	resultCell.innerHTML = resultText;
	newRow.append(guessCell);
	newRow.append(resultCell);
	tableBody.append(newRow)
}

function guess() {
	let userInput = document.getElementById("user-input").value;
	let error = document.getElementById("form-errors");

	error.classList.add("error");
	if (userInput.length == 0) {
		error.innerHTML = "Input cannot be empty";
	} else if (isNaN(userInput)) {
		error.innerHTML = "Input must be a number";
	} else if (userInput.length != difficulty) {
		error.innerHTML = "Input must be " + difficulty + " characters";
	} else if ([...new Set(userInput.split(""))].join("").length !== userInput.length) {
		error.innerHTML = "Cannot have duplicate values";
	} else {
		error.classList.remove("error")
		error.innerHTML = "";

		let result = countDeadAndWounded(userInput);

		if (result.dead == difficulty) {
			addResultRow(userInput, "All dead, you win!");;
		} else {
			addResultRow(userInput, "dead: " + result.dead + " | wounded: " + result.wounded);
		}

		var element = document.getElementById("scroll-table");
		element.scrollTop = element.scrollHeight;

	}
}

document.getElementById("user-input").onkeypress = function (event) {
	if (event.which == 13 || event.keyCode == 13) {
		guess();
		return false;
	}
	return true;
};

function toggleInstructions() {
	var x = document.getElementById("instructions");
	if (x.style.display == "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}