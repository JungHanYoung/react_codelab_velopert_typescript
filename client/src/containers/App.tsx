import * as React from 'react';
import './App.css';

// import components
import { Header } from "../components";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
