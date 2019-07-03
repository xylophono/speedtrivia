window.Vue = require('vue');

import SpeedTrivia from './classes/SpeedTrivia.js';
let game = new SpeedTrivia;

const app = new Vue({
    el: '#app',
    components: {},
    data: {
        gameData: {
            'questions': [],
            'meta': {},
        }
    },
    computed: {},
    methods: {
        newGame: function() {
            this.gameData.questions = [];
            this.gameData.meta = {};

            game.getQuestions()
            .then((resp) => {
                if(!resp) {
                    alert('failed to get questions');
                }
                else {
                    this.gameData.questions = resp.questions;
                    this.gameData.meta = resp.meta;
                }
            })
            .catch((err) => {
                alert(err);
            });
        }
    },
    created: function() {
        this.newGame();
    }
});