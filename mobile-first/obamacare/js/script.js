const quizData = [
  {
    question: 'What kind of coverage do you need?',
    answers: [
      { text: 'Medical' },
      { text: 'Medical & Dental' },
      { text: 'Medical, Dental & Vision' },
    ],
  },
  {
    question: 'Are you a U.S. Citizen',
    answers: [{ text: 'Yes' }, { text: 'No' }],
  },
  {
    question: 'And are you under age 65?',
    answers: [
      { text: 'No' },
      {
        text: 'Yes <span>Also choose this if you`re turning 65 in the next few months!</span>',
      },
    ],
  },
  {
    question: 'Is your household income less than $50,000 per year?',
    answers: [{ text: 'Yes' }, { text: 'No' }],
  },
]

const quizModule = document.querySelector('.main__quiz')
const quizLoading = document.querySelector('.loading')
const quizFinish = document.querySelector('.main__finish')
const quizProgress = document.querySelector('.progress__line')
const quizQuestion = document.querySelector('[data-question]')
const quizForm = document.querySelector('.quiz__form-questions')
const nextBtn = document.querySelector('[data-next]')
const backBtn = document.querySelector('[data-back]')
let currentQuestionIndex = 0
let answersArray = []

const startQuiz = () => {
  setNextQuestion()
  nextBtn.setAttribute('disabled', 'disabled')
  quizProgress.style.width =
    (100 / quizData.length) * (currentQuestionIndex + 1) + '%'
}

const setNextQuestion = () => {
  resetForm()
  showQuestion(quizData[currentQuestionIndex])
}

const showQuestion = (question) => {
  quizQuestion.innerText = question.question

  question.answers.forEach((answer) => {
    const buttonAnswer = document.createElement('label')
    buttonAnswer.classList.add('quiz__choose')
    buttonAnswer.innerHTML = `<input class='sr-only hidden' type="radio" name="med"><div>${answer.text}</div>`

    quizForm.append(buttonAnswer)
    buttonAnswer.addEventListener('click', selectAnswer)
  })
}

const selectAnswer = (e) => {
  if (!e.target.nodeName.toLowerCase() === 'input') return
  nextBtn.removeAttribute('disabled')
}

const resetForm = () => {
  while (quizForm.firstChild) {
    quizForm.removeChild(quizForm.firstChild)
  }
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++

  if (quizData.length > currentQuestionIndex) {
    startQuiz()
  } else {
    currentQuestionIndex = quizData.length - 1
    quizModule.classList.add('hidden')
    quizLoading.classList.remove('hidden')

    setTimeout(() => {
      quizLoading.classList.add('hidden')
      quizFinish.classList.remove('hidden')
    }, 1000)
  }
  backBtn.classList.remove('hidden')
})

backBtn.addEventListener('click', () => {
  currentQuestionIndex--

  if (currentQuestionIndex < 1) {
    backBtn.classList.add('hidden')
  }

  if (currentQuestionIndex >= 0) {
    startQuiz()
  } else {
    currentQuestionIndex = 0
  }
})

startQuiz()
