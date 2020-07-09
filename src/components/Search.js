import React, {useState} from 'react';
import { Form, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import searchIcon from '../search-icon.png';
import SearchOptions from './SearchOptions';
import axios from 'axios';

export default function Search() {
    const [value, setValue] = useState('');
    const [lang, setLang] = useState('')
//+stars:>100000
    const searchRepos = (query)=>{
        setValue(query)
        axios.get(`https://api.github.com/search/repositories?q=${query}`)
        .then(res=>{
            console.log(res);
            
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
            
            <SearchOptions />
        </Form>
    )
}
