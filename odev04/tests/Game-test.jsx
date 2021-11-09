import React from 'react';
import { mount } from 'enzyme';
import { Game } from '../src/Game';

const checkCardsAreDisplayed = (driver) =>{
    const cards = driver.find('.kart');
    expect(cards).toBeDefined();
}

test("test oluşturuldu",()=>{
    const driver = mount(<Game/>);
    checkCardsAreDisplayed(driver);
});

test("Tıklama Testi",()=>{

    let driver = mount(<Game/>);
    for(let i=0; i<50; i++)
    { 
        tiklama(driver);
        var mesaj=driver.find(".mesaj");
        var link = mesaj.find("span");
        expect(link).toBeDefined();
        link.simulate('click'); //link clicking window.location.reload() Error: Not implemented: navigation (except hash changes)
        driver = mount(<Game/>);
    }

});

const tiklama= (driver)=>{
    let kart= driver.find(".kart");
    
    for(let i=0; i<3; i++)
    {   
        kart.at(i).simulate('click');
    }
    
};

test("CheckMesaj", ()=>{

    let driver = mount(<Game/>);
    var beforeMesaj = driver.find('.mesaj');
    tiklama(driver);
    var afterMesaj = driver.find('.mesaj');
    expect(beforeMesaj!=afterMesaj).toBeTruthy();  
    
});
