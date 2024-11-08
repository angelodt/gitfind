import { useState } from 'react';
import Header from '../../components/Header/'
import background from '../../assets/background.png'
import ItemList  from '../../components/ItemList'
import './styles.css'


const App = () => {
  const [userName, setUserName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repositories, setRepositories] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${userName}`);

    const newUser = await userData.json();
    console.log(newUser);

    if(newUser.name) {
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});
    
      const reposData = await fetch(`https://api.github.com/users/${userName}/repos`);
      const newRepository = await reposData.json();

      console.log(newRepository);
      if(newRepository.length) {
        setRepositories(newRepository);
      }
    }
  }

  return (
    <div className="App">
     <Header/>
     <div className='conteudo'>
        <div class="image-container">
          <img src={background} class="backgroundImage" alt='background app'/>
        </div>        
        <div className='info'>
          <div>
            <input className='input' name="usuario" placeholder="@username" 
              value={userName} 
              onChange={event => setUserName(event.target.value)}></input>
            <button className='button' onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? <>
          <div className='perfil'>
          <img src={currentUser.avatar_url} className='profile' alt='imgprofile'></img>
          <div>
            <h3>{currentUser.name}</h3>
            <span>@{currentUser.login}</span>
            <p>Descrição: {currentUser.bio}</p>
          </div>
        </div>
        <hr />
        </>
          :null}
          {repositories?.length ? <>
            <div>
            <h4 className='repositorio'>Repositórios</h4>
            {repositories.map( element =>(
              <ItemList title={element.name} description={element.description}></ItemList>
            ))}
          </div>
          </>
          :null}
        </div>
     </div>
    </div>
  );
}

export default App;
