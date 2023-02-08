import React, { useState } from 'react';
import quiz from './Quiz.webp';
import './Home.css';
import { Button, MenuItem, TextField } from '@mui/material';
import Categories from '../data/Category';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty,setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const history = useNavigate();

  const handleSubmit = () => {
    if(!category || !difficulty || !name){
      setError(true);
      return;
    }else{
      setError(false);
      fetchQuestions(category,difficulty);
      history("/quiz");
    }
  };
  return ( 
    <div className='content'>
     <div className='start'>
              <span>Quiz Game</span>
              <div className='start-select'>
                {error && <ErrorMessage>Please Fill the fields</ErrorMessage>}
                  <TextField id="outlined-basic" style={{marginBottom:25, backgroundColor:'white'}} label="Enter Your Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
                  <TextField select style={{ marginBottom: 30, backgroundColor:'white' }} label="Select Category" variant='outlined' onChange={(e) => setCategory(e.target.value)} value={category} >
                    {
                        Categories.map((cat) => {
                           return <MenuItem key={cat.category} value={cat.value} >
                                {cat.category}
                            </MenuItem>    
                        })}
                  </TextField>

                      <TextField select style={{ marginBottom: 30, backgroundColor:'white' }} label="Select Difficulty" variant='outlined' onChange={(e) => setDifficulty(e.target.value)} value={difficulty} >
                          <MenuItem key="Easy" value="easy">
                            Easy
                          </MenuItem>
                          <MenuItem key="Medium" value="medium">
                            Medium
                          </MenuItem>
                          <MenuItem key="Hard" value="hard">
                            Hard
                          </MenuItem>
                      </TextField>
                        <Button variant='contained' color='primary' size='large' onClick={handleSubmit}>
                          Start Quiz
                        </Button>
              </div>
     </div>
      <span className='banner'></span>
    </div>
  )
}

export default Home;
