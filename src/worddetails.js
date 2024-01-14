// WordDetails.js
import React, { useState } from 'react';
import './worddetails.css';

const WordDetails = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState({});
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      let definitions = data[0]?.meanings[0]?.definitions[0];
      setDefinition({
        word: data[0]?.word,
        partOfSpeech: data[0]?.meanings[0]?.partOfSpeech,
        definition: definitions?.definition || 'Not Found',
        example: definitions?.example || 'Not Found',
        synonyms: data[0]?.meanings[0]?.synonyms?.slice(0, 3) || [],
        antonyms: data[0]?.meanings[0]?.antonyms?.slice(0, 3) || [],
      });
      setError('');
    } catch (error) {
      setDefinition({});
      setError('Please Enter Correct Word...');
    }
  };

  return (
    <div id="mainBody2">
      <div>
        <h1 id="Heading2" className="my-4 text-center">
          Welcome to Dictionary Application
        </h1>
      </div>

      <div className="main">
        <form id="DictionaryForm" onSubmit={handleSubmit}>
          <input
            id="InpBox"
            type="text"
            placeholder="Enter a Word...."
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button id="Dbutton" className="btn btn-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <br />
      <p id="OutputHeading">Details of The word: </p>
      <div id="Output">
        <div className="result">
          {definition.word && (
            <>
              <h2>
                <strong>Word: </strong>
                {definition.word}
              </h2>
              <p className="pos">
                <strong>Parts of Speech: </strong>
                {definition.partOfSpeech}
              </p>
              <p>
                <strong>Definition: </strong>
                {definition.definition}
              </p>
              <p>
                <strong>Example: </strong>
                {definition.example}
              </p>
              <p>
                <strong>Synonyms:</strong> {definition.synonyms.join(', ')}
              </p>
              <p>
                <strong>Antonyms:</strong> {definition.antonyms.join(', ')}
              </p>
            </>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default WordDetails;