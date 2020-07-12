import React, { useContext, useEffect} from 'react';
import './App.css';
import { Container } from 'reactstrap';
import Search from './components/Search';
import RepoList from './components/RepoList';
import { Store } from './context/context';
import Loading from './components/Loading';
import { searchRepos } from './util/util';


function App() {

  const  {state ,dispatch} = useContext(Store)

  //изначально у нас будут отображаться все репозитории с больше 10к звездочек
  useEffect(() => {
    dispatch({type:'FETCH_DATA'}) // статус loading 
    searchRepos('https://api.github.com/search/repositories?q=stars:>100000') 
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
  }, [])
const {repos, loading} = state;
  return (
    <Container>
      <Search />
      { loading ? <Loading /> :  <RepoList repos = {repos} /> }
      
    </Container>
  );
}

export default App;
