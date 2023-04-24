import letterNumber from "../functions/LetterNumber"
import { addWhiteSpace } from "../functions/AddWhiteSpace";

const Question= ({question, userAnswer, setUserAnswer, quizState, checkResult})=>{
  let finalized_question_form=[];
  const spacing = (next_str) => {
    switch(next_str){
      case ",":
        return ", ";
      case ".":
        return ". ";
      case ":":
        return "";
      case ";":
        return "";
      default:
        return " ";
    }
  }

  const setAns = (e, id) => {
    setUserAnswer({
      ...userAnswer,
      [id]:{
        is_ans_correct:false,
        ans:e.target.value
      }
    })
  }

  let counter = 1;

  //looping with for so that we can adjust the display
  for(let i=0; i<question.length; i++){
    //to decide the spacing, needs the value before and after
    before= i > 0 ? question[i-1] : null;
    after = i < question.length-1 ? question[i+1] : null;
    
    //if it's the question (blank):
    if(question[i] === ""){
      //NEW
      finalized_question_form.push(
        <span key={i+'q'}>
          <span style={{font:'0.7em Arial'}}>({counter++})</span>
          {" "}
          <input type="text"
            onBlur={(e)=>{setAns(e, i)}}/>
          {addWhiteSpace(before, question[i], after)}
        </span>
      )
      //OLD
      //add numbers
      finalized_question_form.push(
        <span key={i+'n'} style={{font:'0.7em Arial'}}>({counter++})</span>
      )
      finalized_question_form.push(" ")
      finalized_question_form.push(
        <input
          key={i}
          type="text"
          onBlur={(e)=>{setAns(e, i)}}/>
        )
      //for spacing
      finalized_question_form.push(spacing(question[i+1]))
    }
    //if it's letter or number
    else if(question[i].match(letterNumber)){
      finalized_question_form.push(question[i])
      finalized_question_form.push(spacing(question[i+1]))
    }
  }
  //add submit button
  finalized_question_form.push(
    <br key={question.length+1} />
  )
  finalized_question_form.push(
    <input
      key={question.length+2}
      type={`${quizState >0 ? "button":"hidden"}`}
      onClick={()=>{checkResult()}}
      value="Check Answer"
    />
  )

  return (
    <div>
      {finalized_question_form}
    </div>
  );
}

export default Question;