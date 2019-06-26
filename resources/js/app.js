window.Vue = require('vue');
const axios = require('axios');

import SpeedTrivia from './classes/SpeedTrivia.js';

let game = new SpeedTrivia;
game.getQuestions();

const app = new Vue({
    el: '#app',
    components: {},
    data: {},
    computed: {},
    methods: {},
    created: function() {}
});