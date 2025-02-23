import '../styles/mainBody.css'
import { useState, useEffect } from 'react'
import Card from './card'
import Score from './score';
import LostPopUp from './lostPopUp';

export default function MainBody(){
    const [currentScore, setCurrentScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [pokemonArray, setPokemonArray] = useState([]);
    const [pokemonSelected, setPokemonSelected] = useState([]);
    const [shuffle, setShuffle] = useState(false);
    const [lostTrigger, setLostTrigger] = useState(false);
    const [win, setWin] = useState(false)

    function shuffleArray(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function handleScore(clicked=false){
        if (clicked){
            setCurrentScore(0);
        }
        else{
            setCurrentScore((current) => current+1);
            if(currentScore >= maxScore){
                setMaxScore((current) => current+1);
            }
        }
    }

    function handleShuffle(){
        setShuffle(!shuffle);
    }


    useEffect(() => {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        fetch(url)
        .then(response => response.json())
        .then(function(response) {
        setPokemonArray(response.results)
        });

    }, [])
    useEffect(() => {
        if(pokemonSelected.length === 0 && (!lostTrigger || win)){
            if (pokemonArray.length > 0) {
            const selected = [];
            while (selected.length < 6) {
                let randomPokemon = pokemonArray[Math.floor(Math.random() * pokemonArray.length)];
                randomPokemon = {...randomPokemon, click:false};
                if (!selected.includes(randomPokemon)) {
                selected.push(randomPokemon);
                }
            }
            setPokemonSelected(selected);
            }
        }
      }, [pokemonArray, lostTrigger, win]);
    // useEffect(() => {
    //     if (pokemonArray.length > 0) {
    //       while (pokemonSelected.length < 6) {
    //         const newPokemon = pokemonArray[Math.floor(Math.random() * pokemonArray.length)];
    //         if (pokemonSelected.includes(newPokemon) === false){
    //             setPokemonSelected([...pokemonSelected, newPokemon])
    //         }
    //       }
    //     }
    //   }, [pokemonArray]);
    // // console.log(pokemonSelected)
    console.log(pokemonSelected)

    return(
    <div className='mainBody'>
        <Score currentScore={currentScore} maxScore={maxScore}/> 
        <LostPopUp trigger={lostTrigger} setTrigger={setLostTrigger} resetArray={setPokemonSelected} />
        {/* {(() =>{
            if(shuffle){
                shuffleArray(pokemonSelected);
                handleShuffle();
                pokemonSelected.map((pokemon, index) =>{
                    return <Card pokemonCard={pokemon} key={pokemon.name} columnStart={index+2} onclick={handleScore} shuffle={handleShuffle}/>
            })
        }
            else{
                pokemonSelected.map((pokemon, index) =>{
                    console.log(pokemon);
                    return <Card pokemonCard={pokemon} key={pokemon.name} columnStart={index+2} onclick={handleScore} shuffle={handleShuffle} />
        })
        }
        })()
        } */}

    {(() => {
      if (shuffle) {
        shuffleArray(pokemonSelected);
        handleShuffle();
      }
      return pokemonSelected.map((pokemon, index) => (
        <Card
          pokemonCard={pokemonSelected}
          key={pokemon.name}
          index={index}
          onclick={handleScore}
          shuffle={handleShuffle}
          lostTrigger={setLostTrigger}
          checkWin = {setWin}
          currentWin = {win}
          resetArray={setPokemonSelected}
        />
      ));
    })()}
    </div>
    )
}