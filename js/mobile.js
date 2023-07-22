
// menu burger
(function($) { // Begin jQuery
	$(function() { // DOM ready
	  // If a link has a dropdown, add sub menu toggle.
	  $('nav ul li a:not(:only-child)').click(function(e) {
		$(this).siblings('.nav-dropdown').toggle();
		// Close one dropdown when selecting another
		$('.nav-dropdown').not($(this).siblings()).hide();
		e.stopPropagation();
	  });
	  // Clicking away from dropdown will remove the dropdown class
	  $('html').click(function() {
		$('.nav-dropdown').hide();
	  });
	  // Toggle open and close nav styles on click
	  $('#nav-toggle').click(function() {
		$('nav ul').slideToggle();
	  });
	  // Hamburger to X toggle
	  $('#nav-toggle').on('click', function() {
		this.classList.toggle('active');
	  });
	}); // end DOM ready
  })(jQuery); // end jQuery
// =====================
// Console
// =====================
var output = $('.output');
var input = $('textarea.input');
var toOutput;
var body = $('body');
var html = document.getElementsByTagName('html')[0];


// Creates the event listner for the comands ==

input.keypress(function(e) {
	if (e.which == 13) {
		var inputVal = $.trim(input.val());
		//console.log(inputVal);

		if (inputVal == "help") {
			help();
			input.val('');
		} else if (inputVal == "contact") {
			contactMe();
			input.val('');
		} else if (inputVal == "clear") {
			clearConsole();
			input.val('');
		} else if (inputVal.startsWith("say") === true) {
			sayThis(inputVal);
			input.val('');
		} else if(inputVal == "test") {
      test();
      input.val('');  
		} else if (inputVal == "def theme clear"){
      clair();
      input.val('');
    }else if (inputVal == "def theme dark"){
      sombre();
      input.val('');
    }else {
    
			  Output('<span>@admin >>> command not found</span></br>');
			  input.val('');

    }
	}
});

// functions related to the commands typed
// =======================================
function test() {
  
  Output('<span>@admin >>> Gout dévérouillé</span>');
}

function clair(){
  html.style.cssText += "--main-background-color: #FFFFFF;";
  html.style.cssText += "--main-text-color: #000000;";
  Output('<span>@admin >>> theme clear applied</span>');
}

function sombre(){
  html.style.cssText += "--main-background-color: #1D1C24;";
  html.style.cssText += "--main-text-color: #FFFFFF;";
  //document.getElementById("body").style.backgroundColor = "#1D1C24";
  Output('<span>@admin >>> theme dark applied</span>');
}



//clears the screen
function clearConsole() {
	output.html("");
	Output('<span>@admin >>> clear</span></br>');
}

// prints out a list of "all" comands available
function help() {
	var commandsArray = ['Help: List of available commands', '>help', '>contact', '>clair', '>sombre', '>time', '>clear', '>say'];
	for (var i = 0; i < commandsArray.length; i++) {
		var out = '<span>' + commandsArray[i] + '</span><br/>'
		Output(out);
	}
}


// function to the say command
function sayThis(data) {
	data = data.substr(data.indexOf(' ') + 1);
	Output('<span>@admin >>> [say]:</span><span>' + data + '</span></br>');
}


function contactMe() {
	var contactArray = ['>Contact:', '[GitHub](https://github.com/Mario-Duarte)', '[BitBucket](https://bitbucket.org/Mario_Duarte/)', '[CodePen](https://codepen.io/MarioDesigns/)', '[Twitter](https://twitter.com/MDesignsuk)'];
	seperator();
	for (var i = 0; i < contactArray.length; i++) {
		var out = '<span>' + contactArray[i] + '</span><br/>'
		Output(out);
	}
	seperator();
}

// Prints out the result of the command into the output div
function Output(data) {
	$(data).appendTo(output);
}


// quizz

var quizQuestions = [
    { 
        q: "Dans quelle ville n'a pas été Vincent ?",
        a: ["Plymouth", "Tokyo", "Las Vegas" ],
        r: 2,
    },
    { 
        q: "Vincent veux devenir ?",
        a: ["Agriculteur", "Pro gameur", "Chef de projet dans l'informatique"],
        r: 3,
    },
	{ 
        q: "Vincent s'occupe de quelle partie dans G3 Studio ?",
        a: ["Développement", "Sound design", "Direction artistique"],
        r: 1,
    },
];

// Manage Quiz State
var quizHandler = {
    isFinished: false,
    questions: {},
    answers: [],
    nbQuestions: 0,
    result: 0, //result percentage
    actualQuestion: 1, //actual question
    nbCorrect: 0,
};

function quizInit(questions) {
    quizHandler.isFinished = false;
    quizHandler.result = 0;
    quizHandler.questions = questions;
    quizHandler.nbQuestions = questions.length;
    quizHandler.answers = new Array(quizHandler.nbQuestions).fill(-1);
    quizHandler.actualQuestion = 1;
    quizHandler.nbCorrect = 0;

    buildQuestion(quizHandler.actualQuestion);
}

function calculateQuizResults(){
    let count = 0;
    for (let i = 0; i < quizHandler.questions.length; i++) {
        if(quizHandler.answers[i] == quizHandler.questions[i]['r']){
            count++;
        }     
    }
    quizHandler.nbCorrect = count;
    quizHandler.result = Math.round(count * (1/quizHandler.nbQuestions) * 100);
}

function buildQuestion(nb) {
    let current = quizHandler.questions[nb - 1];
    document.querySelector('.quiz .question').innerText = current['q'];

    let template = "";
    for (let i = 0; i < current["a"].length; i++) {
        template += `<input type="radio" name="answer" id="answer${i+1}-check" value="${i+1}">
        <a data-for="answer${i+1}-check" class="answer answer${i+1}">
            <p>${current["a"][i]}</p>
        </a>`;
    }

    document.querySelector('.quiz .answers').innerHTML = template;

    // Add answer click
    document.querySelectorAll(".answer").forEach((el) => {
        el.addEventListener("click", () => {
            let fordata = el.getAttribute("data-for");
            document.querySelector("#" + fordata).checked = true;
        })
    })
}

quizInit(quizQuestions);


// Add quiz click event handler
document.querySelector(".submit-quiz").addEventListener("click", () => {
    if(quizHandler.isFinished == true){
        document.querySelector('.submit-quiz').innerText = "Suivant";
        quizInit(quizQuestions);
    }else{
        quizHandler.answers[quizHandler.actualQuestion - 1] = document.querySelector("input[type='radio'][name='answer']:checked").value;

        if(quizHandler.actualQuestion < quizHandler.nbQuestions){
            quizHandler.actualQuestion += 1;
            buildQuestion(quizHandler.actualQuestion);
        }else{
            calculateQuizResults();

            document.querySelector('.quiz .question').innerText = "Résultats";
            document.querySelector('.submit-quiz').innerText = "Rejouer";
            quizHandler.isFinished = true;

            document.querySelector('.quiz .answers').innerHTML = `<p>Vous avez obtenu&nbsp;<span>${quizHandler.nbCorrect} / ${quizHandler.nbQuestions}</span></p>`; 
        }
    }
});