import React, {useState, useContext, useEffect} from 'react';
import { Form, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import searchIcon from '../search-icon.png';
import SearchOptions from './SearchOptions';
import {generateUrl, searchRepos} from '../util/util';
import { Store } from '../context/context';
import useDebounce from '../util/useDebounce';

  
export default function Search() {
    const  {dispatch} = useContext(Store);
    const [searchValue, setSearchValue] = useState('');
    const [language, setLanguage ] = useState('');
    const [startDate, setStartDate] = useState('');
    const [stars, setStars] = useState('');
    const [starsPrefix, setStarsPrefix] = useState('>');

    const handleStarsInput = (e) =>{
        const re = /^[0-9\b]+$/;

         // Принимаем только числа
        if (e.target.value === '' || re.test(e.target.value)) {
        setStars(e.target.value)
            }
    }

    const handleDateSelect = (date) =>{
        setStartDate(date);
        const url = generateUrl(searchValue, language, starsPrefix, stars, date);
        handleApiCall(url);
    }

    const handleLangSelect = (e)=>{
        const selectedLang = e.target.innerText;
        if(selectedLang === 'Any'){
            setLanguage('');
        }else{
            setLanguage(selectedLang)
        }
        
        const url = generateUrl(searchValue, selectedLang, starsPrefix, stars, startDate);
        handleApiCall(url);
    }

    const handlePrefix = (e) =>{
        // если количество звездочек не указано, не запускаем функцию
        if(stars === ''){
            return;
        }
        let selectedPrefix = '';
        if(e.target.innerText === 'Less than'){
            selectedPrefix = '<';
            setStarsPrefix(selectedPrefix);
        }else{
            selectedPrefix = '>'
            setStarsPrefix(selectedPrefix);
        }
        const url = generateUrl(searchValue, language, selectedPrefix, stars, startDate);
        handleApiCall(url);
    }

    const handleApiCall = (url) =>{
        //имя репозитория обязательно
        if(searchValue){ 
            dispatch({type:'FETCH_DATA'}) // статус loading 
            
            searchRepos(url)
            .then(res=>{ // Сделать запрос к АПИ
                dispatch({
                    type:'SET_DATA',
                    payload:res
                })
            })
            .catch(err=>{
                dispatch({
                    type:'FETCH_DATA_FAIL',
                    payload:err
                })
            })
            }else{ //если главный инпут пустой, возвращаем пустой масив
                dispatch({
                    type:'SET_DATA',
                    payload:[]
                })
            }
    }
    
    const debouncedValue= useDebounce(searchValue, 500);
    const debounceStars = useDebounce(stars, 500);
    // использую debounce и useEffect для инпута с колчеством звездочек и поисковой строки т.к их можно тригерить очень быстро. 
    useEffect(
        () => {
            let url = '';
            if(debounceStars){
                url = generateUrl(searchValue, language, starsPrefix, debounceStars, startDate);
                handleApiCall(url)
            }else if (debouncedValue) {
                url = generateUrl(debouncedValue, language, starsPrefix, stars, startDate)
                handleApiCall(url)
            }else{
                dispatch({
                    type:'SET_DATA',
                    payload:[]
                  })
            } 
        },
        // Это массив зависимостей useEffect
        // Хук useEffect сработает только если отложенное значение изменится ...
        [debouncedValue, debounceStars]
      );

    return (
        <Form className='mt-4'>
            <InputGroup>
                <Input placeholder="Search" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                <InputGroupAddon addonType="prepend"> <InputGroupText><img src={searchIcon} style={{width:"24px"}} alt=''/></InputGroupText></InputGroupAddon>
            </InputGroup>
            
            <SearchOptions 
                handlePrefix={handlePrefix}
                language={language} 
                handleLangSelect={handleLangSelect} 
                handleStarsInput={handleStarsInput} 
                stars={stars} 
                startDate={startDate}
                handleDateSelect={handleDateSelect}
                starsPrefix={starsPrefix} 
            />
        </Form>
    )
}
