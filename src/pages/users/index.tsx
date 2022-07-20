import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

export default function UserList() {
  const { data, isLoading, error } = useQuery(['users'], async () => {
    const response = await fetch('http://localhost:3001/api/users');
    const data = response.json();
    return data;
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                cursor="pointer"
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner></Spinner>
            </Flex>
          ) : !error ? (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td px={['4', '4', '6']}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">Mateus Pegoraro</Text>
                        <Text fontSize="sm" color="gray.300">
                          mateus.pegoraro@email.com
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>04 de Abril, 2022</Td>}
                  </Tr>
                </Tbody>
              </Table>
              <Pagination />
            </>
          ) : (
            <Flex justify="center">
              <Text>Falha ao obter os dados</Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
