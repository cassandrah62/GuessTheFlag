import React from 'react';
import './trivia_game.css';
import {testFunction, getNewQuestion, checkAnswer} from '../../backend/countries_api';
import {Country} from '../../backend/models/country.js';

export class TriviaGame extends React.Component {
  
    constructor(props) {
      super(props);
      
      this.state = {
        questions: 0,
        correct: 0,
        incorrect: 0,
        skipped: 0,
        value: '',
        country: new Country('Canada', 'https://restcountries.eu/data/can.svg'),
        isMounted: false,
        isAnswerEntered: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() { 
      getNewQuestion().then(res => {

        this.setState({
          country: res,
          isMounted: true
        });
    });
    }


    handleChange(event) {
      var isTextEntered = false;
      if (event.target.value !== '') {
        isTextEntered = true;
      }
      this.setState({
        value: event.target.value,
        isAnswerEntered: isTextEntered
      });
    }
  
    handleSubmit(event) {
      alert(this.state.value + 'is' );
      event.preventDefault();
    }

    nextQuestion() {

      this.addQuestion()
    
      getNewQuestion().then(res => {
        
        this.setState({
          country: res
        });
    });
    }

    submitAnswer(){

      var answer = document.getElementById('answer').value;
     
      if (answer === this.state.country.name) {
        alert("You are correct!")
        this.addCorrectAnswer();
        
        
 
      } else if (answer !== this.state.country.name ){
        alert ("Sorry you are incorrect. The correct answer is " + this.state.country.name);
        this.addIncorrectAnswer();
       
        
      }

    }
    skipQuestion() {

      this.addSkip();
      getNewQuestion().then(res => {
        
        this.setState({
          country: res
        });
    });
    }

    addCorrectAnswer() {
      this.state.correct += 1;
    }

    addIncorrectAnswer() {
      this.state.incorrect += 1;
    }

    addQuestion() {
      this.state.questions += 1;
    }

    addSkip() {
      this.state.skipped += 1;
    }

 
  
  render() {
      return (
        <div className="triviaGame">
          <div className="triviaInterface">
            <h1>
              Trivia Game
            </h1>
          </div>
          <div className= "Score">
            <h3>
              {"Total questions: " + this.state.questions}
            </h3>
            <h3>
             {"Correct answers: " + this.state.correct}
            </h3>
            <h3>
             {"Incorrect answers: " + this.state.incorrect}
            </h3>
            <h3>
            {"Questions skipped: " + this.state.skipped}
            </h3>
          </div>
         
          <div className="countryFlag">
            {this.state.isMounted ? 
            <img className= "Flag" 
            src={this.state.country.link}
            alt="new"/> :
            <h2>
              Loading ...
            </h2>
          }
          </div>
          <div className="Instructions">
            <h3>
             Please enter the country that has the flag shown above.
            </h3>
          </div>
          <div className = "TextBox">
             <input className = "Answer"
              type="text" id = 'answer' value={this.state.name} onChange={this.handleChange} />
          </div>
          <div className="triviaButtons">
              {this.state.isAnswerEntered ?
               <button className="Submit"
               style={{float: 'left'}}
               onClick={() => this.submitAnswer() }>
               Submit Answer
               </button> :

               <button className="NotAvailable"
               disabled={!this.state.isAnswerEntered}
               style={{float: 'left'}} 
               onClick={() => this.submitAnswer() }>
               Submit Answer
               </button> }

            <button className="Next"
              style={{float: 'right'}}
              onClick={() => this.nextQuestion()}>
                Next Question
              </button>
            <button className="Skip"
             onClick ={() => this.skipQuestion()}>
               Skip Question
             </button>

          </div>
        </div>
      )
    }
  
  }

  export default TriviaGame;