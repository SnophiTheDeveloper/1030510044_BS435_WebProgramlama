import React from "react";
import cat from '../public/imgs/cat.jpg'; //Added modules in webpack.config.js for load images
import dog from '../public/imgs/dog.jpg';

export class Game extends React.Component{
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
findCat(e,eventid) {
    e.target.setAttribute( 'src', this.state.images[eventid]);
    this.ifClick(this.state.images[eventid]=="imgs/cat.jpg");
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

ifClick = (correct) => {
    if(correct && (this.state.flag!=2)){
        {this.setState({string: <div className="mesaj"> 
                                <p >Tebrikler! Oyunu kazandınız. Tekrar oyun oynamak için <span className="link" onClick={()=>window.location.reload()}>buraya</span> tıklayabilirsiniz</p> 
                                </div>})
        this.setState({corr:1})
    }
}
    else
    {   
        this.state.flag++;
        if(this.state.flag==2 && this.state.corr==0){
        this.setState({string:  <div className="mesaj"> 
                                <p>Üzgünüm! Oyunu kaybettiniz. Tekrar oyun oynamak için <span className='link' onClick={()=>window.location.reload()}> buraya</span> tıklayabilirsiniz</p> 
                                </div> });}
    }
}

render(){

return (
    <>

    <img className="kart" onClick={(e)=>this.findCat(e,0)} />
    <img className="kart" onClick={(e)=>this.findCat(e,1)} />
    <img className="kart" onClick={(e)=>this.findCat(e,2)} />
    
    {this.state.string}
    </>
);
}
}
