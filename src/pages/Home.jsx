import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-overlay">
        <div className="home-content">
          <h1>Bem-vindo ao MovieBook</h1>
          <p>
            Organize todos os filmes e livros que você quer assistir ou já concluiu. Simples, fácil e sempre acessível.
          </p>
          <div className="home-buttons">
            <Link to="/login"><button className="home-btn">Fazer Login</button></Link>
            <Link to="/register"><button className="home-btn secondary">Criar Conta</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
