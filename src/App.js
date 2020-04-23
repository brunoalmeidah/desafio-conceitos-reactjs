import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const { data } = await api.post("repositories", {
      title: `Novo repositório ${Date.now()}`,
      url: "github.com.br/novorepositorio",
      techs: ["java", "react", "nodejs"],
    });

    setRepositories([...respositories, data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const newRepositories = respositories.filter((item) => item.id !== id);
      setRepositories(newRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
