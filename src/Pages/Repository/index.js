import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronLeft } from 'react-icons/fa';

import api from '../../services/api';
import { Loading } from './styles';
import { Card } from '../../styles';

export default class Repository extends Component {
  state = {
    repo: '',
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);
    this.setState({ loading: true });
    const [repo, issues] = await Promise.all([
      api.get(`repos/${repoName}`),
      api.get(`repos/${repoName}/issues`, { params: { per_page: 5 } }),
    ]);

    this.setState({ repo: repo.data, issues: issues.data, loading: false });
  }

  render() {
    const { loading, repo, issues } = this.state;
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
          </Card>
        )}
      </>
    );
  }
}

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
`;
const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
  }
  a {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
    text-decoration: none;
    &:hover {
      color: #7159c1;
    }
  }
  p {
    font-size: 14px;
    color: #999;
    max-width: 400px;
    text-align: center;
  }
`;

const IssueList = styled.ul`
  list-style: none;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 16px;
    & + li {
      margin-top: 10px;
    }

    img {
      margin-right: 10px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      strong {
        font-size: 16px;
        a {
          text-decoration: none;
          line-height: 1.4;
          color: #333;
          &:hover {
            color: #7159c1;
          }
        }

        span {
          background-color: #eee;
          color: #333;
          margin-left: 10px;
          padding: 3px 8px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          border-radius: 50rem;
        }
      }
      p {
        color: #999;
        font-size: 14px;
      }
    }
  }
`;
