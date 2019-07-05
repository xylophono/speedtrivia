<template>
    <div
        class="question-card"
        :class="{
        'question-card--active': isActive,
        'question-card--answered': isAnswered
        }">
        <div class="question-card__content">
            <p>{{ question }}</p>
            <br>
            <div
                v-for="(answer, index) in answers"
                :key="index">
                <button
                v-on:click.prevent="answerQuestion(index)"
                class="question-card__button"
                :class="{
                    'question-card__button--true': isAnswered && $root.gameData.questions[id].answers[index].correct,
                    'question-card__button--false': selected == index && isAnswered && !$root.gameData.questions[id].answers[index].correct
                }" 
                >{{ answer.answer }}</button>
                <br>
            </div>
        </div>
    </div>
    
</template>

<script>
    export default {
        data: function() {
            return {
                selected: null,
                isAnswered: false
            }
        },
        computed: {
            isActive() {
                return this.$root.gameData.gameState.activeQuestion >= this.id;
            }
        },
        props: {
            id: Number,
            question: String,
            answers: Array
        },
        methods: {
            answerQuestion(index) {
                this.selected = index;
                this.isAnswered = true;
                if(this.$root.gameData.questions[this.id].answers[index].correct) {
                    this.$root.gameData.gameState.correct++;
                }
                if(index <= this.$root.gameData.meta.questions -1 ) {
                    this.$root.gameData.gameState.activeQuestion++;
                }
                
            }
        }
    }
</script>