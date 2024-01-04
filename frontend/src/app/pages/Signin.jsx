import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link as ChakraLink,
  Text,
  ChakraProvider, Alert, AlertIcon, CloseButton
} from '@chakra-ui/react';
import colorSchemes from '../common/colorSchemes';
import usersApi from '../services/usersApi';
import { useLocation, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const notification_1 = location.state;
  const [notification, setNotification] = useState(notification_1);

  const closeNotification = () => {
    setNotification(null);
  };
  
  const handleLogin = () => {
    setLoading(true);
    usersApi.signin({user_name: usernameOrEmail, password: password}).then((res) => {
      var notFic = {
        'message': "Login successful!!",
        'type': "success"
      };
      sessionStorage.setItem('token', res.data.token)
      navigate("/", {state: notFic});
    }).catch((e) => {
      setNotification({
        'message': "Login credentials doesnot match",
        'type': "error"
      });
    }).finally(() => {
      setLoading(false);
    })
  };

  return (
    <ChakraProvider>
        <Box
        maxW="xl"
        mx="auto"
        mt={20}
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        >
            <Heading mb={6} color={colorSchemes.primary}>
                Sign In
            </Heading>

            {/* Notification Bar */}
            {notification && (
                <Alert status={notification.type} mb={4} rounded="md">
                <AlertIcon />
                {notification.message}
                <CloseButton onClick={closeNotification} position="absolute" right="8px" top="8px" />
                </Alert>
            )}

            {/* Username/Email Input */}
            <FormControl mb={4} isRequired>
            <FormLabel htmlFor="usernameOrEmail">Username or Email</FormLabel>
            <Input
                type="text"
                id="usernameOrEmail"
                placeholder="Username or Email"
                borderRadius="md"
                size="lg"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            </FormControl>

            {/* Password Input */}
            <FormControl mb={4} isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
                type="password"
                id="password"
                placeholder="Password"
                borderRadius="md"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </FormControl>

            {/* Login Button */}
            <Button
            style={{ backgroundColor: colorSchemes.primary, color: '#ffffff' }}
            size="lg"
            type="submit"
            mb={6}
            onClick={handleLogin}
            isLoading={loading}
            >
                Login
            </Button>

            {/* Prompt */}
            <Text>
                Not a user?{' '}
                <ChakraLink href="/signup"
                color={colorSchemes.primary} textDecoration="underline">
                    Register instead.
                </ChakraLink>
            </Text>
        </Box>
    </ChakraProvider>
  );
};

export default Signin;
