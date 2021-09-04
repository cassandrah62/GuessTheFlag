
import './main_page.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TriviaGame from '../../flagTrivia/trivia_game.js';
import App from '../../memoryGame/memory_game.js';





import swal from '@sweetalert/with-react';
import { render } from '@testing-library/react';

import { useState, useContext } from "react";

import { ClicksCounter } from '../../flagTrivia/trivia_game.js';


export default function Routing() {

 
     return (
        <Router>
        <div>
            <nav>
            <ul>
                <li>
                <Link to="/" >Home </Link>
                </li>
                <li>
                <Link to="/MemoryGame">Memory Game</Link>
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
            <Route path="/MemoryGame">
                <App />
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

    function MemoryGame() {

      let gameOne = new App();
      return (gameOne);
    }

        

 
      
    class GuessTheFlag extends TriviaGame {

        
         
            
    }
      
       
      
    
    
 
    

