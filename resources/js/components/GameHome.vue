<template>
    <div class="home">
        <div>
            <header class="home-header">
                <div class="home-header__content">
                    <i class="fas fa-info-circle home-header__about"></i>
                    <h1><span class="text--smaller">SPEED</span></h1>
                    <h1>TRIVIA</h1>
                </div>
            </header>
            <main class="home-content">
                <h2 class="h3">Category</h2>
                <ul class="categories">
                    <li v-for="(c, i) in $root.categories"
                    :key="i"
                    @click="$root.category = i"
                    :class="{
                        'active': $root.category == i
                    }">
                        {{ c.name }}
                    </li>
                </ul>
                <br>
                <button
                class="button arrow-right"
                @click="startTheGame()"
            >
                Start The Game!
            </button>
            </main>
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
            this.$root.newGame(this.$root.categories[this.$root.category].endpoint).then(() => {
                this.started = true;
                window.setTimeout(() => {
                    this.$root.gameData.gameState.active = true;
                }, 500)
                window.setTimeout(() => {
                    this.started = false;
                }, 1500)
            });
        }
    }
}
</script>