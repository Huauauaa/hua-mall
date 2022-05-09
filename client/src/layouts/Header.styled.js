import styled from 'styled-components';
import { Layout } from 'antd';

export const StyledCommonHeader = styled(Layout.Header)`
  padding: 0;
  .ant-menu-submenu-disabled,
  .ant-menu-item-disabled {
    display: none;
  }
`;
