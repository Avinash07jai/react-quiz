import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import './Questions.css';

const Questions = ({ currentQsn, setCurrentQsn, question, options, correct, setScore, score }) => {
    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);

    const handleSelect = (eachData) => {
      if(selected === eachData && selected === correct) {
        return "select";
      }else if(selected === eachData && selected !== correct){
        return "wrong";
      }else if (eachData === correct) {
        return "select";
      }
    };

    const hanleCheck = (eachData) => {
      setSelected(eachData);
      if(eachData === correct) setScore(score + 1)
      setError(false)
    }

    const history = useNavigate();

  const handleNext = () => {
    if(currentQsn > 8) {
      history('/result')
    }else if(selected){
      setCurrentQsn(currentQsn + 1)
      setSelected();
    }else{
      setError("Please select an option first");
    }
  };

  const handleQuit = () => {

  }
  return (
    <div className='questions'>
      <h1>Question {currentQsn + 1} </h1>
      <div className='singlrQsn'>
        <h2>{question[currentQsn].question} </h2>

        <div className='option1'>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          {options && options.map((eachData) => <button key={eachData} onClick={() => hanleCheck(eachData)} className={`singleOption ${selected &&  handleSelect(eachData)}`} disabled={selected} >{eachData}</button>)}
        </div>
        <div className='controls'>
          <Button className='quitbtn' variant='contained' color='secondary' size='large' style={{width:185}} href='/' onClick={handleQuit} >
            Quit
          </Button>
          <Button variant='contained' color='primary' size='large' style={{ width: 185 }} onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Questions;
