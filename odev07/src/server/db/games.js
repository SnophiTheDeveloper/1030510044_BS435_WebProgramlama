const {reportEndOfMatch} = require("./users");

const games = new Map();

let counter = 0;


function createGame(userId) {
    
    var bg = ['imgs/background.png','imgs/background.png','imgs/background.png'];
    
    const images= shuffle();
    
    const game = {
        hak: 2,
        bg,
        images,
        victory: false,
        defeat: false
    };

    games.set(userId, game);

    return game;
}

function  shuffle() {
        const imgs=['imgs/cat.jpg','imgs/dog.jpg','imgs/dog.jpg'];
        var j, x, i;
        for (i = imgs.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = imgs[i];
            imgs[i] = imgs[j];
            imgs[j] = x;
        }
        return imgs
    }

    function getGame(userId) {
        return games.get(userId);
    }
    
    function removeGame(userId){
        games.delete(userId);
    }

    module.exports = {getGame,createGame,removeGame};