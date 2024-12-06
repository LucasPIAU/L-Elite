let currentTitle = "";
let currentExplanation = "";
let currentImageSrc = "";

function changeHeart() { 
  currentTitle = "Le coeur : Le courant océanique";
  currentExplanation = "Le cœur est comparable aux courants océaniques, comme le Gulf Stream. Tout comme le cœur pompe le sang pour irriguer l’ensemble du corps, les courants océaniques transportent l’énergie thermique et les nutriments à travers les océans, régulant ainsi le climat et soutenant la vie marine. Ce flux constant est essentiel à l’équilibre des écosystèmes, tout comme la circulation sanguine est essentielle à la santé humaine.";
  currentImageSrc = "assets/images/corail.webp";

  updateContent();
}

function changeLungs() {
  currentTitle = "Les poumons : Les récifs corralliens";
  currentExplanation = "Les poumons assurent l’oxygénation du sang, tout comme les récifs coralliens jouent un rôle vital dans la production d’oxygène. Les récifs, grâce aux algues symbiotiques qu’ils abritent, contribuent à la photosynthèse et produisent une part significative de l’oxygène mondial. Les deux fonctionnent comme des systèmes de filtration, en purifiant et en redistribuant des éléments essentiels à la vie.";
  currentImageSrc = "assets/images/corail.jpg";

  updateContent();
}

function changeStomach() {
  currentTitle = "L’estomac : Les abysses marins";
  currentExplanation = "L’estomac décompose les aliments pour en extraire les nutriments, de la même manière que les abysses marins jouent un rôle dans le cycle de décomposition. Les abysses sont des zones où les matières organiques en décomposition s’accumulent, nourrissant des écosystèmes uniques. L’estomac et les abysses transforment tous deux des éléments bruts en énergie ou en nutriments nécessaires à la vie.";
  currentImageSrc = "assets/images/abysses.jpg";

  updateContent();
}

function updateContent() {
  document.querySelector(".titreCorps").innerHTML = currentTitle;
  document.querySelector(".explicationsCorps").innerHTML = currentExplanation;
  document.querySelector('.illustrationCorps').src = currentImageSrc;
}

document.addEventListener('DOMContentLoaded', function () {
  const questions = [
    {
      question: "Quel rôle jouent les océans dans la régulation du climat ?",
      options: [
        "Ils produisent du pétrole",
        "Ils régulent la température en absorbant la chaleur et le CO₂",
        "Ils augmentent le réchauffement climatique",
        "Ils réduisent la couche d'ozone",
      ],
      answer: 1,
    },
    {
      question: "Quel est le principal danger du réchauffement climatique pour les océans ?",
      options: [
        "La disparition des plages",
        "L'augmentation du sel",
        "La montée du niveau de la mer et l'acidification",
        "La prolifération des algues vertes",
      ],
      answer: 2,
    },
    {
      question: "Quel phénomène est similaire aux poumons dans les océans ?",
      options: [
        "Les marées",
        "Les récifs coralliens",
        "Les poissons",
        "Les courants océaniques",
      ],
      answer: 1,
    },
    {
      question: "Quel organe humain est comparable aux courants marins ?",
      options: [
        "Le cerveau",
        "Le cœur",
        "L'estomac",
        "Les reins",
      ],
      answer: 1,
    },
    {
      question: "Quelle solution est efficace pour limiter l’impact du réchauffement climatique sur les océans ?",
      options: [
        "Arrêter de boire de l'eau en bouteille",
        "Réduire les émissions de gaz à effet de serre",
        "Manger moins de poissons",
        "Utiliser plus de plastique biodégradable",
      ],
      answer: 1,
    },
    {
      question: "Quel est l’effet de l’acidification des océans sur les coraux ?",
      options: [
        "Ils grandissent plus vite",
        "Ils deviennent plus colorés",
        "Ils blanchissent et meurent",
        "Ils attirent plus de poissons",
      ],
      answer: 2,
    },
    {
      question: "Quel organe humain pourrait être comparé aux abysses océaniques ?",
      options: [
        "Le foie",
        "L’estomac",
        "Les poumons",
        "Le cerveau",
      ],
      answer: 1,
    },
    {
      question: "Quelle pratique aide à protéger les océans ?",
      options: [
        "Pêcher plus de poissons pour limiter la surpopulation marine",
        "Réduire l'utilisation de plastique et recycler davantage",
        "Utiliser des produits chimiques pour nettoyer les plages",
        "Lancer plus de satellites pour surveiller l’océan",
      ],
      answer: 1,
    },
    {
      question: "Quel pourcentage de la surface terrestre est recouvert par les océans ?",
      options: ["50%", "60%", "71%", "80%"],
      answer: 2,
    },
    {
      question: "Quel est l’impact de la fonte des glaces sur les océans ?",
      options: [
        "Elle diminue la salinité de l’eau",
        "Elle augmente la biodiversité",
        "Elle stabilise le niveau de la mer",
        "Elle n’a aucun effet",
      ],
      answer: 0,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  const questionContainer = document.getElementById('question-container');
  const nextButton = document.getElementById('next-button');
  const replayButton = document.getElementById('replay-button');
  const scoreContainer = document.createElement('div');

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = '';

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = currentQuestion.question;
    questionContainer.appendChild(questionTitle);

    const answersList = document.createElement('ul');
    answersList.classList.add('quiz-options');

    const options = [...currentQuestion.options];
    shuffleArray(options);

    options.forEach((option, i) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="radio" name="question${currentQuestionIndex}" id="q${currentQuestionIndex}a${i}">
        <label for="q${currentQuestionIndex}a${i}">${option}</label>`;
      answersList.appendChild(listItem);

      listItem.addEventListener('click', function () {
        if (option === currentQuestion.options[currentQuestion.answer]) {
          score++;
        }
        checkAnswer(option, currentQuestion.options[currentQuestion.answer]);
        nextButton.style.display = 'block';
      });
    });

    questionContainer.appendChild(answersList);
    nextButton.style.display = 'none';
  }

  function checkAnswer(selectedOption, correctOption) {
    const labels = document.querySelectorAll(`#question-container label`);

    labels.forEach(label => {
      if (label.textContent === correctOption) {
        label.style.color = 'green';
      } else if (label.textContent === selectedOption) {
        label.style.color = 'red';
      } else {
        label.style.color = 'black';
      }
    });
  }

  nextButton.addEventListener('click', function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      displayFinalScore();
    }
  });

  function displayFinalScore() {
    questionContainer.innerHTML = `<p>Félicitations, vous avez terminé le quiz !</p><p>Votre score final est de ${score} sur ${questions.length}.</p>`;
    nextButton.style.display = 'none';
    replayButton.style.display = 'block';
  }

  function replay() {
    currentQuestionIndex = 0;
    score = 0;
    replayButton.style.display = 'none';
    nextButton.style.display = 'block';
    displayQuestion();
  }

  replayButton.addEventListener('click', replay);

  displayQuestion();
});