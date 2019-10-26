import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Form, SubmitButton, RepoList } from './styles';
import { Card } from '../../styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repos: [],
    missingRepo: false,
    loading: false,
  };

  componentDidMount() {
    const repos = localStorage.getItem('repos');
    if (repos) {
      this.setState({ repos: JSON.parse(repos) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repos } = this.state;
    if (prevState.repos !== repos) {
      localStorage.setItem('repos', JSON.stringify(repos));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, missingRepo: false });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      this.setState({ loading: true });
      const { newRepo, repos } = this.state;
      if (
        repos.find(repo => repo.name.toLowerCase() === newRepo.toLowerCase())
      ) {
        throw new Error('Repositório duplicado');
      }

      const { data } = await api.get(`repos/${newRepo}`);

      const repo = { name: data.full_name };
      this.setState({ repos: [...repos, repo], newRepo: '' });
    } catch (error) {
      this.setState({ missingRepo: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repos, missingRepo, loading } = this.state;

    return (
      <Card>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form hasError={missingRepo} onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={newRepo}
            placeholder="Adicionar repositório"
          />

          <SubmitButton
            loading={loading ? 'true' : ''}
            onClick={this.handleSubmit}
          >
            {loading ? <FaSpinner /> : <FaPlus />}
          </SubmitButton>
        </Form>

        <RepoList>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </RepoList>
      </Card>
    );
  }
}
