

//-------------Hide Quiz-----------------//
var questionsAnswers = document.getElementById('questionsAnswers');
questionsAnswers.style.display = "none";


//---- Begins Quiz on Start press --------//

var startButton = document.getElementById('startButton');

startButton.addEventListener('click', quizStart);
		
function quizStart() {
	startButton.style.display = "none";
	questionsAnswers.style.display = "block";
	questionReplace();
	var rules = document.getElementById('rules');
	rules.style.display = "none";
	back.style.display = "none";
}


//--- Array of questions, choices, and answers -------//

var allQuestions = [{question: "What is the fastest bird on foot?", choices: ["Ostritch", "Sparrow", "Eagle", "Roadrunner", "Chicken"], answer: 0}, 
						{question: "What planet is closest to the sun?", choices: ["Venus", "Earth", "Mercury", "Mars", "Jupiter"], answer: 2}, 
						{question: "A heptagon is a shape with how many sides?", choices: ["4", "6", "7", "8", "9"], answer: 2},
						{question: "How long is one regular term for a U.S. Representative?", choices: ["3", "1", "2", "4", "6"], answer: 3}, 
						{question: "Which of the following states is NOT on the Gulf of Mexico?", choices: ["Georgia", "Texas", "Florida", "Alabama", "Louisiana"], answer: 0}, 
						{question: "What is the lowest prime number?", choices: ["0", "1", "2", "3", "5"], answer: 2},
						{question: "What is the largest South American country by area?", choices: ["Argentina", "Brazil", "Chile", "Mexico", "Peru"], answer: 1}, 
						{question: "Which one of the following states is NOT part of the Four Corners?", choices: ["New Mexico", "Utah", "Colorado", "Navada", "Arizona"], answer: 3}, 
						{question: "Who was the first person to step foot on the moon?", choices: ["Neil Armstrong", "Edwin 'Buzz' Aldrin", "John Glenn", "Sally Ride", "Alan Shepard"], answer: 0},
						{question: "In the northern hemisphere, in what month is the autumnal equinox?", choices: ["August", "September", "October", "November", "April"], answer: 1},
						{question: "What state is the Grand Canyon in?", choices: ["California", "Arizona", "North Dakota", "New Mexico", "South Dakota"], answer: 1},
						{question: "Emma has 2 yard sticks. She also has a 12-inch ruler. She laid them end-to-end in a line. How many feet long is the line?", choices: ["3 Feet", "5 Feet", "7 Feet", "9 Feet", "11 Feet"], answer: 2},
						{question: "Inca civilizations were concentrated on what continent?", choices: ["South America", "Africa", "North America", "Asia", "Europe"], answer: 0},
						{question: "'Carefully' is an example of what type of word?", choices: ["Adjective", "Noun", "Verb", "Adverb", "Pronoun"], answer: 3}]; 



//--- Submit and Back ------------//

var submit = document.getElementById('submit');
submit.addEventListener('click', checkAnswer);

var back = document.getElementById('back');
back.addEventListener('click', redoAnswer);

//:::::::::::::::::::: Dynamically fill in question and answer choices :::::::::::::::::://

var qCount = 0; //----- Keeps count of question number
var question = document.getElementById('question');

var inner = document.getElementById('inner');

var questionNumber = document.getElementById('title');
var answersBlock = document.getElementById('answers');

function questionReplace() {
	answersBlock.innerHTML = '';
	if (qCount < allQuestions.length) {
		questionNumber.innerHTML = '<h1>' + 'Question ' + (qCount+1) + " of " + allQuestions.length + '</h1>';
		question.textContent = allQuestions[qCount].question;
		for (var i = 0; i < allQuestions[qCount].choices.length; i++) {
			var choice = allQuestions[qCount].choices[i];
			var radioButtons = document.createElement('input');
				radioButtons.type = 'radio';
				radioButtons.name = 'answerChoice';
				radioButtons.value = i;
				radioButtons.className = 'radio';

			var radioText = document.createElement('span');	
				radioText.innerHTML = choice + '<br>';

			answersBlock.appendChild(radioButtons);
			answersBlock.appendChild(radioText);		
		}

//-- Hide Questions and show Results header--//
	
	} else {
		inner.style.display = "none";
		questionNumber.innerHTML = "<h1>" + "Results" + "</h1>";
		resultsTable();
	}
}



