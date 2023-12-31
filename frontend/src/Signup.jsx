import React from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Input,
  Button,
  Link as ChakraLink,
  Text,
  FormLabel,
  Stack,
} from '@chakra-ui/react';

const Signup = () => {
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
        <Heading mb={6} color="orange.500">Signup</Heading> {/* Change color to orange.500 */}

        {/* Username Input */}
        <FormLabel htmlFor="username" mb={2}>
          Username <Text as="span" color="red.500">*</Text>
        </FormLabel>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          mb={4}
          borderRadius="md"
          size="lg"
        />

        {/* Email Input */}
        <FormLabel htmlFor="email" mb={2}>
          Email <Text as="span" color="red.500">*</Text>
        </FormLabel>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          mb={4}
          borderRadius="md"
          size="lg"
        />

        {/* Password Input */}
        <FormLabel htmlFor="password" mb={2}>
          Password <Text as="span" color="red.500">*</Text>
        </FormLabel>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          mb={2}
          borderRadius="md"
          size="lg"
        />

        {/* Password Guidance */}
        <Text fontSize="sm" color="gray.600" mb={2}>
          Use a strong password with at least 8 characters, combining uppercase, lowercase, and symbols.
        </Text>

        {/* Password Strength Indicator (replace with actual strength indicator) */}
        <Stack spacing={1} direction="row" mb={4} align="center">
          {[1, 2, 3, 4].map((part) => (
            <Box
              key={part}
              flex={1}
              h="4px"
              bg={passwordStrength >= part * 25 ? "teal.500" : "gray.200"}
            />
          ))}
        </Stack>

        {/* Register Button */}
        <Button colorScheme="teal" size="lg" type="submit" mb={6}>
          Register
        </Button>

        {/* Login Link */}
        <Text>
          Already a user?{' '}
          <ChakraLink href="/login" color="teal.500" textDecoration="underline">
            Login instead.
          </ChakraLink>
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default Signup;
