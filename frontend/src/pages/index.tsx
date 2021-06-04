import Head from 'next/head';
import { useRouter } from 'next/router';
import { Text, Box, Link, Heading, Button } from 'rebass';
import { Flex, Nav } from '../components/nav';

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Flex px={2} color="white" alignItems="center">
        <Text
          p={2}
          fontWeight="bold"
          fontSize={[2, 3]}
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
          Inventory Tracker
        </Text>
        <Box mx="auto" />
        <Link variant="nav" href="/signup" fontSize={[2, 3]} pr={2}>
          Sign Up
        </Link>
        <Link variant="nav" href="/login" fontSize={[2, 3]}>
          Login
        </Link>
      </Flex>
      <Flex
        justifyContent="center"
        backgroundColor="#f7f7f7"
        alignItems="flex-end"
        height={256}
      >
        <Heading fontSize={[6, 7]}>Inventory Tracker</Heading>
      </Flex>
      <Flex
        justifyContent="center"
        backgroundColor="#f7f7f7"
        alignItems="center"
      >
        <Heading fontSize={[3, 4]}>Keep track of all your inventory.</Heading>
      </Flex>
      <Flex
        justifyContent="center"
        backgroundColor="#f7f7f7"
        alignItems="center"
        height={100}
      >
        <Button
          variant="primary"
          mr={2}
          backgroundColor="#301014"
          color="#EDF4ED"
          style={{ cursor: 'pointer' }}
          fontSize={[1]}
          onClick={() => router.push('/login')}
        >
          Log in
        </Button>
      </Flex>
    </div>
  );
}
