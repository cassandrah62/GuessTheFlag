import React from 'react';
import './trivia_game.css';
import {testFunction, getNewQuestion, checkAnswer} from '../backend/countries_api';
import {Country} from '../backend/models/country.js';
import swal from '@sweetalert/with-react';


import {App} from '../frontend/components/main_page.js';


export class TriviaGame extends React.Component {
  
  
    constructor(props) {
      super(props);
      
      this.state = {
        // questions: 0,
        // correct: 0,
        // incorrect: 0,
        // skipped: 0,
        value: '',
        country: new Country('Canada', 'https://restcountries.eu/data/can.svg'),
        isMounted: false,
        isAnswerEntered: false,
        hasAlreadyAnswered: false,
        
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
        swal("Good job!", "You are correct!", "success");
        this.props.addCorrectAnswer();
        this.props.addQuestion()  
 
      } else if (answer !== this.state.country.name.toLowerCase()){
        swal("Sorry, you are incorrect", "The correct response is " +this.state.country.name, "error");
        this.props.addIncorrectAnswer();
        this.props.addQuestion()
           
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

      this.props.addSkip();
      getNewQuestion().then(res => {
        
        this.setState({
          country: res,
          hasAlreadyAnswered: false,
          value: ''
        });
    });
    }

    // addCorrectAnswer() {
    //   let new_score = this.state.correct += 1;
    //   this.setState({
    //     correct: new_score
    //   })
    // }

    // addIncorrectAnswer() {
    //   let new_score = this.state.incorrect += 1;
    //   this.setState({
    //     incorrect: new_score
    //   })
    // }

    // addQuestion() {
    //   let new_score = this.state.questions += 1;
    //   this.setState({
    //     questions: new_score
    //   })
    // }

    // addSkip() {
    //   let new_score = this.state.skipped += 1;
    //   this.setState({
    //     skipped: new_score
    //   })
    // }

  render() {
    
  
      return (
        
        <div className="triviaGame">
          <div className="triviaInterface">
            
            <h1>
              Guess The Flag
            </h1>
          
        <div>
          <div> count: {this.props.number} </div>
            <button onClick = {this.props.add}> add
            </button>
                
          </div>
        </div>

        <div>
            <div> count: {this.props.count} </div>
            <div> number of hi: {this.props.number} </div>
                <button onClick={this.props.increment}> increment </button>
                <button onClick={this.props.decrement}> decrement </button>
                <button onClick={this.props.add}> add </button>
             </div>

          <div className= "Score">
            <center>
            <div>
             Total questions:  {this.props.questions} |
              &nbsp;
             Correct answers:   {this.props.correct} |
             &nbsp;
             Incorrect answers:  {this.props.incorrect} |
             &nbsp;
             Questions skipped:  {this.props.skipped}
            </div>
            </center>
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

          <div>
            <form onSubmit={this.submitAnswer}>
              <input type="text" 
               id = 'answer' 
               value={this.state.value} onChange={this.handleChange} 

              placeholder="Enter answer here" 
              ref={(ele)=>this._newTaskInput=ele} 
              className="Answer"/>

             {(this.state.isAnswerEntered && !this.state.hasAlreadyAnswered) ?

            <button className="Submit"
            type="submit"
            style={{float: 'left'}}
            onClick={() => this.submitAnswer() }>
            Submit
            </button> :

            <button className="NotAvailable"
            disabled={true}
            style={{float: 'left'}} 
            onClick={() => this.submitAnswer() }>
            Submit
            </button> }

            <button className="Skip"
            style={{float: 'right'}}
            onClick ={() => this.props.skipQuestion()}>
            Skip
            </button>
            </form>
          </div>


        </div>
      )
    }
  
  }

  export default TriviaGame;
  