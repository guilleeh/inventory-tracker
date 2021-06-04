import { Flex as Base, Text, Box, Link } from 'rebass';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export const Flex = styled(Base)`
  background-color: ${(props) =>
    props.backgroundColor || props.theme.colors.darkSeaGreen};
`;

export const Nav = () => {
  const router = useRouter();

  const handleLogout = () => {
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('id');
    router.push('/');
  };

  return (
    <Flex px={2} color="white" alignItems="center">
      <Text p={2} fontWeight="bold" fontSize={[2, 3]}>
        Inventory Tracker
      </Text>
      <Box mx="auto" />
      <Link
        variant="nav"
        fontSize={[2, 3]}
        onClick={handleLogout}
        style={{ cursor: 'pointer' }}
      >
        Logout
      </Link>
    </Flex>
  );
};
