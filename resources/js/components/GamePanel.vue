<template>
<div>
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
            <h1>Good Job Cowboy</h1>
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
    }
}
</script>