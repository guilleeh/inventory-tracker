import Head from 'next/head';
import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import { Text, Box, Link, Heading, Button } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import { Flex } from '../components/nav';
import { apiFetch } from '../api/fetch';

export default function Login() {
  const url = process.env.API_URL + '/sign-in';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resp = await apiFetch(url, 'post', null, { email, password });
    if (resp.success) {
      console.log(resp);
      window.localStorage.setItem('jwt', resp.data.jwt);
      window.localStorage.setItem('id', resp.data.id);
      router.push('/inventory');
    } else {
      setError('Incorrect email or password.');
    }
    setLoading(false);
  };

  return (
    <div>
      <Flex px={2} color="white" alignItems="center">
        <Text p={2} fontWeight="bold" fontSize={[2, 3]}>
          Inventory Tracker
        </Text>
        <Box mx="auto" />
        <Link variant="nav" href="/signup" fontSize={[2, 3]}>
          Sign Up
        </Link>
      </Flex>
      <Flex
        backgroundColor="#e7e7e7e"
        paddingTop="100px"
        justifyContent="center"
      >
        <Heading fontSize={[5]}>Log In</Heading>
      </Flex>
      <Flex width="100%" justifyContent="center" backgroundColor="#e7e7e7e">
        <Box
          as="form"
          maxWidth={1000}
          onSubmit={onSubmit}
          py={3}
          padding={4}
          style={{ border: '1px solid black', borderRadius: '5px' }}
        >
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
            {loading && (
              <Loader type="Circles" color="black" height={25} width={25} />
            )}
            <Box ml={2}>
              <Button
                variant="primary"
                mr={2}
                backgroundColor="#301014"
                color="#EDF4ED"
                style={{ cursor: 'pointer' }}
                fontSize={[1]}
              >
                Login
              </Button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
