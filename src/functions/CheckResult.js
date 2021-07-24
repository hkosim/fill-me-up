export const checkResult = (userAnswer, answerKey, setQuizState, setUserScore) => {
  let total_question = Object.keys(answerKey).length;
  let u_ans, ans_key;
  let correct_ans = 0, score;

  Object.keys(answerKey).forEach((key)=>{
    //compare the answer of user and the answer key
    //remove spaces
    u_ans= typeof userAnswer[key] === "undefined"?"":userAnswer[key]["ans"].replace(/\s+/g, '').toLowerCase();
    ans_key=answerKey[key].replace(/\s+/g, '').toLowerCase();
    //updated: just trim
    // u_ans= typeof userAnswer[key] === "undefined"?"":userAnswer[key]["ans"].trim().toLowerCase();
    // ans_key=answerKey[key].trim().toLowerCase();

    //if the ans is correct
    if(u_ans === ans_key){
      //label ans as true
      userAnswer[key]["is_ans_correct"] = true;
      correct_ans++;
    }
    
  })
  //set quiz state: 2 (finished working)
  setQuizState(2);
  score = correct_ans*100/total_question;
  setUserScore({
    correct_ans:correct_ans,
    total_question:total_question,
    score:score.toFixed(2),
  });
}