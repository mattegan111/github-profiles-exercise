import {useState} from 'react'
import SearchResults from './SearchResults'

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedQuery(searchQuery)
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search for a user..."
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
          />
          <input type="submit" value="Search" className="form-button"/>
        </form>
      </div>
      <SearchResults submittedQuery={submittedQuery} />
    </div>
  );
}

export default SearchBar;