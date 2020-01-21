import React, { useEffect, useState } from 'react';
import makeRequest from './utils/axiosSetup';
import { ClockLoader } from 'react-spinners';
import Card from './components/card/Card';
import './App.scss';

function App() {
  const [search, setsearch] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [movies, setMovies] = useState(null);
  const handleSubmit = async e => {
    e.preventDefault();
    await setIsFetching(true);
    try {
      await makeRequest(search).then(data => setMovies(data));
      await setIsFetching(false);
    } catch (err) {
      console.log(err);
      setIsFetching(false);
    }
  };

  return (
    <div className="app__container">
      <h1 className="app__header">Welcome To Series Search</h1>

      <div>
        <form onSubmit={handleSubmit} className="app__form">
          <input
            type="text"
            placeholder="Search For Series"
            value={search}
            onChange={e => setsearch(e.target.value)}
            className="app__input"
          />
        </form>
      </div>

      {isFetching === true ? (
        <div>
          <div className="app__loader">
            <ClockLoader size="150" />
          </div>
          <h2 className="app__message">Fetching Movies</h2>
        </div>
      ) : movies === null ? (
        <h2 className="app__message">No Series Found</h2>
      ) : (
        <>
          <h1>Series Details</h1>
          <p>
            Number of Seasons:{' '}
            {
              movies._embedded.episodes[movies._embedded.episodes.length - 1]
                .season
            }
          </p>
          <p>Number of episodes: {movies._embedded.episodes.length}</p>
          <p>{movies.summary.replace(/<\/?[^>]+>/gi, '')}</p>

          <p>Filter By Season</p>
          <select className="app__select">
            <option>Select Season</option>
          </select>
          <div className="app__grid">
            {movies._embedded.episodes.map(movie => (
              <>
                <Card
                  name={movie.name}
                  image={movie.image ? movie.image.medium : null}
                  season={movie.season}
                  summary={
                    movie.summary
                      ? movie.summary.replace(/<\/?[^>]+>/gi, '')
                      : ''
                  }
                />
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
