import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-form {
    width: 400px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px #ccc;
    .ant-btn {
      width: 100%;
    }
    .actions {
      width: 100%;
      display: flex;
      justify-content: space-around;
      a {
        display: inline-block;
      }
    }
  }
`;
