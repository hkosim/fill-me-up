// import letterNumber from "../functions/LetterNumber"
import { addWhiteSpace } from "../functions/AddWhiteSpace";

const Question= ({question, userAnswer, setUserAnswer, quizState, checkResult})=>{
  let finalized_question_form=[];

  const setAns = (e, id) => {
    setUserAnswer({
      ...userAnswer,
      [id]:{
        is_ans_correct:false,
        ans:e.target.value
      }
    })
  }

  let counter = 1, before, after;

  //adjusting the display
  for(let i=0; i<question.length; i++){
    //to decide the spacing, needs the value before and after
    before = i > 0 ? question[i-1] : null;
    after = i < question.length-1 ? question[i+1] : null;

    //if it's the question (blank):
    if(question[i] === ""){
      //order: nbr, whitespace, inputbox, whitespace
      finalized_question_form.push(
        <span key={i+'q'} className="question-number">
            ({counter++}){" "}
        </span>)
      finalized_question_form.push(" ")
      finalized_question_form.push(<input key={i+'i'} type="text" size="16" onBlur={(e)=>{setAns(e, i)}}/>)
      finalized_question_form.push(addWhiteSpace(before, question[i], after))
    }
    //if enter, enter
    else if(question[i]==="\n"){
      finalized_question_form.push(<br key={i+'br'} />);
    }
    //if it's letter or number
    else{
      finalized_question_form.push(question[i])
      finalized_question_form.push(addWhiteSpace(before, question[i], after))
    }
  }
  //add submit button
  finalized_question_form.push(
    <br key={question.length+1} />
  )
  finalized_question_form.push(
    <div key={question.length+2} className="row justify-content-center">
      <div className="col-lg-auto">
        <button
        className="btn btn-primary submit-answer"
        type={`${quizState >0 ? "button":"hidden"}`}
        onClick={()=>{checkResult()}}>
        CHECK ANSWER
      </button>
      </div>
    </div>
    
  )

  return (
    <div className="show-text">
      {finalized_question_form}
    </div>
  );
}

export default Question;