import {useState} from 'react'

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted value: ${searchQuery}`)
  }

  return (
    <div>
      <h2>Search for a user:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Github username:
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default SearchBar