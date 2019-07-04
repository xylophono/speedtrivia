<template>
<div>
    <game-question
        v-for="(q, i) in $root.gameData.questions"
        v-show="$root.gameData.gameState.activeQuestion == i"
        :key="i"
        :id="parseInt(i)"
        :question="q.question"
        :answers="q.answers"
    ></game-question>
    <br><br>
    {{ this.$root.gameData.gameState.correct}} / {{ this.$root.gameData.meta.questions}}
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