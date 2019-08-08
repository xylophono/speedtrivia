<template>
<div class="game-panel">
    <div
        v-for="(q, i) in $root.gameData.questions"
        :key="i"
    >
        <game-question        
            :id="parseInt(i)"
            :question="q.question"
            :answers="q.answers"
        ></game-question>
    </div>

    <div
        class="question-card"
        :class="{
            'question-card--active': $root.gameData.gameState.completed
        }">

        <div class="question-card__content">
            <div class="question-card__logo">
                <div>
                    <p class="h2 text--smaller text--pink">Speed</p>
                    <p class="h2 text--pink">Trivia</p>
                </div>
            </div>

            <p class="h1">{{ this.$root.gameData.gameState.correct }} / {{ this.$root.gameData.meta.questions }}</p>
            <br>
            <h2>{{ resultText[this.$root.gameData.gameState.correct] }}</h2>
            <br><br><br><br>
            <button class="button" @click="goHome()">
                Home
            </button>
        </div>

    </div>
</div>
</template>

<script>
import GameQuestion from '../components/GameQuestion.vue';
export default {
    components: {
        GameQuestion
    },
    data: function() {
        return {
            resultText: [
                'Yikes!',
                'What happened?',
                'Keep practicing!',
                'Could be worse...',
                'Room for improvement...',
                'Not too shabby!',
                'Good job!',
                'Way to go!',
                'You crushed it!'
            ]
        }
    },
    methods: {
        goHome: function(){
            this.$root.resetGame();
        } 
    }
}
</script>