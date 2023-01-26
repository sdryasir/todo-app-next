"use client"
import {Container, Box, Heading, List} from '@chakra-ui/react';
function Header() {
  return (
    <Box as='div' bg='todo.700' py='12px' _hover={{backgroundColor:'todo.800'}}>
      <Container as='div' maxW='1280px'>
        <Box>
          <Heading>Hello</Heading>
        </Box>
      </Container>
    </Box>
  )
}

export default Header