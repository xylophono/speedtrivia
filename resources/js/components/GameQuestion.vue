<template>
    <div>
        <h1>{{ question }}</h1>
        <div
            v-for="(answer, index) in answers"
            :key="index">
            <button
               v-on:click.prevent="answerQuestion(index)" 
            >{{ answer.answer }}</button>
            <br>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                answered: false
            }
        },
        props: {
            id: Number,
            question: String,
            answers: Array
        },
        methods: {
            answerQuestion(index) {
                if(this.$root.gameData.questions[this.$root.gameData.gameState.activeQuestion].answers[index].correct) {
                    alert('correct');
                    this.$root.gameData.gameState.correct++;
                }
                else {
                    alert('incorrect');
                }

                window.setTimeout(() => {
                    this.$root.gameData.gameState.activeQuestion++;
                }, 1000);
            }
        }
    }
</script>