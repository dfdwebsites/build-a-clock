import { useEffect, useState } from 'react';

// https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3
// https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3
// https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3
// https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3
// https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3
// https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3
// https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3
// https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3
// https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3

const keyDownHander = (e) => {
  switch (e.code) {
    case 'KeyQ':
      document.getElementById(buttons[0].id).click();
      break;
    case 'KeyW':
      document.getElementById(buttons[1].id).click();
      break;
    case 'KeyE':
      document.getElementById(buttons[2].id).click();
      break;
    case 'KeyA':
      document.getElementById(buttons[3].id).click();
      break;
    case 'KeyS':
      document.getElementById(buttons[4].id).click();
      break;
    case 'KeyD':
      document.getElementById(buttons[5].id).click();
      break;
    case 'KeyZ':
      document.getElementById(buttons[6].id).click();
      break;
    case 'KeyX':
      document.getElementById(buttons[7].id).click();
      break;
    case 'KeyC':
      document.getElementById(buttons[8].id).click();
      break;

    default:
      break;
  }
};
const buttons = [
  {
    id: 'Heater-1',
    name: 'q',
    sound: '1'
  },
  {
    id: 'Heater-2',
    name: 'w',
    sound: '2'
  },
  {
    id: 'Heater-3',
    name: 'e',
    sound: '2'
  },
  {
    id: 'Heater-4_1',
    name: 'a',
    sound: '2'
  },
  {
    id: 'Heater-6',
    name: 's',
    sound: '2'
  },
  {
    id: 'Dsc_Oh',
    name: 'd',
    sound: '2'
  },
  {
    id: 'Kick_n_Hat',
    name: 'z',
    sound: '2'
  },
  {
    id: 'RP4_KICK_1',
    name: 'x',
    sound: '2'
  },
  {
    id: 'Cev_H2',
    name: 'c',
    sound: '2'
  }
];
function App() {
  const [soundDisplay, setSoundDisplay] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', keyDownHander);

    return () => {
      document.removeEventListener('keydown', keyDownHander);
    };
  }, []);

  const handleClick = (e, b) => {
    e.target.style.backgroundColor = 'orange';
    const sound = document.getElementById(b.name.toUpperCase());
    sound.currentTime = 0;
    sound.play();
    setSoundDisplay(b.id.replace(/-/g, ' '));
    setTimeout(() => (e.target.style.backgroundColor = 'lightgray'), 100);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ paddingTop: '20vh' }}
    >
      <div id="drum-machine" className="d-flex">
        <div className="d-flex flex-wrap">
          {buttons.map((b, i) => (
            <button
              style={{
                flex: '0 0 30%',
                aspectRatio: '1/1',
                margin: '0.1rem',
                backgroundColor: 'lightgray'
              }}
              key={i}
              id={b.id}
              className="drum-pad"
              onClick={(e) => handleClick(e, b)}
            >
              <audio
                className="clip"
                id={b.name.toUpperCase()}
                src={`https://s3.amazonaws.com/freecodecamp/drums/${b.id}.mp3`}
              />
              {b.name.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <p
            style={{
              textAlign: 'center',
              minWidth: '100px',
              border: '1px solid black',
              padding: '5px'
            }}
            id="display"
          >
            {soundDisplay}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
