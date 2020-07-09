import React, {useEffect, useState} from 'react';
import './App.css';
import { Container } from 'reactstrap';
import Search from './components/Search';
import RepoList from './components/RepoList';
import axios from 'axios';

function App() {
//https://api.github.com/search/repositories?q=language:javascript+sort:stars

const [repos, setRepos] = useState([])

useEffect(() => {
  axios.get(`https://api.github.com/search/repositories?q=stars:>100000`)
        .then(res=>{
            console.log(res.data.items);
            setRepos(res.data.items)
        })
        .catch(err=>{
            console.log(err);
        })   
}, [])
  return (
    <Container>
      <Search />
      <RepoList repos = {repos} />
    </Container>
  );
}

export default App;
