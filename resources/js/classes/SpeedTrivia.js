const axios = require('axios');

export default class {
    constructor() {
        this.endpoint = 'https://opentdb.com/api.php';
        this.questions = 8;
        this.categories = [{
            name: 'General Knowledge',
            endpoint: 9
        }];
    }

    // Create a new game
    newGame() {
        axios.get(this.endpoint, {
            params: {
                amount: this.questions,
                category: 9
            }
        })
        .then((response)=>{
            console.log(response.data.results);
        })
        .catch((err)=>{
            return false;
        });
    }
}