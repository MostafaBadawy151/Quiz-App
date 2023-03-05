
export class Quiz{
    constructor(result){
        console.log(result);
        // ---------global ---------------
        this.result = result;
        this.currentIndex =0;
        document.getElementById('to').innerHTML=result.length;
        this.from = document.getElementById('from') // global
        this.question = document.getElementById('questionTitle')
        this.questionContent = document.getElementById('questionContent');
        this.showQuestions();
        this.correctAnswer;
        this.correctAnswerCounter=0;

        // ---------Events ---------------
        document.getElementById('nextQuestion').addEventListener('click',()=>{
            this.nextQuestion()
        });
        document.getElementById("end").addEventListener("click", () => {
            location.reload()})

    }

    showQuestions(){
        this.from.innerText = this.currentIndex +1;
        const currentQuestion = this.result[this.currentIndex];
        console.log('currentQuestion',currentQuestion);
        this.question.innerText = currentQuestion.question;
        this.correctAnswer = currentQuestion.correct_answer 
        const answers = [...currentQuestion.incorrect_answers] // [,,,];
        const correctAnswerIndex = Math.ceil(Math.random()*answers.length);
        answers.splice(correctAnswerIndex,0,this.correctAnswer);
        console.log(answers);
        let answerBox=``;

        for (let i = 0; i < answers.length; i++) {
            answerBox +=`
            <li class="my-3 animate__animated">
         <div class="pretty p-default p-round p-smooth p-plain">
            <input type="radio" name="answer" value="${answers[i]}" />
            <div class="state p-success-o">
               <label> ${answers[i]} </label>
            </div>
         </div>
      </li>
            `
        }
        this.questionContent.innerHTML = answerBox;

    }

    nextQuestion(){
       const currentAnswer= document.querySelector('[name="answer"]:checked')?.value;  // undefined
       console.log(currentAnswer);
       if (currentAnswer != undefined) {
        $("#alertAns").fadeOut(300);
        this.currentIndex++; // 3

        if (this.currentIndex > this.result.length -1) { // 2
            if (currentAnswer === this.correctAnswer) {
                $('#correct').fadeIn(300);
                $('#correct').fadeOut(300); //  mmkn a3mlha setTimeOut
                this.correctAnswerCounter++;
            }
            else{
                $('#inCorrect').fadeIn(300);
                $('#inCorrect').fadeOut(300);
            } 
            document.getElementById('score').innerText=this.correctAnswerCounter;
            setTimeout(() => {
                $('#quiz').removeClass('show')
             }, 500);
            setTimeout(() => {
                $('#finsish').addClass('show')
             }, 500);
           
             if (this.correctAnswerCounter > this.result.length / 2) {
                 $('.text-success').click();
            document.getElementById('congratsAudio').play()

             }
             else{
            document.getElementById('failAudio').play()

             }
        }   
        else{
            if (currentAnswer === this.correctAnswer) {
                $('#correct').fadeIn(300);
                $('#correct').fadeOut(300); //  mmkn a3mlha setTimeOut
                this.correctAnswerCounter++;
            }
            else{
                $('#inCorrect').fadeIn(300);
                $('#inCorrect').fadeOut(300);
            } 

            this.showQuestions();
        }
    

       }else{
        $('#alertAns').fadeIn(300);
 
       }
    }
}
