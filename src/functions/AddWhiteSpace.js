export const addWhiteSpace = (before, current, after) => {
  //if it's the beginning
  if(before === null){
    //if the next item is not dot/comma,  add -r_space-
    if(!after.match(/^[.,]+$/))
      return " ";
  }
  //if its in the middle
  else if(after !== null){
    // if the next content is NOT dot or comma, put a r_space
    if(!after.match(/^[.,]+$/)){
      //but if the next char or the char right now is strip (-), then don't put anything
      if(after!=="-" || current!=="-")
        return " ";
    }
  }
  else{
    return "";
  }
}