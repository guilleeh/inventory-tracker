import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Text, Box, Link, Heading, Button } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import { Flex } from '../components/nav';
import { apiFetch } from '../api/fetch';

export default function SignUp() {
  const url = process.env.API_URL + '/sign-up';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await apiFetch(url, 'post', null, { email, password, name });
    if (resp.success) {
      console.log(resp);
      router.push('/login');
    } else {
      setError('Incorrect email or password.');
    }
  };
  return (
    <div>
      <Flex px={2} color="white" alignItems="center">
        <Text
          p={2}
          fontWeight="bold"
          fontSize={[2, 3]}
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer' }}
        >
          Inventory Tracker
        </Text>
        <Box mx="auto" />
        <Link variant="nav" href="/login" fontSize={[2, 3]}>
          Login
        </Link>
      </Flex>
      <Flex
        backgroundColor="#e7e7e7e"
        paddingTop="100px"
        justifyContent="center"
      >
        <Heading fontSize={[5]}>Sign Up</Heading>
      </Flex>
      <Flex width="100%" justifyContent="center" backgroundColor="#e7e7e7e">
        <Box
          as="form"
          maxWidth={1000}
          onSubmit={handleSubmit}
          py={3}
          padding={4}
          style={{ border: '1px solid black', borderRadius: '5px' }}
        >
          <Flex mx={-2} mb={3} backgroundColor="#e7e7e7e">
            <Box width={500} px={2}>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
          </Flex>
          <Flex mx={-2} mb={3} backgroundColor="#e7e7e7e">
            <Box width={500} px={2}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          </Flex>
          <Flex mx={-2} mb={3} backgroundColor="#e7e7e7e">
            <Box width={500} px={2}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </Flex>
          <Flex
            mx={-2}
            mb={3}
            backgroundColor="#e7e7e7e"
            justifyContent="flex-end"
          >
            <Box>
              <Button
                variant="primary"
                mr={2}
                backgroundColor="#301014"
                color="#EDF4ED"
                style={{ cursor: 'pointer' }}
                fontSize={[1]}
              >
                Sign Up
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
