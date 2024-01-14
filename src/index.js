
import { compose } from 'ramda';
import React, { Component } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import './style.css';
import WordDetails from './worddetails';


class App extends Component{
  state = {
    text: '',
    charCount: 0,
    wordCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    spaceCount: 0,
    punctuationCount: 0
  }
  componentDidMount(){
    this.getBacon()
    .then(bacon => {this.setState({text: bacon.join('\n\n')}, () => this.setCounts(this.state.text));
  }).catch(err => this.setState({text : `Error: ${err.message}`}));
  }
  getBacon = async () => {
    const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=3');
    const body = await response.json();
    if(response.status !== 200) throw Error(body.message);
    return body;
  }
  removeBreaks = arr => {
    const index = arr.findIndex(el => el.match(/\r?\n|\r/g));

    if(index === -1) return arr;

    const newArr = [...arr.slice(0, index), ...arr[index].split(/\r?\n|\r/g), ...arr.slice(index + 1, arr.length)];

    return this.removeBreaks(newArr);
  }

  removeEmotyElements = arr => {
    const index = arr.findIndex(el => el.trim() === '');

    if(index === -1)
      return arr;
    arr.splice(index, 1);

    return this.removeEmotyElements(arr);
  };
  setCounts = value =>{
    const trimmedValue = value.trim();
    const words = compose(this.removeEmotyElements, this.removeBreaks)(trimmedValue.split(' '));
    const sentences = compose(this.removeEmotyElements, this.removeBreaks)(trimmedValue.split('.'));
    const paragraphs = this.removeEmotyElements(trimmedValue.split(/\r?\n|\r/g));
    const punctuation = trimmedValue.replace(/[^\W\s]/g, '');
    const spaces = trimmedValue.split(' ').length - 1;

    this.setState({
      text: value,
      charCount: trimmedValue.length,
      wordCount: value === '' ? 0 : words.length,
      sentenceCount: value === '' ? 0 : sentences.length,
      paragraphCount: value === '' ? 0 : paragraphs.length,
      punctuationCount: value === '' ? 0 : punctuation.length,
      spaceCount: value === '' ? 0 : spaces
    });
  }
  handleChange = e => this.setCounts(e.target.value);

  render(){
    return(
      
      <div>
        <nav class='nav'>
      <h1 className='heading'><a href='#'>Text Analyzer</a></h1>
      <ul>
        <li><a href='#'>Home</a></li>
        <li><a href='https://github.com/mahak-dev' target='_blank'>About</a></li>
        <li><a href='#'>Contact</a></li>
      </ul>
    </nav>
    <div className='body-data'>
      <h1>Enter Your Text and Get the Results Dynamically...</h1>
      <textarea rows = '15' onChange = {this.handleChange} value = {this.state.text}/>
        <h1 className='heading'>Text Report</h1>
        <p className='heading-results'><strong>Character Count:</strong>{this.state.charCount}<br/>
        <strong>Word Count:</strong>{this.state.wordCount}<br/>
        <strong>Sentence Count:</strong>{this.state.sentenceCount}<br/>
        <strong>Paragraph Count:</strong>{this.state.paragraphCount}<br/>
        <strong>Space Count:</strong>{this.state.spaceCount}<br/>
        <strong>Punctuation Count:</strong>{this.state.punctuationCount}<br/>
        </p>
        
    </div>
    <WordDetails word={this.state.text} />
    <footer>
      <div className='container'>
      <p>Created by <a href='https://github.com/mahak-dev' target='_blank'>Mahak Gupta</a></p></div>
    </footer>
      </div>
    );
  }
}
render(<App />, document.getElementById('root'));

