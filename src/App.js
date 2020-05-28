import React from 'react';
import Amplify, { API, Storage} from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from '@aws-amplify/ui-react';
import logo from './logo.svg';
import './App.css';

Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// export default App;


const authTheme = {navBar: {backgroundColor: '556cd6', border: 0, color: 0}}
export default withAuthenticator(App, {
includeGreetings: true, theme: authTheme
});
