import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Loading = styled.div`
  position: fixed;
  color: white;
  width: 100%;
  height: 100%;
  background-color: #7159c1;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const IssueFilters = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
  }
  svg,
  span {
    color: #666;
    opacity: 0;
  }
  ${({ loading }) =>
    loading &&
    css`
      span {
        opacity: 1;
      }
      svg {
        animation: ${rotate} 2s linear infinite;
        opacity: 1;
      }
    `}
`;
export const FilterButton = styled.button`
  margin-right: 10px;
  border: 0;
  background-color: #eee;
  color: #333;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 50rem;
  ${({ active }) =>
    active &&
    css`
      color: white;
      background-color: #7159c1;
    `}
`;

export const IssueList = styled.ul`
  margin-top: 30px;
  list-style: none;
  padding-top: 20px;
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

export const Owner = styled.header`
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

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  svg {
    margin-right: 4px;
  }
`;

export const IssueListPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  button {
    padding: 10px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    border: 0;
    background-color: #fff;
    transition: all 0.2s ease;

    &:hover {
      background-color: #eee;
    }

    &:first-child {
      svg {
        margin-right: 4px;
      }
    }

    &:last-child {
      svg {
        margin-left: 4px;
      }
    }

    &[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
      &:hover {
        background-color: initial;
      }
    }
  }

  div {
    select {
      border: 0;
      background-color: #eee;
      padding: 6px 10px;
      border-radius: 6px;
      margin-left: 10px;
    }
  }
`;
