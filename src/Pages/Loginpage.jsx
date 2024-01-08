import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Text,
  Button,
  Input,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, signUp ,verifyOtp} from './firebaseAuth'; // Adjust the path accordingly
 // Adjust the path accordingly
 import cat from '../utils/cat.png'

const Loginpage = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginNumber, setLoginNumber] = useState('');
  const [home, setHome] = useState(true);
  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);
  const [thirdform, setThirdForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  // Add these lines with your other state declarations
const [otp, setOtp] = useState('');

  // const [first , second ,third ] =useState(first);


  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    try {
      if (login) {
        // Login
        if (!loginEmail || !loginPassword) {
          setFlag(true);
        } else {
          await signIn(loginEmail, loginPassword);
          setHome(!home);
          setFlag(false);
          setSuccessMessage('Login Successfull');
          
          localStorage.setItem("Email", loginEmail);

        
        }
      } else {
        // Signup
        if (!loginName || !loginEmail || !loginNumber || !loginPassword) {
          setFlag(true);
        } else {
          await signUp(loginEmail, loginPassword); // Adjust this for your signup logic
          // Additional logic for saving user details if needed
          setHome(!home);
          setFlag(false);
          setLogin(!login)
          setThirdForm(true)
          setSuccessMessage('SignUp Successfull')
        }
      }
    } catch (error) {
      console.error('Authentication Error:', error);
      setFlag(true);
    }

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  
  };
  const handleOtpSubmit = async () => {
    try {
      await verifyOtp(otp);
      setHome(!home);
      setSuccessMessage('Signup Successful.');
    } catch (error) {
      console.error('OTP Verification Error:', error.message);
      setFlag(true);
    }
  };

  return (
    <>
      <Box>
        {flag && (
          <Alert status="error">
            <AlertIcon />
            {login ? 'Login Failed' : 'Signup Failed'}
          </Alert>
        )}
        {successMessage && (
          <Alert status="success">
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        <Box margin="auto" maxW="800px" minWidth={'800px'} height={''} borderRadius="20px">
          <Flex>
            <Box minW={'51%'} height={''} marginTop="15px">
              <img src={cat} alt="login-State" width="800px" />
            </Box>
            <Box minWidth={'47%'} borderRightRadius="20px" bg={'#f5f7fa'}>
              <Flex
                boxSizing="borderbox"
                margin="60px 40px 10px 40px"
                fontSize="15px"
                color="#313131"
                fontWeight="548"
                fontFamily="Muli, sans-serif"
                display="inline-block"
              >
                {login ? (
                  <>
                    Login to your account!
                    <Input
                      onChange={(e) => setLoginEmail(e.target.value)}
                      value={loginEmail}
                      variant="flushed"
                      padding="20px 0px 4px 22px"
                      placeholder="Enter your email*"
                      aria-placeholder="Enter"
                      fontSize="13px"
                      textUnderlineOffset="black"
                      isRequired="true"
                      maxW="250px"
                      type="email"
                      tabIndex="0"
                      marginTop="30px"
                      bg={'white'}
                    />
                    <Input
                      onChange={(e) => setLoginPassword(e.target.value)}
                      value={loginPassword}
                      variant="flushed"
                      padding="20px 0px 4px 22px"
                      placeholder="Enter your password*"
                      aria-placeholder="Enter"
                      fontSize="13px"
                      textUnderlineOffset="black"
                      isRequired="true"
                      maxW="250px"
                      type="password"
                      tabIndex="0"
                      marginTop="30px"
                      bg={'white'}
                    />
                  </>
                ) : !showOtpForm ? (
                  <>
                    Enter your details to Signup
                    <Input
                      onChange={(e) => setLoginName(e.target.value)}
                      value={loginName}
                      variant="flushed"
                      padding="20px 0px 4px 22px"
                      placeholder="Enter your name*"
                      aria-placeholder="Enter"
                      fontSize="13px"
                      textUnderlineOffset="black"
                      isRequired="true"
                      maxW="250px"
                      type="text"
                      tabIndex="0"
                      marginTop="30px"
                      bg={'white'}
                    />
                    <Input
                      onChange={(e) => setLoginEmail(e.target.value)}
                      value={loginEmail}
                      variant="flushed"
                      padding="20px 0px 4px 22px"
                      placeholder="Enter your email*"
                      aria-placeholder="Enter"
                      fontSize="13px"
                      textUnderlineOffset="black"
                      isRequired="true"
                      maxW="250px"
                      type="email"
                      tabIndex="0"
                      marginTop="20px"
                      bg={'white'}
                    />
                    <Input
                      onChange={(e) => setLoginNumber(e.target.value)}
                      value={loginNumber}
                      variant="flushed"
                      padding="20px 0px 4px 22px"
                      placeholder="Enter your phone number*"
                      aria-placeholder="Enter"
                      fontSize="13px"
                      textUnderlineOffset="black"
                      isRequired="true"
                      maxW="250px"
                      type="number"
                      tabIndex="0"
                      marginTop="20px"
                      bg={'white'}
                    />
                    <Input
                      onChange={(e) => setLoginPassword(e.target.value)}
                      value={loginPassword}
                      variant="flushed"
                      padding="20px 0px 4px 22px"
                      placeholder="Enter your password*"
                      aria-placeholder="Enter"
                      fontSize="13px"
                      textUnderlineOffset="black"
                      isRequired="true"
                      maxW="250px"
                      type="password"
                      tabIndex="0"
                      marginTop="20px"
                      bg={'white'}
                    />
                  </>
                ) : (
                  <>
                    Enter the OTP sent to your email
                    <Input
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      variant="flushed"
                      padding="20px 0px 4px 22px"
                      placeholder="Enter OTP*"
                      aria-placeholder="Enter"
                      fontSize="13px"
                      textUnderlineOffset="black"
                      isRequired="true"
                      maxW="250px"
                      type="text"
                      tabIndex="0"
                      marginTop="20px"
                      bg={'white'}
                    />
                  </>
                )}
                <Text
                  onClick={() => setLogin(!login)}
                  marginLeft="10px"
                  marginTop={login ? '40px' : '20px'}
                  fontSize="14px"
                  color="#9c9c9c"
                  fontWeight="600"
                  cursor="pointer"
                >
                  {login ? (
                    <Link to="">Don't have an account? Create one</Link>
                  ) : !showOtpForm ? (
                    'Back to Login'
                  ) : (
                    'Resend OTP'
                  )}
                </Text>
                <Button
                  onClick={showOtpForm ? handleOtpSubmit : handleLoginSubmit}
                  disabled={
                    (login && (!loginPassword || !loginEmail)) ||
                    (!login &&
                      (!loginName ||
                        !loginEmail ||
                        !loginNumber ||
                        !loginPassword ||
                        (showOtpForm && !otp)))
                  }
                  fontSize="12px"
                  marginTop={login ? '70px' : '40px'}
                  padding="25px 100px"
                  bg="#dc3226"
                  color="white"
                  borderRadius="10px"
                  _hover="none"
                >
                  {showOtpForm ? 'Verify OTP' : 'Continue'}
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Loginpage;


