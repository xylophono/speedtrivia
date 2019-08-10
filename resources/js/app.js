window.Vue = require('vue');
require('web-animations-js');

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
        speeds: [],
        //We're not getting the following vars from the SpeedTrivia class because we need them to persist through resets
        category: 0,// We're defaulting to category 0 (General Knowledge)
        questionSpeed: 0, // Default question duration - 8seconds
        audio: true,
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

        //Handles audio events
        playAudio: function(clip) {
            // if(this.$root.audio && clip) {
            //     let audio = new Audio('resources/audio/'+clip+'.mp3');
            //     audio.volume = 0.5;
            //     audio.play();
            //     window.navigator.vibrate(50);
            // }
         },

         //Function to keep local and storage settings in sync
         changeSetting: function(setting, value) {
             this[setting] = value;
             if(typeof(Storage) !== 'undefined') {
                 localStorage[setting] = value;
             }
         },

        //Resets game data which functionally stops the game
        resetGame: function(){
            this.gameData = game.clearGameData();
        }
    },

    created: function() {
        //Need categories to populate home page, a blank set of game data to track state.
        this.categories = game.getCategories();
        this.speeds = game.getSpeeds();
        this.questionSpeed = this.speeds[0].duration;
        this.gameData = game.clearGameData();
    },

    mounted: function() {
        //Once mounted we're gonna check if there's localstorage settings and if so override the defaults
        if(typeof(Storage) !== 'undefined') {
            if(localStorage.category) { this.category = parseInt(localStorage.category); }
            if(localStorage.questionSpeed) { this.questionSpeed = parseInt(localStorage.questionSpeed); }
        }
    }
});