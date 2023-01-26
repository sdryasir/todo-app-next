"use client";

import React from 'react'

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  todo: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function ChakraWrapper({children}: {children: React.ReactNode}){
  return (
    <ChakraProvider theme={theme}>
    {children}
    </ChakraProvider>
  )
}

export default ChakraWrapper