import React from "react";

export class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            game: null
        }
    }

    componentDidMount() {
        this.startNewGame();
    }

    startNewGame = () => {
        var bg = ['imgs/background.png','imgs/background.png','imgs/background.png'];
        const images=this.shuffle();
        this.setState({
            game:{
                hak:2,
                images,
                bg
            }
        })
    }

findCat(eventid) {
    const game=this.state.game;
    var newCard = game.bg;
    newCard[eventid] = game.images[eventid];
    

    if(game.images[eventid]=="imgs/cat.jpg"){
        this.setState(prev=>({game:{
            victory:true,
            images: this.state.game.images}
        }))
    }
    else
    {
        this.setState(prev=>({
                game:{
                    bg:newCard,
                    hak:game.hak-1,
                    images: prev.game.images
                }
        }))
        if(game.hak==1)
        {this.setState(prev=>({game:{
            defeat:true,
            images: prev.game.images}
        }))
        }
        }
    }

shuffle() {
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

render(){
    const game = this.state.game;

    if(!this.state.game){
        return <h2>Yükleniyor...</h2>}

    if(game.victory){
        return (
            <>
            <div className="game-result">
                <h2>Kazandın!</h2>
                </div>
                <img className="kart" src={game.images[0]} />
                <img className="kart" src={game.images[1]} />
                <img className="kart" src={game.images[2]} />
                <div className="action">
                    <button className="play new-game-button" onClick={()=>this.startNewGame()}>Yeni Oyun</button>
                </div>
                </>
        );
    }

    if(game.defeat)
    {
        return (
            <>
            <div className="game-result">
                <h2>Kaybettin :( Kediyi seçmen gerekiyordu.</h2>
                </div>
                <img className="kart" src={game.images[0]} />
                <img className="kart" src={game.images[1]} />
                <img className="kart" src={game.images[2]} />
                <div className="action">
                    <button className="play new-game-button" onClick={()=>this.startNewGame()}>Yeni Oyun</button>
                </div>
                </>
        );
    }

return (
    <div>
    <div className="game-result"><h2>{game.hak} Hakkınız kaldı</h2></div>
    <img className="kart" src={game.bg[0]} onClick={()=>this.findCat(0)} />
    <img className="kart" src={game.bg[1]} onClick={()=>this.findCat(1)} />
    <img className="kart" src={game.bg[2]} onClick={()=>this.findCat(2)} />
    </div>
);
    }
}
