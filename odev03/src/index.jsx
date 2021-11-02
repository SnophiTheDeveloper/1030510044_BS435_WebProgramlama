import React from "react";
import ReactDOM from "react-dom";
import cat from "../public/imgs/cat.jpg"; //Added modules in webpack.config.js for load images
import dog from "../public/imgs/dog.jpg";

class App extends React.Component{
    constructor(props) {
        
        super(props);
        this.state = {
            flag: 0,
            corr: 0,
            images: this.shuffle(),
            string: <div className="mesaj"> 
                    <p>Kedi kartını bulmak için kartın üzerine tıklamalısın.</p> 
                    </div>
        };
}

//fonksiyonlar
findCat(e) {
    e.target.setAttribute( 'src', this.state.images[e.target.id]);
    this.ifClick(this.state.images[e.target.id]==cat);
    }

refreshPage()
{
    window.location.reload();
    
}

shuffle() {
    const imgs=[cat,dog,dog];
    var j, x, i;
    for (i = imgs.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = imgs[i];
        imgs[i] = imgs[j];
        imgs[j] = x;
    }
    return imgs
}

ifClick = (correct) => {
    if(correct && (this.state.flag!=2)){
        {this.setState({string: <div className="mesaj"> 
                                <p >Tebrikler! Oyunu kazandınız. Tekrar oyun oynamak için <span className="link" onClick={this.refreshPage}>buraya </span> tıklayabilirsiniz</p> 
                                </div>})
        this.setState({corr:1})
    }
}
    else
    {   
        this.state.flag++;
        if(this.state.flag==2 && this.state.corr==0){
        this.setState({string:  <div className="mesaj"> 
                                <p>Üzgünüm! Oyunu kaybettiniz. Tekrar oyun oynamak için <span className='link' onClick={this.refreshPage}> buraya </span> tıklayabilirsiniz</p> 
                                </div> });}
    }
}


getcat()
{       
        return [<img className="kart" id="0" onClick={(e)=>this.findCat(e)} />,
                <img className="kart" id="1" onClick={(e)=>this.findCat(e)} />,
                <img className="kart" id="2" onClick={(e)=>this.findCat(e)} />];
}
render(){

return (
    <div>
    {this.getcat()}
    {this.state.string}
    </div>
);
}
}
ReactDOM.render(<App />,document.getElementById("root"));