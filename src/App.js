import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1>
          Github Profile Viewer
        </h1>
        <button 
          onClick={() => 
            theme === 'light' ? setTheme('dark') : setTheme('light')
          }
          className="theme-button"
        >
          ☀/☾
        </button>
      </header>
        <SearchBar />
    </div>
  );
}

export default App;
