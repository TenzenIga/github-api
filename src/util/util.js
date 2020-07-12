import moment from 'moment';
import axios from 'axios';


// Создаем ссылку дял запроса в соотвествии с включенными параметрами
export function generateUrl(query, lang, starsPrefix, stars, date){
    let url = `https://api.github.com/search/repositories?q=${query}`
    if(stars){
      url +=` stars:${starsPrefix + stars}`; 
    }
    if(lang){
        url +=` language:${lang}`;
    }
   if(date){
     url +=` created:>${moment(date).format("YYYY-MM-DD")}`;
   }
    return url;
}


 
export function searchRepos(search) {
    return axios(search)
      .then(r =>{
        return r.data.items})
      .catch(error => {
        return Promise.reject(error)
      });
  }

 
