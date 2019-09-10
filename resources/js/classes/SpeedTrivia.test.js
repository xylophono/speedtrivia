import SpeedTrivia from './SpeedTrivia.js';
let game = new SpeedTrivia;

test('game is instance of SpeedTrivia', () => {
    expect(game).toBeInstanceOf(SpeedTrivia);
});

test('game is populated with default settings', () => {
    expect(game).toHaveProperty('questions');
    expect(game).toHaveProperty('endpoint');
    expect(game).toHaveProperty('categories');
    expect(game).toHaveProperty('speeds');
});

test('getCategories() returns array of catagory objects', () => {
    let categories = game.getCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty('name');
    expect(categories[0]).toHaveProperty('endpoint');
});

test('getSpeeds() returns array of speed objects', () => {
    let speeds = game.getSpeeds();
    expect(speeds.length).toBeGreaterThan(0);
    expect(speeds[0]).toHaveProperty('name');
    expect(speeds[0]).toHaveProperty('duration');
});

test('clearGameData() returns a defauilt set of gameData', () => {
    let data = game.clearGameData();
    expect(data).toHaveProperty('questions', []);
    expect(data).toHaveProperty('meta', {
        'category': '',
        'questions': null
    });
    expect(data).toHaveProperty('gameState', {
        active: false,
        completed: false,
        activeQuestion: -1,
        correct: 0
    });
});