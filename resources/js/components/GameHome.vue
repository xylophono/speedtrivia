<template>
    <div class="home">
        <h1>SPEED<br>TRIVIA</h1>
        <br>
        <p>8 Questions. 8 Seconds each. Ready?</p>
        <br>
        <button
            @click="startTheGame()"
        >
            Start The Game!
        </button>
    </div>
</template>

<script>
export default {
    components: {
    },

    data: function() {
        return {
        }
    },

    methods: {
        startTheGame: function() {
            this.$root.newGame();
            window.setTimeout(() => {
                this.$root.gameData.gameState.active = true;
            }, 1000)
        }
    }
}
</script>