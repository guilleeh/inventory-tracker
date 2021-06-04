import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Text, Box, Link, Heading, Button } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import Loader from 'react-loader-spinner';
import { Flex, Nav } from '../../components/nav';
import { apiFetch } from '../../api/fetch';
import { Router } from 'next/router';

export default function New() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = window.localStorage.getItem('id');
    const url = process.env.API_URL + '/item';
    const resp = await apiFetch(
      url,
      'post',
      null,
      { name, type, quantity, id },
      true,
    );

    if (resp.success) {
      console.log(resp);
      router.push('/inventory');
    } else {
      console.log(resp);
    }
    setLoading(false);
  };

  return (
    <div>
      <Nav />
      <Flex
        backgroundColor="#e7e7e7e"
        paddingTop="100px"
        justifyContent="center"
      >
        <Heading fontSize={[5]}>Add New Item</Heading>
      </Flex>
      <Flex width="100%" justifyContent="center" backgroundColor="#e7e7e7e">
        <Box
          as="form"
          maxWidth={1500}
          onSubmit={onSubmit}
          py={3}
          padding={4}
          style={{ border: '1px solid black', borderRadius: '5px' }}
        >
          <Flex mx={-2} mb={3} backgroundColor="#e7e7e7e">
            <Box width={350} px={2}>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box width={100} px={2}>
              <Label htmlFor="name">Item Type</Label>
              <Select
                id="type"
                name="type"
                defaultValue=""
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value=""></option>
                <option value="fruit">Fruit</option>
                <option value="car">Car</option>
                <option value="book">Book</option>
                <option value="other">Other</option>
              </Select>
            </Box>
            <Box width={150} px={2}>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Box>
            <Box width={200}>
              <Flex
                backgroundColor="#e7e7e7e"
                paddingTop="20px"
                justifyContent="center"
              >
                <Button
                  variant="primary"
                  mr={2}
                  backgroundColor="#79B791"
                  color="#EDF4ED"
                  style={{ cursor: 'pointer' }}
                  fontSize={[1]}
                >
                  Add New Item
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
