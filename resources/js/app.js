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
        //We're not getting the following vars from the SpeedTrivia class because we need them to persist through resets
        category: 0, // We're defaulting to category 0 (General Knowledge)
        questionSpeed: 8000, // Default question duration - 8seconds
    },
    computed: {},
    methods: {
        //Resets game data, returns a promise that populates a new question deck
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

        //Resets game data which functionally stops the game
        resetGame: function(){
            this.gameData = game.clearGameData();
        }
    },
    created: function() {
        //Need categories to populate home page, a blank set of game data to track state.
        this.categories = game.getCategories();
        this.gameData = game.clearGameData();
    }
});