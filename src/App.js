import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function App() {
  const [name, setName] = useState('');
  
  const [question, setQuestion] = useState();

  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = '', difficulty = '') => {
  const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`);
  setQuestion(data.results);
  };

  return (
    <BrowserRouter>
    <div className="App">
    <Header />

    <Routes>
      <Route path='/' element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions} />} />
      <Route path='/quiz' element={<Quiz name={name} question={question} score={score} setScore={setScore} setQuestion={setQuestion} />} />
      <Route path='/result' element={<Result name={name} score={score} />} />
    </Routes>
    </div>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
