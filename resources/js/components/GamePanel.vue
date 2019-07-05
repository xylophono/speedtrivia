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