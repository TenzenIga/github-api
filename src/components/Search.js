import React, {useState, useContext} from 'react';
import { Form, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import searchIcon from '../search-icon.png';
import SearchOptions from './SearchOptions';

import axios from 'axios';
import {generateUrl} from '../util/util';
import { Store } from '../context/context';

export default function Search() {
    const  {state, dispatch} = useContext(Store)
    const [value, setValue] = useState('');
    const [language, setLanguage ] = useState('Any');
    const [startDate, setStartDate] = useState(new Date());
    const [stars, setStars] = useState(1000);
    const [starsPrefix, setStarsPrefix] = useState('>');

    const handleSelect = (e)=>{
        setLanguage(e.target.innerText)
    }

    const handlePrefix = (e) =>{
        if(e.target.innerText === 'Less than'){
            setStarsPrefix('<')
        }else{
            setStarsPrefix('>')
        }
    }

    const searchRepos = (query)=>{
        setValue(query)
        axios.get(generateUrl(query, language, starsPrefix, stars, startDate))
        .then(res=>{
            return dispatch({
                type:'FETCH_DATA',
                payload:res.data.items
              })
        })
        .catch(err=>{
            console.log(err);
        })   
      }

    return (
        <Form className='mt-4'>
            <InputGroup>
                <Input placeholder="Search" value={value} onChange={(e)=>searchRepos(e.target.value)} />
                <InputGroupAddon addonType="prepend"> <InputGroupText><img src={searchIcon} style={{width:"24px"}} alt=''/></InputGroupText></InputGroupAddon>
            </InputGroup>
            
            <SearchOptions 
                heandlePrefix={handlePrefix}
                language={language} 
                handleSelect={handleSelect} 
                setStars={setStars} 
                stars={stars} 
                startDate={startDate}
                setStartDate={setStartDate}
                starsPrefix={starsPrefix} 
            />
        </Form>
    )
}
