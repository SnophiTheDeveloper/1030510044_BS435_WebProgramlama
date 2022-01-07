import React from "react";
import { withRouter } from "react-router";
export class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: null,
            game: null
        }
    }

    componentDidMount() {
        this.fetchCurrentGame();
    }

    fetchCurrentGame = async () => {
    const url = "/api/games/ongoing";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({ errorMsg: "Sunucu bağlantısında hata: " + err });
            return;
        }

        if (response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if (response.status === 404) {
            await this.startNewGame();
            return;
        }

        if (response.status !== 200) {
            this.setState({
                errorMsg: "Sunucu bağlantısında hata. Hata kodu: " + response.status
            });
            return;
        }

        const game = await response.json();
        this.setState({ game: game, errorMsg: null });
    };

    startNewGame = async () => {
        const url = "/api/games";

        let response;

        try {
            response = await fetch(url, {
                method: "post"
            });
        } catch (err) {
            this.setState({ errorMsg: "Sunucu bağlantısında hata: " + err });
            return;
        }

        if (response.status === 401) {
            this.props.updateLoggedInUser(null);
            this.props.history.push("/");
            return;
        }

        if (response.status !== 201) {
            this.setState({
                errorMsg: "Sunucu bağlantısında hata. Hata kodu: " + response.status
            });
            return;
        }

        const game = await response.json();
        this.setState({ game: game, errorMsg: null });
    };


    answer = (index) => {
        this.doAnswer(this.state.game.images[index],index)

        
    };

doAnswer = async (answerindex,index) => {   
    const url = "/api/games/ongoing";

    let response;

    try {
        response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ answerIndex: answerindex,
                                    index:index})
        });
    } catch (err) {
        this.setState({ errorMsg: "Sunucu bağlantısında hata: " + err });
        return;
    }

    if (response.status === 401) {
        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
        return;
    }

    if (response.status !== 201) {
        this.setState({
            errorMsg: "Sunucu bağlantısında hata. Durum kodu: " + response.status
        });
        return;
    }

    const game = await response.json();
    this.setState({ game: game, errorMsg: null });

    if (game.victory || game.defeat) {
        await this.props.fetchAndUpdateUserInfo();
    }
};

render(){
    const game = this.state.game;

    if(!this.state.game){
        return <h2>Yükleniyor...</h2>}
    
    if (this.state.errorMsg) {
        return <h2>HATA: {this.state.errorMsg}</h2>;
    }

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
    <img className="kart" src={game.bg[0]} onClick={()=>this.answer(0)} />
    <img className="kart" src={game.bg[1]} onClick={()=>this.answer(1)} />
    <img className="kart" src={game.bg[2]} onClick={()=>this.answer(2)} />
    </div>
);
    }
}

export default withRouter(Game);