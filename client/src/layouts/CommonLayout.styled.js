import { Layout } from 'antd';
import styled from 'styled-components';
const { Header, Content } = Layout;
const profileWidth = '100px';
export const StyledCommonHeader = styled(Header)`
  padding: 0 10px;
  display: flex;
  background-color: #fff;
  height: ${({ theme }) => theme.headerHight};

  .profile {
    margin-left: auto;
    width: ${profileWidth};
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    &:hover {
      filter: grayscale(50%);
    }
  }

  .ant-menu {
    width: calc(100% - ${profileWidth});
  }
  .ant-menu-submenu-disabled,
  .ant-menu-item-disabled {
    display: none;
  }
`;

export const StyledCommonContent = styled(Content)`
  height: calc(100% - ${({ theme }) => theme.headerHight});
  padding: 10px;
  .ant-table,
  .ant-tree {
    margin-top: 10px;
  }
`;

export const StyledCommonLayout = styled(Layout)`
  height: 100%;
`;
