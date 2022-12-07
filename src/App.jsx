import Game from "./Game";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center flex-col py-8 font-balsamic">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">Tic-Tac-Toe</h1>
      <Game />
    </div>
  );
}

export default App;
