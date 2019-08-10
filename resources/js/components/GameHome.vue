<template>
    <div class="home">
        <div>
            
            <header class="home-header">
                <div class="home-header__content">
                    <i class="fas fa-info-circle home-header__about" @click="about = !about"></i>
                    <div class="logo">
                        <p><span class="text--smaller">SPEED</span></p>
                        <p>TRIVIA</p>
                    </div>
                </div>
            </header>

            <main class="home-content">
                
                <h2 class="h3">Category</h2>
                <ul class="categories">
                    <li v-for="(c, i) in $root.categories"
                    :key="i"
                    @click="$root.changeSetting('category', i)"
                    :class="{
                        'active': $root.category == i
                    }">
                        {{ c.name }}
                    </li>
                </ul>

                <h2 class="h3">Speed</h2>
                <ul class="categories">
                    <li v-for="(s, i) in $root.speeds"
                    :key="i"
                    @click="$root.changeSetting('questionSpeed', s.duration)"
                    :class="{
                        'active': $root.questionSpeed == s.duration
                    }">
                        {{ s.name }}
                    </li>
                </ul>

                <br>
                
                <button
                class="button arrow-right text--heading"
                @click="startTheGame()"
                :disabled="started"
            >
                Start The Game!
            </button>

            </main>
        </div>

        <!-- Splash Card -->
        <div
            v-if="started"
            class="question-card question-card--no-delay gradient--green"
            :class="{
                'question-card--active': started
            }">

            <div class="question-card__content">

                <div class="question-card__logo">
                    <div>
                        <div class="logo">
                            <p><span class="text--smaller">SPEED</span></p>
                            <p>TRIVIA</p>
                        </div>
                    </div>
                </div>

                <div class="splash-content"
                    :class="{
                        'splash-content--animate': started
                    }">
                    <p v-for="(text, i) in splashText"
                        :key="i"
                        :class="'splash-content__' + i">
                        {{ text}}
                        </p>
                    
                </div>
            </div>

        </div>

        <!-- About Section -->

        <div
            v-if="about"
            class="question-card question-card--no-delay"
            :class="{
                'question-card--active': about
            }">

            <div class="question-card__content">

                <div class="question-card__logo">
                    <div>
                        <div class="logo logo--pink">
                            <p><span class="text--smaller">SPEED</span></p>
                            <p>TRIVIA</p>
                        </div>
                    </div>
                    
                    <div class="question-card__quit"
                        @click="about = !about">
                        <i class="fas fa-times-circle"></i>
                    </div>
                </div>

                <div class="text--left">
                    <h1 class="h3">About SpeedTrivia</h1>
                    <br>
                    <p>SpeedTrivia is a VueJS trivia game powered by the <a href="https://opentdb.com/" title="Open Trivia Database" target="_blank">Open Trivia Database</a> API.</p>
                    <br>
                    <p>SpeedTrivia uses local storage / cookies to save your settings. SpeedTrivia makes use of the <a href="https://opentdb.com/" title="Open Trivia Database" target="_blank">Open Trivia Database</a> and <a href="https://fonts.adobe.com" title="Adobe Fonts" target="_blank">Adobe Fonts</a> who may have their own privacy policies. SpeedTrivia does not use an external analytics service.</p>
                    <br>
                    <p>You can view the SpeedTrivia code on <a href="https://github.com/xylophono/speedtrivia" title="Github" target="_blank">Github</a></p>
                    <br>
                    <p>SpeedTrivia is a <a href="https://www.xylophono.com/" title="xylophono" target="_blank">xylophono</a> project =)</p>
                </div>
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
            about: false,
            started: false,
            splashTextArray: [
                'Here we go',
                'Lets do this',
                'Flex your thumbs',
                'Take a breath',
                'Clear your mind',
                "Trust your gut",
                "You got this",
                "Ready set go"
            ],
            splashTextKey: 0
        }
    },

    computed: {
        splashText: function() {
            return this.splashTextArray[this.splashTextKey].split(' ');
        }
    },

    methods: {
        // Starts the game. Timings are largely based on associated CSS animations
        startTheGame: function() {
            this.$root.newGame(this.$root.categories[this.$root.category].endpoint).then(() => {
                this.splashTextKey = Math.floor(Math.random() * this.splashTextArray.length); // Grab random text for splash screen
                this.started = true; // tracking local to this component for splash screen
                setTimeout(() => {
                    this.$root.gameData.gameState.active = true; // This actually starts the game
                }, 1250);
                setTimeout(() => {
                    this.$root.gameData.gameState.activeQuestion++; // We have to incriment this just after else the first timer doesn't trigger
                }, 1251);
                setTimeout(() => {
                    this.started = false; // This just kills off the splash screen once the first question is visible
                }, 2251);
            });
        }
    }
}
</script>