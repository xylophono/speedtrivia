<template>
    <div
        class="question-card"
        :class="{
        'question-card--active': isActive,
        'question-card--answered': isAnswered
        }">

        <div class="question-progress" :ref="'questionProgress'+this.id"></div>

        <div class="question-card__content">
            
            <div class="question-card__logo">
                <div>
                    <div class="logo logo--pink">
                        <p><span class="text--smaller">SPEED</span></p>
                        <p>TRIVIA</p>
                    </div>
                    
                    <div class="question-card__quit"
                        @click="quitGame();">
                        <i class="fas fa-times-circle"></i>
                    </div>
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
        <div class="question-card__result"
            v-if="isAnswered">
            <i class="far"
                :class="{
                    'fa-check-circle': isCorrect,
                    'text--green': isCorrect,
                    'fa-times-circle': !isCorrect,
                    'text--red': !isCorrect
                }"></i>
        </div>
    </div>
    
</template>

<script>    
    export default {
        data: function() {
            return {
                selected: null,
                isAnswered: false,
                isCorrect: false,
                questionTimerAnimation: '',
                questionTimerTimeout: ''
            }
        },
        computed: {
            // Triggers the CSS animations necessary to show the question
            isActive() {
                return this.$root.gameData.gameState.activeQuestion >= this.id;
            },

        },
        watch: {
            // Starts the game timer once the question is active.
            isActive: function(activeVal) {
                if(activeVal === true && this.questionTimerAnimation == '') {
                    setTimeout(() => {
                        this.startTimerAnimation();
                    }, 1000); // 1000ms delay to account for CSS animations
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
                this.questionTimerAnimation.pause();
                clearTimeout(this.questionTimerTimeout);
                
                //if an index was provided then the user selected an answer (instead of being timed out)
                if(index !== null) {
                    this.selected = index; //Log the answer the user picked
                    if(this.$root.gameData.questions[this.id].answers[index].correct) {
                        this.$root.gameData.gameState.correct++; //Calculate whether the answer was correct and incriment score if appropriate
                        this.isCorrect = true;
                        this.$root.playAudio('correct');
                    }
                    else { this.$root.playAudio('incorrect'); }
                }
                else { this.$root.playAudio('incorrect'); }

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
                clearTimeout(this.questionTimerTimeout);
                this.$root.resetGame();
            },

            // Create a webanimation to animate the progress bar, create a timeout to autoanswer the question is the time limit is breached
            startTimerAnimation: function() {
                this.questionTimerAnimation = this.$refs['questionProgress'+this.id].animate({
                    width: [0, '100%']
                }, {
                    duration: this.$root.questionSpeed,
                    iterations: 1
                });

                this.questionTimerTimeout = setTimeout(() => {
                    this.answerQuestion(null);
                }, this.$root.questionSpeed)
            }
        }
    }
</script>