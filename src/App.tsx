import { useEffect, useState } from 'react';
import { letters } from './helpers/letters';
import { HangImage } from './components/Hanglmage';
import { getRandomWord } from './helpers/getRandomWords';
import Swal from 'sweetalert2';
import './App.css';




function App() {

  const [ word, setWord ] = useState(getRandomWord());
  const [ hiddenWord, setHiddenWord ] = useState('_ '.repeat( word.length ));
  const [ attempts, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState( false );
  const [ won, setWon ] = useState( false );

  // Determinar si la persona perdió
  useEffect( () => {
    if( attempts >= 9 ) {
      setLose(true);
      Swal.fire({
        title: 'YOU LOST!',
        width: 505,
        padding: '4em',
        color: '#716add',
        background: '#353935',
        imageUrl: 'https://media.giphy.com/media/B4uP3h97Hi2UaqS0E3/giphy.gif'
      })
    }
  }, [ attempts]); // hooks

  // Determinar si la persona ganó
  useEffect( () => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if( currentHiddenWord === word ) {
      setWon(true);
      Swal.fire({
        title: 'YOU WON!',
        width: 505,
        padding: '5em',
        color: '#716add',
        background: '#353935',
        imageUrl: 'https://media.giphy.com/media/o75ajIFH0QnQC3nCeD/giphy.gif'
      })
      } 
    }, [ hiddenWord ])

  const checkLetter = ( letter: string ) => {
      if ( lose ) return;
      if ( won) return;
    if ( !word.includes(letter)) {
      setAttempts( Math.min( attempts + 1, 9));
      return;
    } 

    const hiddenWordArray = hiddenWord.split(' ');

    for( let i = 0; i < word.length; i++) {
      if( word[i] === letter ) {
          hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord( hiddenWordArray.join(' '));
  }

  const newGame = () => {
    const newWord = getRandomWord();

    setWord( newWord);
    setHiddenWord('_ '.repeat( newWord.length ));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }



  return (
    <div className="App">
      

      {/* Imágenes */}
      <HangImage imageNumber={ attempts } />

      {/* Palabra Oculta */}
        <h3>{ hiddenWord }</h3>

      {/* Contador de Intentos */}
      <h3>Intentos: { attempts }</h3>

      {/* Mensaje si perdió */}
      {
        ( lose ) ? <h2>Perdió la palabra era: { word }! </h2>  : ''
      }

      {/* Mensaje si ganó */}
      {
        ( won ) ? <h2>Felicidades, usted Ganó!</h2> : ''
      }

      {/* Botones de letras */}
      {
        letters.map( (letter) => (
          <button
          onClick={ () => checkLetter(letter) }
          key={ letter }>
            { letter }
          </button>
        ))
      }
    
      <br /><br />
      <button className="boton cuatro" onClick={ newGame } ><span>¿Nuevo Juego?</span></button>


    </div>
  );
  
};

export default App;
