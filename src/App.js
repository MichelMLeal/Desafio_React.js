import React,{ useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
      })
  }, [repositories])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `My repository ${Date.now()}`,
      url: "https://github.com/MichelMLeal/Desafio_React.js.git",
      techs: ["Node.js", "React.js", "..."],
      like: 0
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(response =>{
      setRepository([...repositories]);
    })
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
