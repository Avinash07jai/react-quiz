import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import './Quiz.css';
import Questions from '../components/Questions';

const Quiz = ({ name, question, score, setScore, setQuestion }) => {
  const [options,setOptions] = useState();
  const [currentQsn, setCurrentQsn] = useState(0);

  useEffect(() => {
    console.log(question)

    setOptions(question && handleShuffle([question[currentQsn]?.correct_answer, ...question[currentQsn]?.incorrect_answers]))
  },[question, currentQsn]);

  console.log(options)

  const handleShuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  };

  return (
    <div className='quiz'>
      <span className='subtitle'>Welcome {name} </span>
     {question ? (
      <>
      <div className='quizInfo'>
        <span>{question[currentQsn].category} </span>
        <span>Score : {score}</span>
      </div>

      <Questions currentQsn={currentQsn} setCurrentQsn={setCurrentQsn} question={question} options={options} correct={question[currentQsn]?.correct_answer} score={score} setScore={setScore} setOptions={setOptions} />
      </>  
      ) : (
   <CircularProgress style={{margin:100}} color="inherit" size={150} thickness={1} />
     )}

    </div>
  )
}

export default Quiz;
