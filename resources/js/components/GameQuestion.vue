<template>
    <div
        class="question-card"
        :class="{
        'question-card--active': isActive,
        'question-card--answered': isAnswered
        }">

        <div class="question-progress"
            :style="{
                width: questionTimeBar
            }"
        ></div>

        <div class="question-card__content">
            
            <div class="question-card__logo">
                <div>
                    <p class="h2 text--smaller text--pink">Speed</p>
                    <p class="h2 text--pink">Trivia</p>
                </div>
            </div>
            
            <p>{{ question }}</p>
            <br><br>
            <div
                v-for="(answer, index) in answers"
                :key="index">
                <button
                v-on:click.prevent="answerQuestion(index);"
                class="question-card__button"
                :class="{
                    'question-card__button--true': isAnswered && $root.gameData.questions[id].answers[index].correct,
                    'question-card__button--false': selected == index && isAnswered && !$root.gameData.questions[id].answers[index].correct
                }" 
                :disabled="isAnswered"
                >{{ answer.answer }}</button>
                <br>
            </div>
        </div>
        <div class="question-card__quit"
            @click="quitGame();">
            <i class="fas fa-times-circle"></i>
        </div>
    </div>
    
</template>

<script>
    //TODO: Replace the vue-bound animation with the webanimate api
    
    export default {
        data: function() {
            return {
                selected: null,
                isAnswered: false,
                questionInterval: '',
                questionTime: 0
            }
        },
        computed: {
            // Triggers the CSS animations necessary to show the question
            isActive() {
                return this.$root.gameData.gameState.activeQuestion >= this.id;
            },

            //Calculates the width of the progressbar
            questionTimeBar() {
                let calc = (this.questionTime/this.$root.questionSpeed) * 100;
                return calc + '%';
            }
        },
        watch: {
            // Starts the game timer once the question is active.
            isActive: function(activeVal) {
                if(activeVal === true && this.questionInterval == '') {
                    setTimeout(() => {
                        this.startTimer();
                    }, 1000); // 1000ms delay to account for CSS animations
                }
            },

            // If the timer expires we gotta kill it before we invalidate the question
            questionTime: function(timeVal) {
                if(timeVal >= this.$root.questionSpeed) {
                    clearInterval(this.questionInterval);
                    this.answerQuestion(null);
                }
            }
        },
        props: {
            id: Number,
            question: String,
            answers: Array
        },
        methods: {
            answerQuestion: function(index) {
                
                this.isAnswered = true;
                
                //if an index was provided then the user selected an answer (instead of being timed out)
                if(index !== null) {
                    clearInterval(this.questionInterval); //Kill the timer
                    this.selected = index; //Log the answer the user picked
                    if(this.$root.gameData.questions[this.id].answers[index].correct) {
                        this.$root.gameData.gameState.correct++; //Calculate whether the answer was correct and incriment score if appropriate
                    }
                }

                //If there's more questions to go incriment the activeQuestion to trigger next one
                if(this.id < this.$root.gameData.meta.questions -1 ) {
                    this.$root.gameData.gameState.activeQuestion++;
                }

                //Otherwise go to the endgame screen
                else {
                    this.$root.gameData.gameState.completed = true;
                }
            },

            // Kill the timer and reset the game data to kill the current game
            quitGame: function() {
                clearInterval(this.questionInterval);
                this.$root.resetGame();
            },

            // Incriment timer every 50ms until the watcher kills it or question is answered
            startTimer: function() {
                this.questionInterval = setInterval(() => {
                    this.questionTime = this.questionTime +50;
                }, 50);
            }
        }
    }
</script>