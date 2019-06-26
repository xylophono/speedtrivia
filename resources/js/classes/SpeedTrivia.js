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
    getQuestions() {
        axios.get(this.endpoint, {
            params: {
                amount: this.questions,
                category: 9
            }
        })
        .then((response)=>{
            if(response.status !== 200 || response.data.response_code !== 0) {
                return false;
            }

            console.log(response.data.results);
        })
        .catch((err)=>{
            return false;
        });
    }
}