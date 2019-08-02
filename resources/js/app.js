window.Vue = require('vue');

import SpeedTrivia from './classes/SpeedTrivia.js';
let game = new SpeedTrivia;

import GameHome from './components/GameHome.vue';
import GamePanel from './components/GamePanel.vue';

const app = new Vue({
    el: '#app',
    components: {
        GameHome,
        GamePanel
    },
    data: {
        gameData: {
        },
        categories: [],
        category: 0,
    },
    computed: {},
    methods: {
        newGame: function(cat) {
            this.gameData = game.clearGameData();

            return game.getQuestions(cat)
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
        },

        resetGame: function(){
            this.gameData = game.clearGameData();
        }
    },
    created: function() {
        this.categories = game.getCategories();
        this.gameData = game.clearGameData();
    }
});