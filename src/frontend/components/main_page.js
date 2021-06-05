
import './main_page.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TriviaGame from '../../flagTrivia/trivia_game.js';
import MemoryGame from '../../memoryGame/memory_game.js';
import swal from '@sweetalert/with-react';
import { render } from '@testing-library/react';



export default function App() {

 
     return (
        <Router>
        <div>
            <nav>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/FlipTheCard">Flip The Card</Link>
                </li>
                <li>
                <Link to="/users">Users</Link>
                </li>
                <li>
                <Link to="/GuessTheFlag">Guess The Flag</Link>
                </li>
            </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
            <Route path="/guessTheFlag">
                <GuessTheFlag />
            </Route>
            <Route path="/FlipTheCard">
                <FlipTheCard />
            </Route>
            <Route path="/users">
                <Users />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            </Switch>
        </div>
        </Router>
        );
    }



    
    function Home() {
        swal("Welcome to Sam's Games!", "I hope you enjoy the games :)")
        
        
     return (
        <div>
            <h1>
                Welcome to Game City!
            </h1>

            <h1>
                High Score: 
            </h1>
           
        </div> 
        
      );
    }

    function FlipTheCard() {

      let gameOne = new MemoryGame();
      return (gameOne);
    }

    function Users() {
       return ( 
           
        <h1>
           hi
        </h1>
       )

    }


    class GuessTheFlag extends TriviaGame {
        // state = {
        //     count: 0,
        //     number: 0,
        
        // };
        
        // increment = () => {
        //     this.setState({
        //         count: this.state.count + 1
        //     });
        // };
        
        // decrement = () => {
        //     this.setState({
        //         count: this.state.count - 1
        //     });
        // }; 

        // add = () => {
        //     this.setState({
        //         number: this.state.number + 1
        //     });
        // };

        // render() {
        //     return (
        //         <div className="App">
        //             <TriviaGame
        //              count= {this.state.count} 
        //              number = {this.state.number}
        //              decrement= {this.decrement}
        //              increment = {this.increment}
        //              add = {this.add}
        //             />
                      
        //         </div>
        //     )
        // }
        
            
            state = {
            questions: 0,
            correct: 0,
            incorrect: 0,
            skipped: 0,
            hi: 0,
            };
      
        
    
       

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
            });
        };
    
        addQuestion() {
            let new_score = this.state.questions += 1;
            this.setState({
            questions: new_score
            });
        };
    
        addSkip() {
            let new_score = this.state.skipped += 1;
            this.setState({
            skipped: new_score
            });
        };
        
        

        render() {
            

            return (
                <div className = "App">
                    <TriviaGame 
                    questions ={this.state.questions}
                    corrent = {this.state.correct}
                    incorrect = {this.state.incorrect}
                    skipped = {this.state.skipped} 
                    addCorrect = {this.addCorrectAnswer}
                    addIncorrect = {this.addIncorrectAnswer}
                    addQuestion = {this.addQuestion}
                    addSkip = {this.addSkip}
                    addHi = {this.addHi}

                    />
                </div>

            )
        }
       
      
    } 
    
 
    

