/// <reference types="../@types/jquery" />

import { Quiz } from "./quiz.module.js";

export class Setting{
    constructor(){
       document.getElementById('start').addEventListener('click', this.startQuestion.bind(this))
    }

    async startQuestion(){
        const category = document.getElementById('category').value;
        const difficulty =  document.querySelector('[name = "difficulty"]:checked').value
        const noQuestions = document.getElementById('amount').value
        if (noQuestions > 0) {
            const result = await this.getQuestions(category, difficulty, noQuestions);
            console.log(result);
            // $('#setting').fadeOut(500);
            // $('#quiz').fadeIn(500);
           $('#setting').removeClass('show');
            $('#quiz').addClass('show');
            const myQuiz = new Quiz(result);
        }
        else{
            $('#alertNumber').fadeIn(500);
        }
       
    }

    async getQuestions(category, difficulty, noQuestions){
        const api = await fetch(`https://opentdb.com/api.php?amount=${noQuestions}&category=${category}&difficulty=${difficulty}`);
        const response = await api.json();
        return response.results;
    }
}    

