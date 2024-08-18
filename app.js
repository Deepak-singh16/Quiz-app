const questions = [
    {
      "question": "What is the capital of France?",
      answer:[
        { text: "Paris" , correct : true },
        { text: "Berlin" , correct : false },
        { text: "Baddi" , correct : false },
        { text: "Punjab" , correct : false },
      ]
    },
    {
      "question" : "________ runs on each node and ensures containers are running in a pod.",
      answer:[
        {text: 'ButtonKubelet',    correct : false},
        {text: 'ButtonEtcd', correct : true},
        {text: 'ButtonScheduler', correct : false},
        {text: 'ButtonPod', correct : false},
      ]
    },
  
    {
      "question": "What is the capital of India?",
      answer:[
        { text: "Mumbai" , correct : false },
        { text: "Delhi" , correct : true },
        { text: "Baddi" , correct : false },
        { text: "Punjab" , correct : false },
      ]
    },
    {
      "question": "What is the capital of USA?",
      answer:[
        { text: "New York" , correct : false },
        { text: "Los Angeles" , correct : false },
        { text: "Chicago" , correct : false },
        { text: "Washington D.C." , correct : true },
      ]
    },
    {
      "question": "What is the capital of Australia?",
      answer:[
        { text: "Sydney" , correct : false },
        { text: "Melbourne" , correct : false },
        { text: "Brisbane" , correct : false },
        { text: "Canberra" , correct : true },
      ]
    },
    {
      "question": "What is the capital of China?",
      answer:[
        { text: "Beijing" , correct : true },
        { text: "Shanghai" , correct : false },
        { text: "Guangzhou" , correct : false },
        { text: "Hong Kong" , correct : false },
      ]
    }
  ];
  
  const questionElement = document.getElementById('questions')
  const answerButton = document.getElementById('answer-buttons')
  const nextButton = document.getElementById('next-btn')
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = 'Next'
    showQuestions();
  }
  
  function showQuestions(){
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = `Question ${questionNo} : ${currentQuestion.question}`
    
    currentQuestion.answer.forEach((answer, index) => {
      const button = document.createElement('button')
      button.innerHTML = answer.text;
      button.classList.add('btn')
      answerButton.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer)
    });
  }
  
  function resetState(){
    nextButton.style.display= 'none'
    while(answerButton.firstChild){
      answerButton.removeChild(answerButton.firstChild);
    }
  }
  
  function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
      selectedBtn.classList.add("correct");
      score++;
    }
    else{
      selectedBtn.classList.add("incorrect");
    }
  
    Array.from(answerButton.children).forEach(button=>{
      if(button.dataset.correct==="true"){
        button.classList.add("correct");
      }
      button.disabled = true;
    })
    nextButton.style.display = 'block'
  }
  
  function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
  }
  
  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
      showQuestions()
    }
    else{
      showScore()
    }
  }
  
  nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
      handleNextButton();
    }
    else{
      alert(`Game Over! Your final score is ${score}`)
      startQuiz()
    }
  })
  
  startQuiz()