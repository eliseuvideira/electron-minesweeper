import React from 'react';
import BoardArea from './Components/BoardArea';
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <BoardArea rows={25} columns={30} />
    </div>
  );
}

export default App;
