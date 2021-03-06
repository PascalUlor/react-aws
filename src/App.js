import React from "react";
import Amplify, { API, Storage } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "./App.css";
import Jobs from "./components/Jobs";
import Header from "./components/Header";

Amplify.configure(awsconfig);

function App() {
  return (
    <div>
     <Header />
      <div className="App">
        <Jobs />
      </div>
    </div>
  );
}

// export default App;

const authTheme = {
  navBar: { backgroundColor: "556cd6", border: 0, color: 0 },
};
export default withAuthenticator(App, {
  includeGreetings: true,
  theme: authTheme,
});
