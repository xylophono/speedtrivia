window.Vue = require('vue');

import SpeedTrivia from './classes/SpeedTrivia.js';
let game = new SpeedTrivia;

const app = new Vue({
    el: '#app',
    components: {},
    data: {
        gameData: {
        }
    },
    computed: {},
    methods: {
        newGame: function() {
            this.gameData = game.clearGameData();

            game.getQuestions()
            .then((resp) => {
                if(!resp) {
                    alert('failed to get questions');
                }
                else {
                    this.gameData = resp;
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