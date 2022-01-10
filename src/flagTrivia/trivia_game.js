import React from "react";
import './trivia_game.css';
import {getNewQuestion} from '../backend/countries_api';
import {Country} from '../backend/models/country.js';
import swal from '@sweetalert/with-react';

export class TriviaGame extends React.Component 
{
    constructor(props) 
    {
      super(props);
      this.state = 
      {
        // set state values
        questions: parseInt(localStorage.getItem('questions') == null ? "0" : localStorage.getItem('questions')),
        correct: parseInt(localStorage.getItem('correct') == null ? "0" : localStorage.getItem('correct')),
        incorrect: parseInt(localStorage.getItem('incorrect') == null ? "0" : localStorage.getItem('incorrect')),
        skipped: parseInt(localStorage.getItem('skipped') == null ? "0" : localStorage.getItem('skipped')),
        value: '',
        country: new Country('Canada', 'https://flagcdn.com/ca.svg'),
        isMounted: false,
        isAnswerEntered: false,
        hasAlreadyAnswered: false,
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    { 
      getNewQuestion().then(res =>
      {
        this.setState
        ({
          country: res,
          isMounted: true
        });
      });
    }

    handleChange(event) 
    {
      var isTextEntered = false;
      if (event.target.value !== '') 
      {
        isTextEntered = true;
      }
      this.setState
      ({
        value: event.target.value,
        isAnswerEntered: isTextEntered
      });
    }
  
    handleSubmit(event) 
    {
      alert(this.state.value + 'is' );
      event.preventDefault();
    }

    nextQuestion() 
    {
      getNewQuestion().then(res => 
      {
        this.setState
        ({
          country: res,
          hasAlreadyAnswered: false,
          value: ''
        });
      });
    }

    submitAnswer()
    {
      // when an answer is submitted, check if it is correct
      var answer = document.getElementById('answer').value.toLowerCase();

      if (answer === this.state.country.name.toLowerCase()) 
      {
        swal("Good job!", "You are correct!", "success");
        // add to the required state values
        this.addCorrectAnswer();
        this.addQuestion();
      }

      else if (answer !== this.state.country.name.toLowerCase())
      {
        swal("Sorry, you are incorrect", "The correct response is " +this.state.country.name, "error");
        this.addIncorrectAnswer();
        this.addQuestion();   
      }

      this.setState
      ({
        // already answered so cannot answer again
        hasAlreadyAnswered: true,
        value: ''
      })

      getNewQuestion().then(res => 
      {
        // get a new question 
        this.setState
        ({
          country: res,
          hasAlreadyAnswered: false,
          value: ''
        });
      });
    }

    skipQuestion() 
    {
      // skip a question and retrieve a new flag 
      this.addQuestion();
      this.addSkip();

      getNewQuestion().then(res => 
      {
        this.setState
        ({
          country: res,
          hasAlreadyAnswered: false,
          value: ''
        });
      });
    }

    addCorrectAnswer() 
    {
      // add correct answer and store in the local storage
      let new_correct = this.state.correct += 1;
      console.log("this is new correct:" + new_correct);

      this.setState
      ({correct: new_correct}, //updater
        () => 
      {localStorage.setItem('correct', this.state.correct)} // callback
      ); 
    }

    addIncorrectAnswer() 
    {
      // add incorrect answer and store in local storage 
      let new_incorrect = this.state.incorrect += 1;

      this.setState
      (
        {
          incorrect: new_incorrect
        }, //updater

        () => 
        
        {
          localStorage.setItem('incorrect', this.state.incorrect)
        } // callback
      );
    }

    addQuestion() 
    {
      // add question and store in local storage 
      let new_questions = this.state.questions += 1;
      console.log("this is new questions:" + new_questions);

      this.setState
      (
        {
          questions: new_questions
        }, //updater

        () => 
        
        {
          localStorage.setItem('questions', this.state.questions)
        } // callback
      );
      console.log("local storage:" + (localStorage.getItem('questions')));
    }

    addSkip() 
    {
      // add skip and store in local storage 
      let new_skipped = this.state.skipped += 1;
  
      this.setState
      (
        {
          skipped: new_skipped
        }, //updater

        () => 
        
        {
          localStorage.setItem('skipped', this.state.skipped)
        } // callback
      );
    }

    resetStorage() 
    {
      // reset the local storage values 
      this.setState
      (
        { questions: 0,
          correct : 0,
          incorrect: 0,
          skipped: 0
        }, //updater

        () => 

        { 
          localStorage.setItem('questions', 0);
          localStorage.setItem('correct', 0);
          localStorage.setItem('incorrect', 0);
          localStorage.setItem('skipped', 0);
        } // callback

      );
    }
  
  render() 
  { 
    return (

        <div 
          className="triviaGame">
          <div 
            className="triviaInterface" >

              <div>
                <button 
                  className= "reset" onClick={() => this.resetStorage() }
                  style={{float: 'right'}}>
                  Clear Scores
                </button>
              </div>
           
            <h1 
              className="title" >
              Guess The Flag
            </h1>

          </div>

          <div 
            className= "Score">
            <center>
              <h3>
                Total questions:  {this.state.questions} |
                &nbsp;
                Correct answers:   {this.state.correct} |
                &nbsp;
                Incorrect answers:  {this.state.incorrect} |
                &nbsp;
                Questions skipped:  {this.state.skipped}
              </h3>
            </center>
          </div>

          <div 
            className="countryFlag">
            {
              this.state.isMounted ? 
              <img className= "Flag" 
              src={this.state.country.link}
              alt="new"/> 
            :
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


          <div>
            <form 
              onSubmit = {this.submitAnswer}>

              <input 
                type="text" 
                id = 'answer' 
                value={this.state.value} 
                onChange={this.handleChange} 
                placeholder="Enter answer here" 
                ref={(ele)=>this._newTaskInput=ele} 
                className="Answer"/>

              {
                (this.state.isAnswerEntered && !this.state.hasAlreadyAnswered) ?

                  <button 
                    className="Submit"
                    type="submit"
                    style={{float: 'left'}}
                    onClick={() => this.submitAnswer()}>
                    Submit
                  </button> 
                
                :

                  <button 
                    className="NotAvailable"
                    disabled={true}
                    style={{float: 'left'}} 
                    onClick={() => this.submitAnswer()}>
                    Submit
                  </button> 
              }

              <button 
                className="Skip"
                style={{float: 'right'}}
                onClick ={() => this.skipQuestion()}>
                Skip
              </button>
            </form>
          </div>
        </div>
      )
    }
  }

  export default TriviaGame;

  