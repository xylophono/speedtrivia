const axios = require('axios');

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
            
            let processedQuestions = {};

            processedQuestions.questions = [];
            processedQuestions.meta = {
                'category': this.categories[0].name
            };

            //Process the raw Questions into the format we'll use for the game
            rawQuestions.forEach((question, index) => {
                let tempQuestions = {};

                tempQuestions.category = question.category;
                tempQuestions.question = question.question;

                tempQuestions.answers = [];

                tempQuestions.answers.push({
                    'answer': question.correct_answer,
                    'correct': true
                });

                question.incorrect_answers.forEach((answer) => {
                    tempQuestions.answers.push({
                        'answer': answer,
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
}