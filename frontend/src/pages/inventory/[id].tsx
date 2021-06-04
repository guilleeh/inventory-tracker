import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Text, Box, Link, Heading, Button } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import Loader from 'react-loader-spinner';
import { Flex } from '../../components/nav';
import { apiFetch } from '../../api/fetch';

export default function Inventory() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.API_URL + `/item/${id}`;
    const resp = await apiFetch(
      url,
      'put',
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
  };

  useEffect(() => {
    const itemCall = async () => {
      const url = process.env.API_URL + '/item/' + id;
      const resp = await apiFetch(url, 'get', null, null, true);
      if (resp.success) {
        setName(resp.data.name);
        setType(resp.data.type);
        setQuantity(resp.data.quantity);
        setItem(resp.data);
      } else {
        console.log(resp);
      }
    };

    itemCall();
  }, []);

  return (
    <div>
      <Flex px={2} color="white" alignItems="center">
        <Text p={2} fontWeight="bold" fontSize={[2, 3]}>
          Inventory Tracker
        </Text>
        <Box mx="auto" />
        <Link variant="nav" href="/login" fontSize={[2, 3]}>
          Logout
        </Link>
      </Flex>
      {!item ? (
        <Flex
          backgroundColor="#e7e7e7e"
          paddingTop="100px"
          justifyContent="center"
        >
          <Loader type="Circles" color="black" height={50} width={50} />
        </Flex>
      ) : (
        <>
          <Flex
            backgroundColor="#e7e7e7e"
            paddingTop="100px"
            justifyContent="center"
          >
            <Heading fontSize={[5]}>Edit Item</Heading>
          </Flex>
          <Flex width="100%" justifyContent="center" backgroundColor="#e7e7e7e">
            <Box
              as="form"
              maxWidth={1500}
              onSubmit={handleSubmit}
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
                      backgroundColor="#301014"
                      color="#EDF4ED"
                      style={{ cursor: 'pointer' }}
                      fontSize={[1]}
                    >
                      Save Item
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </>
      )}
    </div>
  );
}
