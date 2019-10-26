import styled, { keyframes, css } from 'styled-components';

export const Title = styled.h1`
  color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;

  input {
    border: 1px solid #eee;
    ${({ hasError }) =>
      hasError &&
      css`
        border-color: #f56565;
      `}
    border-radius: 8px;
    padding: 10px 14px;
    width: 100%;
    min-height: 40px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const SubmitButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: Boolean(props.loading),
}))`
  min-height: 40px;
  min-width: 40px;
  border: 0;
  background-color: #7159c1;
  color: white;
  border-radius: 8px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &[disabled] {
    opacity: 0.6;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
export const RepoList = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 16px;

    a {
      text-decoration: none;
      color: #7159c1;
    }

    & + li {
      border-top: 1px solid #eee;
    }
  }
`;
