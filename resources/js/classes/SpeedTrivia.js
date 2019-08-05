const axios = require('axios');
const he = require('he');

// Class to define our basic settings and retrieve categories & questions from the opentdb api

export default class {
    constructor() {
        this.endpoint = 'https://opentdb.com/api.php';
        this.questions = 8;
        this.categories = [
            {
                name: 'General Knowledge',
                endpoint: 9
            },
            {
                name: 'Science & Nature',
                endpoint: 17
            },
            {
                name: 'Geography',
                endpoint: 22
            },
            {
                name: 'History',
                endpoint: 23
            },
            {
                name: 'Sports',
                endpoint: 21
            },
            {
                name: 'Celebrities',
                endpoint: 26
            },
            {
                name: 'Animals',
                endpoint: 27
            }
        ];
    }

    // Create a new game
    getQuestions(cat) {
        return axios.get(this.endpoint, {
            params: {
                amount: this.questions,
                category: cat
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
                activeQuestion: -1, // We start on -1 because the questions are ID'd 0-7, incriment to 0 to begin the associated animations & timers
                correct: 0
            }
        }
    }

    getCategories() {
        return this.categories;
    }
}