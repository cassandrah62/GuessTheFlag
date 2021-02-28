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
        isAnswerEntered: false,
        hasAlreadyAnswered: false
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

    
      getNewQuestion().then(res => {
        
        this.setState({
          country: res,
          hasAlreadyAnswered: false,
          value: ''
        });
    });
    }

    submitAnswer(){

      var answer = document.getElementById('answer').value.toLowerCase();
      
     
      if (answer === this.state.country.name.toLowerCase()) {
        alert("You are correct!")
        this.addCorrectAnswer();
        this.addQuestion()  
 
      } else if (answer !== this.state.country.name.toLowerCase()){
        alert ("Sorry you are incorrect. The correct answer is " + this.state.country.name);
        this.addIncorrectAnswer();
        this.addQuestion()
           
      }

      this.setState({
        hasAlreadyAnswered: true,
        value: ''
      })

      getNewQuestion().then(res => {
        
        this.setState({
          country: res,
          hasAlreadyAnswered: false,
          value: ''
        });
    });
    }


    skipQuestion() {

      this.addSkip();
      getNewQuestion().then(res => {
        
        this.setState({
          country: res,
          hasAlreadyAnswered: false,
          value: ''
        });
    });
    }

    addCorrectAnswer() {
      let new_score = this.state.correct += 1;
      this.setState({
        correct: new_score
      })
    }

    addIncorrectAnswer() {
      let new_score = this.state.incorrect += 1;
      this.setState({
        incorrect: new_score
      })
    }

    addQuestion() {
      let new_score = this.state.questions += 1;
      this.setState({
        questions: new_score
      })
    }

    addSkip() {
      let new_score = this.state.skipped += 1;
      this.setState({
        skipped: new_score
      })
    }

 
  
  render() {
      return (
        <div className="triviaGame">
          <div className="triviaInterface">
            <h1>
              Guess The Flag
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
              
              type="text" id = 'answer' value={this.state.value} onChange={this.handleChange} />
          </div>
          <div className="triviaButtons">
              {(this.state.isAnswerEntered && !this.state.hasAlreadyAnswered) ?
               <button className="Submit"
               style={{float: 'left'}}
               onClick={() => this.submitAnswer() }>
               Submit Answer
               </button> :

               <button className="NotAvailable"
               disabled={true}
               style={{float: 'left'}} 
               onClick={() => this.submitAnswer() }>
               Submit Answer
               </button> }

          
            
            {/* <button className="Next"
              style={{float: 'right'}}
              onClick={() => this.nextQuestion()}>
                Next Question
              </button> */}
              
              
            <button className="Skip"
             style={{float: 'right'}}
             onClick ={() => this.skipQuestion()}>
               Skip Question
             </button>

          </div>
        </div>
      )
    }
  
  }

  export default TriviaGame;