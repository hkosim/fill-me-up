import React, { useState, useEffect } from "react";
import './App.css';
import input_data from './components/data/InputData';
import difficulty from './components/data/Difficulty';

//import components
import Question from './components/Question';
import Result from './components/Result';
import CountdownTimer from './components/CountdownTimer';

//import functions
import {generateRange} from './functions/GenerateRange';
import {generateHoles} from './functions/GenerateHoles';
import {checkResult} from './functions/CheckResult'
import { generateTime } from "./functions/GenerateTime";


function App() {
  //0:write yourself, 1: choose from dropdown
  const [inputTextType, setInputTextType] = useState();
  //DROPDOWN STUFF
  const [availableInput, setAvailableInput] = useState([]);
  const [selectedAvailableInput, setSelectedAvailableInput] = useState("");
  //general stuff
  const [inputText, setInputText] = useState("");
  const [questionText, setQuestionText] = useState([]);

  //states: 0=preparation, 1=ongoing, 2=finished
  const [quizState, setQuizState]=useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy")
  //cd=countdown, cu=count up
  const [timerSetting, setTimerSetting] = useState({
    type:'cd',
    cd_from:600,
    cd_dropdown:[10, 240, 300, 420, 600]
  })
  
  const [answerKey, setAnswerKey] = useState({});
  const [userAnswer, setUserAnswer] = useState({});

  const [userScore, setUserScore] = useState({
    correct_ans:0,
    total_question:0,
    score:0
  });
  
  //will run when react is starting
  useEffect(() => {
    //reset localStorage
    localStorage.removeItem("time_left");
    //convert keys from input to an array
    let av_inp = [];
    Object.keys(input_data).forEach((key)=>{
      av_inp.push(key);
    })
    setAvailableInput(av_inp);
    setInputTextType("choose");
  }, [])

  //will run when inputtextmode is changed
  useEffect(() => {
    //if mode: from available text
    if(inputTextType === "choose"){
      let inp = input_data[availableInput[0]]['content'];
      setSelectedAvailableInput(availableInput[0]);
      setInputText(inp);
    }
    else{
      setInputText("")
      setSelectedAvailableInput("");
    }
  }, [inputTextType, availableInput])

  //reset: delete all
  const resetAll = () => {
    setQuestionText([])
    setQuizState(0);
    setAnswerKey({});
    setUserAnswer({});
    setUserScore({
      correct_ans:0,
      total_question:0,
      score:0
    });
  }

  const prepareGenerateQuestion = () => {
    //split the string into an array
    // let inp_arr = inputText.trim().replace(/\s*\b\s*/);
    // let inp_arr = inputText.trim().split(/\s+/);
    // setInputText(inputText.replace(/\r\n|\r|\n/g, ";"));
    let inp_arr = inputText.trim().split(/\s*\b\s*/);
    if(inp_arr.length <= 5)
      alert('you need at least 5 characters in the textbox!');
    else
      generateQuestion([...inp_arr], difficulty[selectedDifficulty])
  }

  const generateQuestion = (question_arr, diff) => {
    resetAll();

    let question_word_count = question_arr.length;
    let nbr_of_border = diff['border_ratio']*question_word_count;
    //generate the range
    let range = generateRange(nbr_of_border, question_word_count);

    //generate holes
    let processed_question_data = generateHoles(question_arr, range, diff['ratio']);

    setQuestionText(processed_question_data.question);
    setAnswerKey(processed_question_data.answer_key);
    setUserAnswer(processed_question_data.user_answer_template);
    //set isQuizTime
    setQuizState(1);
  }

  return (
    <div className="all-container">
      {/* title */}
      <div className="title">
        Fill me up!
      </div>
      <div className="content-container">
        {/*-----------CONTROL BOX---------------*/}
        {/* if preparation: show navbox */}
        {
          quizState === 0 ?
          <div className="nav-box">
            {/* opt box source of text */}
            SOURCE OF TEXT:
            <div className="nav-opt">
              <input type="radio" name='choose' checked={inputTextType==="choose"}
                onChange={()=>{setInputTextType("choose")}} />
              <label htmlFor="choose">
                Available Text
              </label>
            </div>
            {
              //show dropdown if only dropdown method is choosed
              inputTextType==="choose"?
              //dropdown: which text do you want to choose
              <select
                onChange={(e)=>{
                  setInputText(input_data[e.target.value]['content']);
                  setSelectedAvailableInput(e.target.value);
                }}>{
                availableInput.map((inp, idx)=>(
                  <option value={inp} key={idx}>
                    {input_data[inp]['title']}
                  </option>
                ))}
              </select>:null
            }
            <div className="nav-opt">
              <input type="radio" name='manual' checked={inputTextType==="manual"}
                onChange={()=>{setInputTextType("manual")}} />
              <label htmlFor="manual">
                Manual Input
              </label>
            </div>
            <br />
            DIFFICULTY:
            {
              Object.keys(difficulty).map((key)=>(
                <div className="nav-opt" key={key+'d'}>
                  <input
                    type="radio"
                    name={key}
                    checked={selectedDifficulty === key}
                    onChange={()=>{setSelectedDifficulty(key)}}/>
                  <label htmlFor={key}> {key.charAt(0).toUpperCase() + key.slice(1)} </label>
                </div>
              ))
            }
            <br />
            TIMER:
            {/* TIMER SETTING */}
            {
              timerSetting.cd_dropdown.map((tm, idx)=>(
                <div className="nav-opt" key={idx+'t'}>
                  <input
                    type="radio"
                    name={idx+"tm"}
                    checked={timerSetting.cd_from === tm}
                    onChange={()=>{setTimerSetting({
                      ...timerSetting, cd_from:tm
                      })}}
                  />
                  <label htmlFor={idx+"tm"}> {generateTime(tm)} </label>
                </div>
              ))
            }
            <div className="box-button">
            {/* GENERATE QUESTIONS */}
              <input type="button"
                onClick = {() => {prepareGenerateQuestion()}}
                value="Generate" />
              {/* RESET */}
              {" "}
              <input type="button"
                onClick = {() => {resetAll()}}
                value="RESET" />
              <br />
            </div>
              
          </div>:null
          // end of div navbox
        }
        {/* if ongoing: show timer */}
        {
          quizState === 1 ?
          <div className="nav-box">
            <CountdownTimer
              initCdTime = {timerSetting.cd_from}
              checkResult = {()=>{
                checkResult(
                  userAnswer,
                  answerKey,
                  setQuizState,
                  setUserScore)}}
            />
            <br />
            {/* RESET */}
            <div className="box-button">
              <input
                type="button"
                onClick = {() => {resetAll()}}
                value="RESET" />
            </div>
            <br />
            {/* FOR DEBUGGING PURPOSE */}
            {/* SUBMITTED ANS:
                {
                  Object.keys(userAnswer).map((key, idx)=>(
                    <div key={idx}>
                      {userAnswer[key]["is_ans_correct"].toString()}
                      {userAnswer[key]["ans"]}
                    </div>
                  ))
                } */}
          </div>:null
        }
        {/* --------------CONTENT TEXT-------------- */}
        <div className="content">
          {/* if using avail text: set sub-title. else? custom text */}
          <div className="sub-title">
            {
              inputTextType === "choose" ?
                selectedAvailableInput!==""?
                input_data[selectedAvailableInput]['title']:null
              :"CUSTOM TEXT"
            }
            { quizState === 1?" - ON PROGRESS":null }
            { quizState === 2?" - RESULT":null }
          </div>
          {/* if the quiz is on preparation */}
          {
            quizState === 0?
              <textarea 
                onChange={(e)=>{setInputText(e.target.value)}} //on change: save to inputtext
                maxLength='10000'
                rows='30'
                value={inputText}
                disabled = {inputTextType !== "manual"}
              />
            :null
          }
          {/* when the quiz is on progress*/}
          {
            quizState === 1?
                <Question
                  question = {questionText}
                  userAnswer = {userAnswer}
                  setUserAnswer = {setUserAnswer}
                  quizState = {quizState}
                  checkResult = {()=>{
                    checkResult(
                      userAnswer,
                      answerKey,
                      setQuizState,
                      setUserScore)}}
                />:null
          }
          {/* when the quiz is finished*/}
          {
            quizState === 2?
              <div>
                <Result
                  question = {questionText}
                  userScore = {userScore}
                  userAnswer = {userAnswer}
                  answerKey = {answerKey}
                  cdFrom = {timerSetting.cd_from}
                />
              </div>:null
          }
        </div>
        {/* -----------END OFCONTENT TEXT-------------- */}
      </div>
    </div>
  );
}

export default App;
