import '../styles/mainBody.css'
import '../styles/lostPopUp.css'


export default function LostPopUp({ trigger, setTrigger, resetArray }) {

    return(

        trigger?(
        <div className='popUp'>

            <div className='popUpBox'>
                <span className='orbitronFont'>você perdeu ate uma proxima otario kkkkk</span>

                <button className='resetButton orbitronFont' onClick={() =>{
                    setTrigger(false)
                    resetArray([])}}>Reiniciar</button>
            </div>

        </div>):null

    )
}
