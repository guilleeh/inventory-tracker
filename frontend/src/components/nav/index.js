import { Flex as Base } from 'rebass';
import styled from 'styled-components';

export const Flex = styled(Base)`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.darkSeaGreen};
`;
