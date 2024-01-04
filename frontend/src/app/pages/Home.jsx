import React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Link as ChakraLink,
  Text,
  ChakraProvider, Alert, AlertIcon, CloseButton
} from '@chakra-ui/react';
import colorSchemes from '../common/colorSchemes';
import usersApi from '../services/usersApi';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [notification, setNotification] = useState(data)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token === null) {
      navigate("/signin");
    }
    else {
      usersApi.getUserByToken({token: token}).then((res)=>{
        setUserData(res.data);
      }).catch((e) =>{
        navigate("/signin");
      })
    }
  },[])

  const closeNotification = () => {
    setNotification(null);
  };

  const handleLogout = () => {
    setLoading(true);
    sessionStorage.removeItem('token');
    var data = {
      message: "Logout successfully!!",
      type: "success"
    }
    navigate("/signin", {state: data});

  }

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
                Hello {userData && userData.user_name}
            </Heading>

            {/* Notification Bar */}
            {notification && (
                <Alert status={notification.type} mb={4} rounded="md">
                <AlertIcon />
                {notification.message}
                <CloseButton onClick={closeNotification} position="absolute" right="8px" top="8px" />
                </Alert>
            )}

            {/* Login Button */}
            <Button
            style={{ backgroundColor: colorSchemes.danger, color: '#ffffff' }}
            size="lg"
            type="submit"
            mb={6}
            onClick={handleLogout}
            isLoading={loading}
            >
                Logout
            </Button>
        </Box>
    </ChakraProvider>
  );
};

export default Home;
