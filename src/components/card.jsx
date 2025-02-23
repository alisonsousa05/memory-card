import { useState, useEffect } from 'react'
import '../styles/card.css'
import '../styles/score.css'


export default function Card({ pokemonCard, index, onclick, shuffle, lostTrigger, checkWin, resetArray, currentWin}){
    const [imageUrl, setImageUrl] = useState('');
    // if(columnStart>4){
    //     columnStart -=3;
    // }
    const checkWinArray = function(){
        if(currentWin==true){
            checkWin(false);
        }
        for (let pokemon of pokemonCard) {
            if (pokemon.click === false) {
                console.log("AQUI");  
                return;            
            }
        }
        console.log("na verdade aqui")
        checkWin(true);
        resetArray([]);     
    }

    useEffect(() =>{
        const url = pokemonCard[index].url;
        fetch(url)
        .then(response => response.json())
        .then(function(response){
            setImageUrl(response.sprites.front_default)
        })
    }, [])
    return(
        <div className='card' onClick={() =>{
            if(pokemonCard[index].click===true){
                onclick(true);
                lostTrigger(true);
                return;
            }
            onclick();
            pokemonCard[index].click = true;
            checkWinArray();
            shuffle();
            }}>
            {imageUrl?<img src={imageUrl} height={150}/> : null}
            <p className='orbitronFont cardText'>{pokemonCard[index].name}</p>
        </div>
    )

}