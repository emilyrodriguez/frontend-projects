// Fetching DOM elements by their IDs
const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

// Global variable to track errors during form processing
let isError = false;

// Function to clean unwanted characters from an input string
function cleanInputString(str) {
	const regex = /[+-\s]/g;
	return str.replace(regex, "");
}

// Function to check if an input string has an invalid format
function isInvalidInput(str) {
	const regex = /\d+e\d+/i;
	return str.match(regex);
}

// Function to dynamically add an entry to the form based on dropdown selection
function addEntry() {
	const targetInputContainer = document.querySelector(
		`#${entryDropdown.value} .input-container`
	);
	const entryNumber =
		targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
	const HTMLString = `
        \n<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
        \n<input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"/>
        \n<label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
        \n<input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories"/>`;

	targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

// Function to calculate and display calories based on user input
function calculateCalories(e) {
	e.preventDefault();
	isError = false;

	// Querying all input elements for each meal category
	const breakfastNumberInputs = document.querySelectorAll(
		"#breakfast input[type=number]"
	);
	const lunchNumberInputs = document.querySelectorAll(
		"#lunch input[type=number]"
	);
	const dinnerNumberInputs = document.querySelectorAll(
		"#dinner input[type=number]"
	);
	const snacksNumberInputs = document.querySelectorAll(
		"#snacks input[type=number]"
	);
	const exerciseNumberInputs = document.querySelectorAll(
		"#exercise input[type=number]"
	);

	// Getting calories from input elements using a helper function
	const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
	const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
	const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
	const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
	const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
	const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

	// Handling errors during input processing
	if (isError) {
		return true;
	}

	// Calculating consumed and remaining calories
	const consumedCalories =
		breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
	const remainingCalories =
		budgetCalories - consumedCalories + exerciseCalories;
	const surplusOrDeficit = remainingCalories >= 0 ? "Surplus" : "Deficit";


	// Updating the output element with the calculated information
	output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
		remainingCalories
	)} Calorie ${surplusOrDeficit}</span>
	<hr />
	<p>${budgetCalories} Calories Budgeted</p>
	<p>${consumedCalories} Calories Consumed</p>
	<p>${exerciseCalories} Calories Burned</p>
	`;

	output.classList.remove("hide");
}

// Helper function to calculate total calories from a list of input elements
function getCaloriesFromInputs(list) {
	let calories = 0;

	for (let i = 0; i < list.length; i++) {
		const currVal = cleanInputString(list[i].value);
		const invalidInputMatch = isInvalidInput(currVal);
		
		// Displaying an alert for invalid input and setting isError if found
		if (invalidInputMatch) {
			alert(`Invalid Input: ${invalidInputMatch[0]}`);
			isError = true;
			return null;
		}

		calories += Number(currVal);
	}

	return calories;
}


// Function to clear the form by resetting input values and hiding the output
function clearForm() {
	const inputContainers = Array.from(
		document.querySelectorAll(".input-container")
	);

	for (let i = 0; i < inputContainers.length; i++) {
		inputContainers[i].innerHTML = "";
	}

	budgetNumberInput.value = "";
	output.innerText = "";
	output.classList.add("hide");
}

// Event listeners for user interactions
addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
