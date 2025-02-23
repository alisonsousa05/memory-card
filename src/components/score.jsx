import '../styles/score.css'


export default function Score({currentScore, maxScore}){
    return(
        <div className='score orbitronFont'>
            <p>Score:{currentScore}</p> 
            <p>Max Score:{maxScore}</p>
        </div>
    )
}