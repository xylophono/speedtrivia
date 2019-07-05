const axios = require('axios');
const he = require('he');

// Class to define our basic settings and retrieve categories & questions from the opentdb api

export default class {
    constructor() {
        this.endpoint = 'https://opentdb.com/api.php';
        this.questions = 8;
        this.categories = [{
            name: 'General Knowledge',
            endpoint: 9
        }];
    }

    // Create a new game
    getQuestions() {
        return axios.get(this.endpoint, {
            params: {
                amount: this.questions,
                category: 9
            }
        })
        .then((response)=>{
            if(response.status !== 200 || response.data.response_code !== 0) {
                return false;
            }

            let rawQuestions = response.data.results;
            
            let processedQuestions = this.clearGameData();

            processedQuestions.meta.category = this.categories[0].name;
            processedQuestions.meta.questions = this.questions;

            //Process the raw Questions into the format we'll use for the game
            rawQuestions.forEach((question, index) => {
                let tempQuestions = {};

                tempQuestions.category = he.decode(question.category);
                tempQuestions.question = he.decode(question.question);
                tempQuestions.result = false;

                tempQuestions.answers = [];

                tempQuestions.answers.push({
                    'answer': he.decode(question.correct_answer),
                    'correct': true
                });

                question.incorrect_answers.forEach((answer) => {
                    tempQuestions.answers.push({
                        'answer': he.decode(answer),
                        'correct': false
                    });
                });

                //Shuffle the answers
                tempQuestions.answers.sort(function() { return 0.5 - Math.random() });

                processedQuestions.questions.push(tempQuestions);

            });

            return processedQuestions;

        });
    }

    // Create a blank set of gameData
    clearGameData() {
        return {
            'questions': [],
            'meta': {
                'category': '',
                'questions': null
            },
            'gameState': {
                active: false,
                completed: false,
                activeQuestion: 0,
                correct: 0
            }
        }
    }
}