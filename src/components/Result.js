import {addWhiteSpace} from "../functions/AddWhiteSpace"
import {generateTime} from "../functions/GenerateTime"

const Result= ({title, difficulty, question, userScore, userAnswer, answerKey, cdFrom})=>{
  let finalized_result_form=[];

  let counter = 1;
  let before, after;
  //looping with for so that we can adjust the display
  for(let i=0; i<question.length; i++){
    //to decide the spacing, needs the value before and after
    before= i > 0 ? question[i-1] : null;
    after = i < question.length-1 ? question[i+1] : null;

    console.log(question[i])
    //if it's the question (blank):
    if(question[i] === ""){
      //print the number
      finalized_result_form.push(<span key={i+'n'} className="question-number">({counter++}){" "}</span>);
      //if correct: push the correct answer with green text
      if(userAnswer[i]["is_ans_correct"]){
        //print the correct answer
        finalized_result_form.push(
            <span key={i+'r'} className="ans ans-correct">{answerKey[i]}
              {addWhiteSpace(before, question[i], after)} {/* should you add space? */}
            </span>
          );
      }
      //if wronk
      else{
        //print and strike the wrong answer
        finalized_result_form.push(
          <span key={i+'w'} className="ans ans-wrong">
            {
              userAnswer[i]["ans"]!==""?
                <strike>{userAnswer[i]["ans"]}</strike>
              :null}
          </span>
        );
        //print the right answer
        finalized_result_form.push(
          <span key={i+'c'} className="ans ans-corrected">
            {" "}
            {answerKey[i]}{addWhiteSpace(before, question[i], after)}
          </span>
        )
      }
    }
    //if enter, enter
    else if(question[i]==="\n"){
      finalized_result_form.push(<br key={i+'br'} />);
    }
    //everything else
    else{
      finalized_result_form.push(question[i])
      finalized_result_form.push(addWhiteSpace(before, question[i], after))
    }

  } //end of big for

  finalized_result_form.push(
    <br key={question.length+1} />
  )
  
  //CALCULATE REMAINING TIME
  //get time remaining and elapsed
  let time_remaining_s = localStorage.getItem('time_left');
  let time_elapsed_s = cdFrom - time_remaining_s;

  // className={`todo-item ${todo.completed ? "completed":""}`}
  //show score etc
  finalized_result_form.push(
    <div key={question.length+2} className="container result-container">
      {/* give line */}
      <div className="row justify-content-center">
        <div className="col-md-6"><hr /></div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto result-title">YOUR RESULT</div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 result-label">Selected Text</div>
        <div className="col-md-3 result-content">
          {title}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 result-label">Difficulty</div>
        <div className="col-md-3 result-content">
          {difficulty}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 result-label">Score</div>
        <div
          className={`col-md-3 result-content
          ${userScore.score < 50.0 ? "ans-wrong":""}
          ${userScore.score >= 50.0 && userScore.score < 80.0 ? "ans-corrected":""}
          ${userScore.score >= 80.0 ? "ans-correct":""}
          `}
        >
          {userScore.score}{" %"}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 result-label">Time Elapsed</div>
        <div className="col-md-3 result-content">{generateTime(time_elapsed_s)}</div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 result-label">Remaining Time</div>
        <div className="col-md-3 result-content">{generateTime(time_remaining_s)}</div>
      </div>
      {/* give line */}
      <div className="row justify-content-center">
        <div className="col-md-6"><hr /></div>
      </div>
    </div>
  )
  return (
    <div className="show-text">
      {finalized_result_form}
    </div>
  );
}

export default Result;