import moment from 'moment';
import axios from 'axios';

export function generateUrl(query, lang, starsPrefix, stars, date){
    let url = `https://api.github.com/search/repositories?q=${query} stars:${starsPrefix + stars}`
    if(lang !== 'Any'){
        url = `${url} language:${lang}`;
    }
    return `${url} created:>${moment(date).format("YYYY-MM-DD")}`
}


 
export function searchRepos(search) {
    // const queryString = generateUrl(search)
    return axios(search)
    //   .then(r =>{
    //     console.log(r) 
    //     r.json()
    //   })
      .then(r => r.data.items)
      .catch(error => {
        return error;
      });
  }