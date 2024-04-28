
import './App.css'
import Calculator from './components/Calculator'
import Pomodoro from './components/Pomodoro'
import '@fontsource-variable/pixelify-sans';
import '@fontsource/dseg7-classic-mini';
import '@fontsource/patrick-hand';
import TodoApp from './components/TodoApp';

function App() {

  return (
    <>
      <div className='main-container'>
        <Calculator />
        <Pomodoro />
        <TodoApp />
      </div>
      <div className='credits'>
        <a href="https://www.github.com/ssanjua" target='_blank'>
          <h3>made with ❤️ by
            ssanjua
          </h3>
        </a>
      </div>

    </>

  )
}

export default App
