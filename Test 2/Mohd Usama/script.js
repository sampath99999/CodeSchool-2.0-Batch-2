const API_KEY = "jF6aTwlkRYUja3WTibr0Am27IpT4yH9Mg0Cn3OVz";
const url = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=code&difficulty=Medium&limit=5
`;

function getURL() {
  return url;
}

const option_letters = ["a", "b", "c", "d", "e", "f"];
let questions = [];
let score = 0;
let count = 1;
let total;
let timer;
startQuiz();
function startQuiz() {
  $.get(getURL(), function (data) {
    generateQuiz(data);
  });
}

class Question {
  constructor(question, options, correctAnswer) {
    this.question = question;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
}

function generateQuiz(data) {
  for (i in data) {
    let question = data[i].question;
    let answers = data[i].answers;
    let correctAnswer = data[i].correct_answer;
    let questionObject = new Question(question, answers, correctAnswer);
    questions.push(questionObject);
  }
  total = questions.length;
  displayQuiz();
}

function displayQuiz() {
  let question = questions.pop();
  let options = question.options;
  let correctAnswer = question.correctAnswer;
  let questionText = question.question;
  let container = $("#quiz-container");
  let questionContainer = createCard(questionText, options, correctAnswer);
  let progressBar = createProgressBar(questions.length + 1);
  $("#score-heading").text(`Score:`);
  container.append(questionContainer, progressBar);
}

function createCard(questionText, options, correct_answer) {
  const question = createQuestion(questionText);
  const opt = createOptionsCard(options, correct_answer);
  let timeout = createQuestionTimer(5);

  card = $("<div>", {
    class:
      "card p-2 mt-3 mb-1 ms-2 me-sm-2 me-5 border-0 d-flex flex-column justify-content-center align-items-center",
  });
  card.append(question, opt, timeout);
  return card;
}

function createQuestionTimer(time) {
  if (time > 0) {
    $("#timer").text(secondsToTime(time));
    timer = setTimeout(function () {
      createQuestionTimer(time - 1);
    }, 1000);
  } else {
    count++;
    if (questions.length == 0) {
      displayResult();
      return;
    }
    $("#score").text(score);
    $("#quiz-container").empty();
    displayQuiz();
  }
}

function secondsToTime(secs) {
  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  return minutes + ":" + seconds;
}

function createQuestion(questionText) {
  return $("<div>", {
    class: " card-header bg-white fw-bold fs-3 border-0",
    text: questionText,
  });
}

function createOptionsCard(options, correct_answer) {
  let container = $("<div>", {
    class: "container-fluid",
  });
  let row = $("<div>", {
    class: "row column-gap-3 row-gap-3 justify-content-center my-3",
  });
  container.append(row);
  option_count = 0;
  for (i in options) {
    let option = options[i];
    if (option == null) {
      break;
    }
    let optionContainer = createOption(
      option,
      option_letters[option_count],
      correct_answer
    );
    row.append(optionContainer);
    option_count++;
  }
  return container;
}

function createOption(option, id, correct_answer) {
  let currentOption = $("<div>", {
    class:
      "col-5 d-flex justify-content-center align-items-center p-3 text-white rounded-5 bg",
    id: `answer_${id}`,
    text: option,
  });
  currentOption.click(function () {
    let selectedOption = $(this).attr("id");
    count++;
    if (selectedOption == correct_answer) {
      score += 1;
    }
    if (questions.length == 0) {
      displayResult();
      return;
    }
    clearTimeout(timer);
    $("#score").text(score);
    $("#quiz-container").empty();
    displayQuiz();
  });
  return currentOption;
}

function createProgressBar() {
  let progressBarInner = $("<div>", {
    class: "bar bg rounded-5",
    style: `width: ${(100 / total) * count}%;height:20px`,
  });
  $("#progress-bar").empty();
  progressValue();
  $("#progress-bar").append(progressBarInner);
}

function progressValue() {
  $("#progress-bar").append(
    $("<p>", {
      class: "p-0 m-0",
      text: `${count} / ${total}`,
    })
  );
}

function displayResult() {
    clearTimeout(timer);
  $("#score").text(score);
  $("#quiz-container").empty();
  $("#score").empty();
  $("#score-heading").empty();
  $("#timer").empty();
  $("#score").append(
    $("<div>", {
      class: "text-center",
      text: `You have completed the quiz! Your Final Score is ${score}`,
    })
  );
  count = 1;
  retakeTestBtn = $("<button>", {
    class: "btn btn-primary mt-4 p-3",
    text: "Retake Test",
    click: function () {
      score = 0;

      $("#score-heading").empty();

      $("#score").text("0");
      startQuiz();
    },
  });
  $("#score").append(retakeTestBtn);
}
