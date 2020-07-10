import moment from 'moment';


export function generateUrl(query, lang, starsPrefix, stars, date){
    let url = `https://api.github.com/search/repositories?q=${query} stars:${starsPrefix + stars}`
    if(lang !== 'Any'){
        url = `${url} language:${lang}`;
    }
    return `${url} created:>${moment(date).format("YYYY-MM-DD")}`
}