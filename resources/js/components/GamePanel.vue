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
            <p>{{ this.$root.gameData.gameState.correct}} / {{ this.$root.gameData.meta.questions}}</p>
            <br>
            <h2>Good Job Cowboy</h2>
            <br>
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
        }
    },
    methods: {
        goHome: function(){
            this.$root.resetGame();
        } 
    }
}
</script>