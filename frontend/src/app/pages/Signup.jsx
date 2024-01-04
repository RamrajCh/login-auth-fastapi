import React from 'react';
import usersApi from '../services/usersApi';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
  ChakraProvider,
  Box,
  Heading,
  Input, InputGroup, InputRightElement, Icon,
  Button,
  Link as ChakraLink,
  Text,
  FormControl,
  FormLabel,
  Stack, Alert, AlertIcon, CloseButton,
} from '@chakra-ui/react';
import colorSchemes from '../common/colorSchemes';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import passwordUtils from "../common/passwordUtils.jsx";
import config from '../config/config.js';

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    "user_name": "",
    "email": "",
    "password": "",
    "is_verified": false,
    "is_admin": false
  })
  const [errors, setErrors] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const passwordMatch = userData.password === confirmPassword;
  const [notification, setNotification] = useState(null);
  
  const onUsernameChange = (uname) => {
    if (errors !== null && uname !== null){
      setErrors({...errors, user_name: ""});
    }
    let user = {...userData, user_name: uname};
    setUserData(user);
  }

  const onEmailChange = (email) => {
    if (errors !== null && email !== null){
      setErrors({...errors, email: ""});
    }
    let user = {...userData, email: email};
    setUserData(user);
  }

  const onPasswordChange = (password) => {
    if (errors !== null && password !== null){
      setErrors({...errors, password: "", confirm_password: ""});
    }
    let user = {...userData, password: password};
    setUserData(user);
  }

  const checkValidity = () => {
    var errorCount = 0;
    var error = {
    "user_name": "",
    "email": "",
    "password": "",
    "confirm_password": "",
    "captcha": ""
  };
    // Empty Validation
    if (userData.user_name === ""){
      errorCount += 1;
      error["user_name"] = "Username is required field.";
    }
    if (userData.email === ""){
      errorCount += 1;
      error["email"] = "Email is required field.";
    }
    if (userData.password === ""){
      errorCount += 1;
      error["password"] = "Password is required field.";
    }
    if (confirmPassword === ""){
      errorCount += 1;
      error["confirm_password"] = "Confirm Password is required field.";
    }
    if (errorCount > 0) {
      setErrors(error);
      return false;
    }

    // Email Validity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)){
      setErrors({...errors, email: "Email address is not valid."});
      return false;
    }

    //Password Validity
    if(!passwordMatch){
      return false;
    }

    if (passwordStrength < 50) {
      setErrors({...errors, password: "Password is really weak. Please choose strong one."}); 
      return false;
    }

    var validation = passwordUtils.checkPasswordValidity(userData.password, confirmPassword)
    if(!validation[0]){
      setErrors({...errors, password: validation[1]});
      return false;
    }

    // Captcha Validation
    if (!captchaVerified) {
      setErrors({...errors, captcha: "Please complete the hCaptcha verification."});
      return false;
    }

    return true;
  }

  const handleSubmit = () => {
    setErrors(null);
    setIsLoading(true);
    if (checkValidity()) {
      usersApi.signup(JSON.stringify(userData)).then((res) => {
        var notification = {
          message: `Hi, ${userData.user_name}, you have successfully signed up. Before trying to login, confirm your email by clicking on the link provided in email.`,
          type: "success"
        }
        navigate("/signin", {state: notification});
      }).catch((e)=>{
        setNotification({
          'message': e.response.data.error,
          'type': "error"
        });
      })
    }
    setIsLoading(false);
  }

  const calculatePasswordStrength = () => {
    return passwordUtils.getPasswordStrength(userData.password);
  };

  const getBackgroundColor = (strength) => {
    if (strength <= 35) {
      return colorSchemes.danger;
    } else if (strength <= 75) {
      return colorSchemes.warning;
    } else {
      return colorSchemes.success;
    }
  };

  const handleCaptchaVerification = (token, ekey) => {
    var captchaToken = {
      token: token
    }
    usersApi.verifyCaptcha(captchaToken).then((res) => {
      setCaptchaVerified(true);
    }).catch((e) => {
      setCaptchaVerified(false);
    })
  }

  const closeNotification = () => {
    setNotification(null);
  };

  const passwordStrength = calculatePasswordStrength();

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
          Signup
        </Heading>

        {/* Notification Bar */}
        {notification && (
          <Alert status={notification.type} mb={4} rounded="md">
            <AlertIcon />
            {notification.message}
            <CloseButton onClick={closeNotification} position="absolute" right="8px" top="8px" />
          </Alert>
        )}

        {/* Username Input */}
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input type="text" id="username" placeholder="Username" borderRadius="md" size="lg"
          value={userData.username} 
          onChange={(e) => onUsernameChange(e.target.value)}/>
          {errors && errors?.username !== "" && 
            <Text fontSize="sm" color={colorSchemes.danger} mb={2}>
              {errors.user_name}
            </Text>
          }
        </FormControl>

        {/* Email Input */}
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id="email" placeholder="Email" borderRadius="md" size="lg" 
          value={userData.email} 
          onChange={(e) => onEmailChange(e.target.value)}/>
          {errors && errors?.email !== "" && 
            <Text fontSize="sm" color={colorSchemes.danger} mb={2}>
              {errors.email}
            </Text>
          }
        </FormControl>

        {/* Password Input */}
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input mb={2} 
                type={showPassword ? 'text' : 'password'} 
                id="password" placeholder="Password" borderRadius="md" size="lg" 
                value={userData.password}
                lineHeight="normal"
                onChange={(e) => onPasswordChange(e.target.value)}/>
              <InputRightElement display="flex" alignItems="center">
                <Icon
                  as={showPassword ? RiEyeOffFill : RiEyeFill} // Show different icons based on showPassword state
                  fontSize="lg"
                  color="gray.500"
                  cursor="pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
            {errors && errors?.password !== "" && 
              <Text fontSize="sm" color={colorSchemes.danger} mb={2}>
                {errors.password}
              </Text>
            }
          {/* Password Strength Indicator (replace with actual strength indicator) */}
          <Stack spacing={1} direction="row" mb={2} align="center">
            {[1, 2, 3, 4].map((part) => (
              <Box
                key={part}
                flex={1}
                h="4px"
                bg={(passwordStrength > part * 20 ) ? getBackgroundColor(passwordStrength) : "gray.500"}
              />
            ))}
          </Stack>
          {/* Password Guidance */}
          <Text fontSize="sm" color={colorSchemes.info} mb={2}>
            Use a strong password with at least 8 characters, combining uppercase, lowercase, and symbols.
          </Text>
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
          <Input mb={2} 
          type={showPassword ? 'text' : 'password'}
          id="confirm-password" placeholder="Confirm Password" borderRadius="md" size="lg"
          onChange={(e) => setConfirmPassword(e.target.value)}/>
          {errors && errors?.confirm_password !== "" && 
              <Text fontSize="sm" color={colorSchemes.danger} mb={2}>
                {errors.confirm_password}
              </Text>
            }
          {(userData.password !== "") && (!passwordMatch ?
            <Text fontSize="sm" color={colorSchemes.danger} mb={2}>
              Password and Confirm Password doesnot match.
            </Text> :
            <Text fontSize="sm" color={colorSchemes.success} mb={2}>
              Password and Confirm Password match.
            </Text>
          )}
        </FormControl>

        <FormControl mb={4}>
          <HCaptcha
            sitekey={config.HCAPTCHA_SITE_KEY}
            onVerify={(token,ekey) => handleCaptchaVerification(token, ekey)}
            onExpire={() => {setCaptchaVerified(false)}}
          />
          {errors && errors?.captcha !== "" && 
              <Text fontSize="sm" color={colorSchemes.danger} mb={2}>
                {errors.captcha}
              </Text>
            }
        </FormControl>

        {/* Register Button */}
        <Button
          style={{ backgroundColor: colorSchemes.primary, color: '#ffffff' }}
          size="lg" type="submit" mb={6}
          onClick={handleSubmit}
          isLoading={isLoading} >
          Register
        </Button>

        {/* Login Link */}
        <Text>
          Already a user?{' '}
          <ChakraLink href="/signin" color={colorSchemes.primary} textDecoration="underline">
            Login instead.
          </ChakraLink>
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default Signup;
