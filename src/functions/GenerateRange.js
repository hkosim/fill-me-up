export const generateRange = (nbr_of_border, arr_length) => {
  let ratio_raw = [], ratio_nbr = [], sum_of_ratio_raw=0;
  let sum_of_ratio_nbr = 0;
  // range: 0, first range, 2nd, etc. ex: 7->[0, 2, 5, 7]
  let range = [];

  for(let i=0; i<nbr_of_border; i++){
    // assign ratio to an array
    ratio_raw[i] = Math.random();
    // add sum
    sum_of_ratio_raw += ratio_raw[i];
  }

  //calculate ratio number
  for(let i=0; i<nbr_of_border; i++){
    //normal ratio
    ratio_nbr[i] = Math.round(ratio_raw[i]/sum_of_ratio_raw * arr_length);
    sum_of_ratio_nbr += ratio_nbr[i];
    //if rounding causes the sum to be more
    if (sum_of_ratio_nbr > arr_length){
      ratio_nbr[i] -= (sum_of_ratio_nbr - arr_length);
      sum_of_ratio_nbr = arr_length;
      break;
    }
  }

  //if rounding causes the sum to be less
  if(sum_of_ratio_nbr < arr_length)
      ratio_nbr[ratio_nbr.length - 1] += (arr_length - sum_of_ratio_nbr);
    

  range[0] = 0;
  for(let i=0; i<nbr_of_border; i++){
    range[i+1] = range[i]+ratio_nbr[i]
  }
  return range;
}