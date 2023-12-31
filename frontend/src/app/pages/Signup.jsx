import React from 'react';
import usersApi from '../services/usersApi';
import {
  ChakraProvider,
  Box,
  Heading,
  Input,
  Button,
  Link as ChakraLink,
  Text,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import colorSchemes from '../common/colorSchemes';
import {useState, useEffect} from 'react';

const Signup = () => {
  useEffect(() => {
  usersApi.test().then((res) => {
    console.log(res);
  });
  }, []);

  const calculatePasswordStrength = () => {
    // Replace with your logic to calculate password strength (0-100)
    return 75;
  };

  const passwordStrength = calculatePasswordStrength();

  return (
    <ChakraProvider>
      <Box
        maxW="xl" // Slightly larger box
        mx="auto"
        mt={20}
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading mb={6} color={colorSchemes.primary}>
          Signup
        </Heading>

        {/* Username Input */}
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input type="text" id="username" placeholder="Username" borderRadius="md" size="lg" />
        </FormControl>

        {/* Email Input */}
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id="email" placeholder="Email" borderRadius="md" size="lg" />
        </FormControl>

        {/* Password Input */}
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input mb={2} type="password" id="password" placeholder="Password" borderRadius="md" size="lg" />
          {/* Password Strength Indicator (replace with actual strength indicator) */}
          <Stack spacing={1} direction="row" mb={2} align="center">
            {[1, 2, 3, 4, 5].map((part) => (
              <Box
                key={part}
                flex={1}
                h="4px"
                bg={passwordStrength >= part * 20 ? colorSchemes.warning : colorSchemes.secondary}
              />
            ))}
          </Stack>
          {/* Password Guidance */}
          <Text fontSize="sm" color={colorSchemes.info} mb={2}>
            Use a strong password with at least 8 characters, combining uppercase, lowercase, and symbols.
          </Text>
        </FormControl>

        {/* Register Button */}
        <Button
          style={{ backgroundColor: colorSchemes.primary, color: '#ffffff' }}
          size="lg" type="submit" mb={6}>
          Register
        </Button>

        {/* Login Link */}
        <Text>
          Already a user?{' '}
          <ChakraLink href="/login" color={colorSchemes.primary} textDecoration="underline">
            Login instead.
          </ChakraLink>
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default Signup;
