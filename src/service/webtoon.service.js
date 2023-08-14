import axios from 'axios';

const REQUEST_URL = 'http://127.0.0.1:5000';
const REQUEST_IS_SUCCESS = `${REQUEST_URL}/predict/success`;
const REUQEST_PREDICTION_RATING = `${REQUEST_URL}/predict/rating`;


export default {
  getIsSuccess : async (title, description, genre, format) => {
    try {
      const success = await predictIsSuccess(title, description, genre, format);
      console.log(success);
      if(success == '1' || success == 1)
        return "성공";
      else if(success == '0' || success == 0)
        return "실패";
    } catch (error) {
      return error;      
    }
  },

  getPredictionRating : async (description, summary, genre) => {
    try {
      const body = {
        description : description,
        summary : summary,
        genre : genre
      };
      const headers = { "Content-Type" : "application/json" };
      const response = await axios.post(REUQEST_PREDICTION_RATING, body, headers);
      const data = await response.data;
      return data;
    } catch (error) {
      return error;      
    }
  },

  deleteEnter : (target) => {
    target = target.slice();
    const filtered = target.split('\n');
    let text = '';
    for(let i = 0; i < filtered.length; i++){
      text += filtered[i];
    }
    return text;
  },

}