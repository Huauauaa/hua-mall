import { Layout } from 'antd';
import styled from 'styled-components';

const profileWidth = '100px';
export const StyledCommonHeader = styled(Layout.Header)`
  padding: 0 10px;
  display: flex;
  background-color: #fff;

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
