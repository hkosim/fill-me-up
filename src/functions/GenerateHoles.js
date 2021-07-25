import {generateNumbers} from './GenerateNumbers';
import letterNumber from "../functions/LetterNumber"

export const generateHoles = (question_arr, range, diff_ratio) => {
  // diff range: minimum and maximum nbr that will be randomized.
  // ans_key: placeholder that will be collected into 'ans_keys'
  let diff_range = { min:0, max:0};
  let u_ans_temp = {}
  //nbr of holes: raw number of holes that will be generated.
  let nbr_of_holes = 0, rand, diff_range_nbr=0, ans_keys={};

  //for filtering commas and dots
  for (let i = 0; i<range.length-1; i++){
    // console.log("--------------"+i+"----------------")
    //generate nbrs from x to y
    // console.log("range: "+range[i]+"-"+range[i+1])
    //adjust how many holes per range.
    // ex: range 5 to 14:
    // they will generate x% from 9 (14-5).
    diff_range_nbr = range[i+1]-range[i];
    diff_range.min = Math.round(diff_ratio.min*diff_range_nbr);
    diff_range.max = Math.round(diff_ratio.max*diff_range_nbr);
    nbr_of_holes = generateNumbers(diff_range.min, diff_range.max);
    
    //generate holes
    for(let j = 0; j<nbr_of_holes; j++){
      rand = generateNumbers(range[i], (range[i+1]-1))

      //in case of duplicate number generated
      if(question_arr[rand].match(letterNumber)){
        //add to ans_keys
        ans_keys[rand]=(question_arr[rand]);
        //remove data from question array
        question_arr[rand] = "";
        //add to user ans template:
        u_ans_temp[rand] = {
          is_ans_correct:false,
          ans:""
        }
      }
    }
    //end of generate holes
    
  }
  return {
    question: question_arr,
    answer_key:ans_keys,
    user_answer_template:u_ans_temp,
  };
};