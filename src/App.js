import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/todo" element={<Homepage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
