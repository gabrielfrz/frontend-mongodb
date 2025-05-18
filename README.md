# 🎬 Minha Biblioteca - Aplicação Full Stack com Autenticação JWT

Esta é uma aplicação full stack desenvolvida em **React + Node.js + MongoDB**, que permite aos usuários **cadastrarem, autenticarem e gerenciarem uma lista personalizada de filmes e livros**. Cada item pode ser marcado como "finalizado" e editado ou excluído com facilidade.

## 🚀 Funcionalidades

### 🧾 Telas públicas

- **Cadastro de Usuário**
  - Nome, e-mail e senha
  - Requisição `POST` para `/user/register`
  - Feedback visual com `react-toastify` para sucesso ou erro

- **Login**
  - E-mail e senha
  - Requisição `POST` para `/user/login`
  - Armazena token JWT no `localStorage`
  - Redireciona para a área protegida ao logar

### 🔒 Área Protegida (Dashboard)

- Requisições `GET`, `POST`, `PUT`, `DELETE` autenticadas para `/moviesbooks`
- Adição e edição de **filmes/livros** com:
  - Título, autor/diretor, gênero, ano de lançamento
  - Checkbox estilizado para marcar como "finalizado"
- Feedback visual com `toast` em todas as ações
- Botão de logout que limpa o token e retorna à tela de login
- Design moderno, responsivo e criativo com **React CSS modules**

## 🧪 Tecnologias utilizadas

- ⚛️ **React** com `react-router-dom` para navegação
- 🎨 Estilização com `CSS modules`
- 🔐 **JWT** para autenticação e controle de sessão
- 📦 `Fetch API` para requisições HTTP
- 📦 `React Toastify` para notificações
- 💾 `LocalStorage` para persistência de sessão
- 🌐 Backend com Express + MongoDB (não incluso neste repositório)


