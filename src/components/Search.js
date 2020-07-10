import React, {useState, useContext, useEffect} from 'react';
import { Form, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import searchIcon from '../search-icon.png';
import SearchOptions from './SearchOptions';
import {generateUrl, searchRepos} from '../util/util';
import { Store } from '../context/context';
import useDebounce from '../util/useDebounce';

export default function Search() {
    const  {dispatch} = useContext(Store)
    const [searchValue, setSearchValue] = useState('');
    const [language, setLanguage ] = useState('Any');
    const [startDate, setStartDate] = useState(new Date('01/01/2010'));
    const [stars, setStars] = useState(10000);
    const [starsPrefix, setStarsPrefix] = useState('>');


    const handleLangSelect = (e)=>{
        setLanguage(e.target.innerText)
    }

    const handlePrefix = (e) =>{
        if(e.target.innerText === 'Less than'){
            setStarsPrefix('<')
        }else{
            setStarsPrefix('>')
        }
    }
    const url= useDebounce(generateUrl(searchValue, language, starsPrefix, stars, startDate), 500)
    //const debouncedSearchTerm = useDebounce(searchValue, 500);

    useEffect(
      
        () => {
          // Убедиться что у нас есть значение (пользователь ввел что-то)
       
            // Выставить состояние loading

            dispatch({type:'FETCH_DATA'})
            //let url = generateUrl(debouncedSearchTerm, language, starsPrefix, stars, startDate)
            // Сделать запрос к АПИ
            searchRepos(url)
            .then(res=>{
                console.log(res)
                return dispatch({
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
        },
        // Это массив зависимостей useEffect
        // Хук useEffect сработает только если отложенное значение изменится ...
        [url]
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
                setStars={setStars} 
                stars={stars} 
                startDate={startDate}
                setStartDate={setStartDate}
                starsPrefix={starsPrefix} 
            />
        </Form>
    )
}
