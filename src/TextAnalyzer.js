import React, { useState } from 'react';

const TextAnalyzer = () => {
      const [text, setText] = useState('');
      
      const analyzeText = (inputText) => {
            const charCount = inputText.length;
            const wordCount = inputText.split(/\s+/ ).filter(Boolean).length;
            const sentenceCount = inputText.split(/[.!?]+/).filter(Boolean).length;
            const paragraphCount = inputText.split('\n').filter(Boolean).length;
            const spaceCount = inputText.split(' ').length - 1;
            const punctuationCount = inputText.replace(/[^\W\s]/g, '').length;


            console.log('Number of Characters :', charCount);
            console.log('Number of Words :', wordCount);
            console.log('Number of Sentences :', sentenceCount);
            console.log('Number of Paragraphs :', paragraphCount);
            console.log('Number of Spaces :', spaceCount);
            console.log('Number of Punctuation :', punctuationCount);
      };
      const handleTextChange = (e) => {
            const newText = e.target.value;
            setText(newText);
            analyzeText();
      };
      return (
            <div>
                  <textarea
                        placeholder="Type your text here..."
                        value = {text}
                        onChange = {handleTextChange}
                        rows = {10}
                        cols = {50}
                  />
            </div>
      );
};

export default TextAnalyzer;
