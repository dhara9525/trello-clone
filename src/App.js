import './App.css';
import Header from './components/header/Header';
import Board from './components/board/Board'
import data from './mocks/data.json';

function App() {
    const currentBoard = data[0];
    console.log(data[0])

    return (
        <div className="App">
            <Header/>

            <div className="body">
                <Board board={currentBoard}/>
            </div>
        </div>
    );
}

export default App;
