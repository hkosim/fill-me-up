//border_ratio: ratio in which will be used to determine
// how many borders the program will generate; (bigger is harder)
//difficulty ratio (blanks from that particular part)
//ex: easy: 20% - 30%
const difficulty = {
  easy:{
    //number of border
    border_ratio:0.1,
    //difficulty ratio (easy: 20% - 30%)
    ratio:{
      min:0.2,
      max:0.3
    }
  },
  medium:{
    border_ratio:0.15,
    ratio:{
      min:0.3,
      max:0.5
    }
  },
  hard:{
    border_ratio:0.2,
    ratio:{
      min:0.5,
      max:0.7
    }
  },
  expert:{
    border_ratio:0.25,
    ratio:{
      min:0.7,
      max:0.8
    }
  }
};

export default difficulty;