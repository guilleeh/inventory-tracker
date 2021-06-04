import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Text, Box, Link, Heading, Button } from 'rebass';
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms';
import Loader from 'react-loader-spinner';
import { Flex, Nav } from '../components/nav';
import { apiFetch } from '../api/fetch';

export default function Inventory() {
  const router = useRouter();
  const [items, setItems] = useState(null);

  const inventoryCall = async () => {
    const id = window.localStorage.getItem('id');
    const url = process.env.API_URL + '/inventory/' + id;
    const resp = await apiFetch(url, 'get', null, null, true);
    if (resp.success) {
      console.log(resp);
      setItems(resp.data);
    } else {
      console.log(resp);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/inventory/${id}`);
  };

  const handleDelete = async (id) => {
    const url = process.env.API_URL + `/item/${id}`;
    const resp = await apiFetch(url, 'post', null, { id }, true);
    console.log(resp);
    if (resp.success) {
      inventoryCall();
    } else {
      console.log(resp);
    }
  };

  const handleNewItem = () => {
    router.push('/inventory/new');
  };

  useEffect(() => {
    inventoryCall();
  }, []);

  return (
    <div>
      <Nav />
      {!items ? (
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
            <Heading fontSize={[5]}>Inventory</Heading>
          </Flex>
          <Flex width="100%" justifyContent="center" backgroundColor="#e7e7e7e">
            <Box
              width={800}
              py={3}
              padding={4}
              style={{ border: '1px solid black', borderRadius: '5px' }}
            >
              {items.map((item, idx) => {
                return (
                  <Flex
                    mx={-2}
                    mb={3}
                    backgroundColor="#e7e7e7e"
                    id={item.name + idx}
                  >
                    <Box width={350} px={2}>
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        disabled
                        defaultValue={item.name}
                      />
                    </Box>
                    <Box width={100} px={2}>
                      <Label htmlFor="name">Item Type</Label>
                      <Select id="type" name="type" value={item.type} disabled>
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
                        value={item.quantity}
                        disabled
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
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="primary"
                          mr={2}
                          backgroundColor="darkgray"
                          color="#EDF4ED"
                          style={{ cursor: 'pointer' }}
                          fontSize={[1]}
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                );
              })}
              <Flex
                mx={-2}
                mb={3}
                backgroundColor="#e7e7e7e"
                justifyContent={items.length > 0 ? 'flex-end' : 'center'}
              >
                <Box>
                  <Button
                    variant="primary"
                    mr={2}
                    backgroundColor="#79B791"
                    color="#EDF4ED"
                    style={{ cursor: 'pointer' }}
                    fontSize={[1]}
                    onClick={handleNewItem}
                  >
                    Add New Item
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </>
      )}
    </div>
  );
}
