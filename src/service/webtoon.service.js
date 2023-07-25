import { spawn } from 'child_process';
import iconv from 'iconv-lite';

/**
 * 제목과 설명으로 평점 예측하기
 * @param {string} title - 제목
 * @param {string} description - 설명
 * @returns {Array<string>}
 */
function predictRating(title, description) {
  return new Promise((resolve, reject) => {
    const file = './src/py_model/WT_Predict.py';
    const result = spawn('python', [file]);

    result.stdin.write(`${title}\n`); 
    result.stdin.write(`${description}\n`);
    result.stdin.end();

    result.stdout.on('data', (data) => {
      const decodedData = iconv.decode(data, 'euc-kr').split('\r\n');
      resolve(decodedData);
    });

    result.stderr.on('data', function (error) {
      reject(error);
    });
  });
}

/**
 * 리스트를 새로 만들어 반환
 * @param {Array<Object>} array 
 * @param {number} start 
 * @param {number} end 
 * @returns {Array<string>}
 */
function getList(array, start, end){
  const list = new Array();

  for(let i = start; i < end; i++){
    list.push(array[i]);
  }
  return list;
}

export default {
  getTextArrayWithSpaceDeleted: async (title, description) => {
    const textArray = await predictRating(title, description);
    return textArray.filter((data) => data != '');
  },

  getWebtoonData: (array) => {
    const classifierWebtoon = '유사 웹툰 분류';
    const recommendPlot = '추천 줄거리';

    const indexClassifierWebtoon = array.indexOf(classifierWebtoon);
    const indexRecommendPlot = array.indexOf(recommendPlot);

    // webtoon title
    const title = array[0];

    // webtoon description
    const startIndexDescription = 1;
    const endIndexDescription = indexClassifierWebtoon - 1;
    const listDescription = getList(array, startIndexDescription, endIndexDescription);

    // webtoon rating
    const rating = array[indexClassifierWebtoon - 1];

    // webtoon classifier similar webtoon    
    const startIndexSimilarWebtoon = indexClassifierWebtoon + 1;
    const endIndexSimilarWebtoon = indexRecommendPlot;
    const listSimilarWebtoon = getList(array, startIndexSimilarWebtoon, endIndexSimilarWebtoon);

    // recommend plot
    const startIndexRecommend = indexRecommendPlot + 1;
    const endIndexRecommend = array.length;
    const plot = getList(array, startIndexRecommend, endIndexRecommend)
    
    return {
      title : title,
      descrption : listDescription,
      rating : rating,
      similar_webtoon : listSimilarWebtoon,
      recommend_plot : plot
    };
  }

}