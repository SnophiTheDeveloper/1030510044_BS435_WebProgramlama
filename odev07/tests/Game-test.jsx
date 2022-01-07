import React from 'react';
import { mount } from 'enzyme';
import { Game } from '../src/client/Game';

const checkCardsAreDisplayed = (driver) => {
    const cards = driver.find('.kart');
    expect(cards).toBeDefined();
}

test("test oluşturuldu", () => {
    const driver = mount(<Game />);
    checkCardsAreDisplayed(driver);
});

const tiklama=(driver)=>{
    var j=[0,1,2];
    for(let i=0;i<2;i++)
    {   
        var sayi = j[Math.floor(Math.random()*j.length)];
        var card = driver.find('.kart').at(sayi);
        card.simulate('click');

        card = driver.find('.kart').at(sayi);
        var srcName=card.find('img').prop('src');

        j.splice(sayi,1);

        if(srcName==='imgs/cat.jpg')
            {  
                return 1;
            }
        else{
            if(i==1 && srcName==='imgs/dog.jpg')
            {
                return 0;
            }
        }

    }

}

test("50 Oyun testi", () => {
    let driver = mount(<Game />);
    for(let i=0;i<50;i++)
    {  
        expect(driver.html().includes("2 Hakkınız kaldı")).toBeTruthy();
        
        if(tiklama(driver)==1)
        {   
            checkCardsAreDisplayed(driver);
            expect(driver.html().includes("Kazandın!")).toBeTruthy();
        }
        else
        {
            checkCardsAreDisplayed(driver);
            expect(driver.html().includes("Kaybettin")).toBeTruthy();
        }
        
            driver.find("button").simulate("click");
    }
});