//::::::::::::::::::::::: Check Answer Function :::::::::::::::::::::::::::::://

var grade = []; //--- 'Correct' or 'Wrong' array
var userAnswerBank = []; //--- Users answer selection array

function checkAnswer() {
	var answerChoice = document.getElementsByName('answerChoice');
	var notChecked = [];
	for (var j = 0; j < answerChoice.length; j++) {
		if (answerChoice[j].checked) {
			selection = answerChoice[j].value;
			userAnswerBank.splice(qCount, 1, (j));
			} 
//---- Checks to see if a selection was made, if not shows alert------//
			else {
				notChecked ++;
				if (notChecked == answersBlock.length) {
					alert('You must make a selection');
					return false;
				}	
			}
		}
//---- checks answer and adds to 'correct' or 'wrong' array ---//
	if (selection == allQuestions[qCount].answer) {
		grade.splice(qCount, 1, 'correct');
		} else {
		grade.splice(qCount, 1, 'wrong');
		}
	qCount ++;
	questionReplace();
	if (userAnswerBank.length !== qCount) {
		showPrevAnswer();
	}
	backShow();
}


//:::::::::::::::::::::::: Back button Function/Hide ::::::::::::::::::::::::://

//----- Auto fills prev selected answer----//
function showPrevAnswer() {
		answersBlock[userAnswerBank[qCount]].checked = true;
}
//-- Displays prev question --//
function redoAnswer() {
	if (qCount > 1) {
		qCount --;
		questionReplace();
		showPrevAnswer();	
	} else { 
		qCount --;
		questionReplace();
		showPrevAnswer();
		back.style.display = 'none';
		}
}

//--- Display back button ---//

function backShow() {
	if (back.style.display == 'none') {
		back.style.display = 'block';
	}
}

//::::::::::::: Retake Quiz and End Results :::::::::::::::::::::::::::::::::://

var results = document.getElementById('results');
var correct = 0; //---- Final count of how many question are answered correct

//------ Fill out results table ------//

function resultsTable() {
	if (inner.style.display == "none") {
		results.style.display = 'block';
		var table = document.createElement('table');
		for (var i = 0; i < allQuestions.length; i++) {
			var trQ = table.insertRow();
			var tdQ = trQ.insertCell();
			var tdS = trQ.insertCell();
			tdQ.textContent = "Question " + (i+1);
			tdQ.style.textAlign = 'left';
			tdQ.style.padding = '10px';
			if (grade[i] == 'correct') {
				tdS.innerHTML = '<img src= "images/green.png" height="20px" width="20px">';
			} else {
				tdS.innerHTML = '<img src= "images/red.png" height="20px" width="20px">';
			}
			trQ.appendChild(tdQ);
			trQ.appendChild(tdS);
		}
		for ( var k = 0; k < grade.length; k++) {
			if (grade[k] == "correct") {
				correct++;
			}
		}
		results.appendChild(table);
		var score = document.createElement('h3');
		score.innerHTML = "You answered " + correct + " out of " + allQuestions.length + " questions correct!";
		results.appendChild(score);
		var retake = document.createElement('button');
		retake.id = 'retake';
		retake.innerHTML = "Retake";
		results.appendChild(retake);
		retake.addEventListener('click', retakeQuiz);
	}
}

//--- Show Results ---//

function displayResults() {
	if (inner.style.display == "none") {
		results.style.display = 'block';	
	}
}

//------Retake Quiz --------//

function retakeQuiz() {
	location.reload();
}








