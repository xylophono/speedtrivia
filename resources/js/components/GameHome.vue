<template>
    <div class="home">
        <div>
            <h1>SPEED<br><span class="text--pink">TRIVIA</span></h1>
            <br>
            <br>
            <button
                class="button"
                @click="startTheGame()"
            >
                Start The Game!
            </button>
        </div>

        <div
            class="question-card question-card--no-delay gradient--green"
            :class="{
                'question-card--active': started
            }">

            <div class="question-card__content text--white">
                <h1 style="font-size: 6rem;">
                    HERE<br>
                    WE<br>
                    GO
                </h1>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    components: {
    },

    data: function() {
        return {
            started: false
        }
    },

    methods: {
        startTheGame: function() {
            this.$root.newGame();
            this.started = true;
            window.setTimeout(() => {
                this.$root.gameData.gameState.active = true;
            }, 500)
            window.setTimeout(() => {
                this.started = false;
            }, 2500)
        }
    }
}
</script>