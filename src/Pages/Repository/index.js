/* eslint-disable camelcase */
import React, { Component } from 'react';
import parser from 'parse-link-header';
import { FaChevronLeft, FaSpinner, FaChevronRight } from 'react-icons/fa';

import api from '../../services/api';
import { Card } from '../../styles';
import {
  Loading,
  IssueList,
  IssueFilters,
  Owner,
  BackLink,
  FilterButton,
  IssueListPagination,
} from './styles';

export default class Repository extends Component {
  state = {
    repo: '',
    issues: [],
    loading: true,
    loadingIssues: false,
    filter: 'open',
    page: 1,
    per_page: 5,
    lastPage: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { per_page } = this.state;
    const repoName = decodeURIComponent(match.params.repo);
    this.setState({ loading: true });
    const [repo, issues] = await Promise.all([
      api.get(`repos/${repoName}`),
      this.fetchIssues(repoName),
    ]);

    this.setState({ repo: repo.data, issues, loading: false });
  }

  componentDidUpdate(_, prevState) {
    const { filter, page, per_page } = this.state;
    if (
      prevState.filter !== filter ||
      prevState.page !== page ||
      prevState.per_page !== per_page
    ) {
      this.updateIssues();
    }
  }

  updateIssues = async () => {
    this.setState({ loadingIssues: true });
    const issues = await this.fetchIssues();
    this.setState({ issues, loadingIssues: false });
    console.log(this.state);
  };

  fetchIssues = async (repoName = null) => {
    try {
      const { filter, page, per_page, repo } = this.state;
      repoName = repoName || (repo && repo.full_name);
      const params = {
        state: filter,
        page,
        per_page,
      };
      const response = await api.get(`repos/${repoName}/issues`, {
        params,
      });
      const pagination = parser(response.headers.link);
      const { last } = pagination || {};
      this.setState({ lastPage: (last && +last.page) || 1 });
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  handlePerPageChange = e => {
    this.setState({ per_page: +e.target.value, page: 1 });
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    this.setState({ page: page - 1 });
  };

  nextPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  render() {
    const {
      loading,
      repo,
      issues,
      filter,
      loadingIssues,
      page,
      lastPage,
    } = this.state;

    return (
      <>
        {loading ? (
          <Loading>Carregando...</Loading>
        ) : (
          <Card>
            <BackLink to="/">
              <FaChevronLeft />
              Voltar aos repositórios
            </BackLink>
            <Owner>
              <img src={repo.owner.avatar_url} alt={repo.owner.login} />
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <p>{repo.description}</p>
            </Owner>

            <IssueList>
              <IssueFilters loading={loadingIssues ? 1 : 0}>
                <FilterButton
                  onClick={() => this.setState({ filter: 'all', page: 1 })}
                  active={filter === 'all'}
                >
                  Todas
                </FilterButton>
                <FilterButton
                  onClick={() => this.setState({ filter: 'open', page: 1 })}
                  active={filter === 'open'}
                >
                  Abertas
                </FilterButton>
                <FilterButton
                  onClick={() => this.setState({ filter: 'closed', page: 1 })}
                  active={filter === 'closed'}
                >
                  Fechadas
                </FilterButton>

                <FaSpinner />
                <span>Carregando...</span>
              </IssueFilters>

              {issues.map(issue => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt="" />

                  <div>
                    <strong>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {issue.title}
                      </a>
                      {issue.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>

                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IssueList>

            <IssueListPagination>
              <button
                type="button"
                disabled={page === 1}
                onClick={this.prevPage}
              >
                <FaChevronLeft />
                Anterior
              </button>

              <div>
                <span>Por Página:</span>

                <select onChange={this.handlePerPageChange}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <button
                type="button"
                disabled={page >= lastPage}
                onClick={this.nextPage}
              >
                Próxima
                <FaChevronRight />
              </button>
            </IssueListPagination>
          </Card>
        )}
      </>
    );
  }
}
