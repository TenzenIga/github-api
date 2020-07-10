import React, { useContext} from 'react';
import './App.css';
import { Container } from 'reactstrap';
import Search from './components/Search';
import RepoList from './components/RepoList';
import { Store } from './context/context';
import Loading from './components/Loading';


function App() {

const  {state} = useContext(Store)
const {repos, loading} = state;
  return (
    <Container>
      <Search />
      { loading ? <Loading /> :  <RepoList repos = {repos} /> }
      
    </Container>
  );
}

export default App;
