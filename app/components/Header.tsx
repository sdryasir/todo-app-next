"use client"
import { ReactNode, useRef } from 'react';
import {
  Container,
  Heading,
  Text,
  Divider,
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { BsFacebook, BsLinkedin, BsYoutube, BsGithub, BsGlobe } from "react-icons/bs";

function SideDrawer({isOpen, onClose, btnRef}:any) {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>About the Developer</DrawerHeader>

          <DrawerBody>
              
              <Heading>
                <Text as={'span'} color={'orange.400'}>
                  Mr. Yasir Ali
                </Text>
              </Heading>
              <Divider />
              <Text>Software Engineer | YouTuber</Text>
              <Divider />
              <Text color={'gray.500'} mt={6} textAlign='justify'>
                Experienced Full-Stack web developer with excellent communication and interpersonal skills, skilled in technologies, 
              </Text>
              <Text color={'gray.500'} mt={6} textAlign='justify'>
                Student at PIAIC for the program "Certified web 3.0 and Metaverse Development" 
              </Text>
              <Flex bg={'gray.500'} py={2} color='#fff' borderRadius={6} mt='6' justifyContent='space-around'>
                <a href="https://sdryasir.github.io/yasir" target="_blank"><BsGlobe/></a>
                <a href="https://web.facebook.com/yasiraiit" target="_blank"><BsFacebook/></a>
                <a href="https://www.linkedin.com/in/sdryasir" target="_blank"><BsLinkedin/></a>
                <a href="https://www.youtube.com/@SuperCodepk" target="_blank"><BsYoutube/></a>
                <a href="https://github.com/sdryasir" target="_blank"><BsGithub/></a>
              </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}


export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef() as React.LegacyRef<HTMLButtonElement>
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Container maxW='1280px'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>TODO APP</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
            <Button ref={btnRef} colorScheme='#fff' variant='ghost' onClick={onOpen}>
              About
            </Button>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
        </Container>
        <SideDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} btnRef={btnRef} />
      </Box>
    </>
  );
}
