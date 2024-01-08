import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Input,
  Image,
} from "@chakra-ui/react";
import LocationMenu from "./LocationMenu";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FcLike } from "react-icons/fc";


import React, { useState ,useEffect} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Loginpage from "../Pages/Loginpage";
import { AiOutlineSearch } from "react-icons/ai";
import logo from '../utils/rentomojologo.png'
import Signuppage from "../Pages/Signuppage";
import { getAuth, onAuthStateChanged,signOutUser } from '../Pages/firebaseAuth';

function WithSubnavigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userEmail, setUserEmail] = useState(localStorage.getItem("Email"));

  const [login, SetLogin] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      localStorage.setItem("Email", null);
      // Add any additional logic you need after logout
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  useEffect(() => {
    // Use onAuthStateChanged to listen for changes in authentication state
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      const newname=  localStorage.setItem("Email", user.email);
      console.log(newname); // undefined
        console.log(userEmail);
      } else {
        // User is not logged in, userEmail should be null
        setUserEmail(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // const user=auth();
  // console.log('auth',auth)
 
  // console.log(userEmail);

  return (
    <Box
      className="navbar"
      margin="auto"
      width="100%"
      bg={useColorModeValue("white")}
    >
      <Flex
        bg={useColorModeValue("white")}
        // bg={"transparent"}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        width={"90%"}
        margin="auto"
        gap="10px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        flexDirection="row"
        justifyContent={"space-between"}
        // border={"1px solid red"}
        padding="2px 5px 2px 2px"
      >
        <Link to="/">
          <Box cursor="pointer" marginLeft={"-15px"}>
            <Flex>
              <Image
                src={logo}
                // boxSize="80px"
                padding={"5px"}
                width={"60px"}
                h="60px"
              />
              <Text
                fontSize={25}
                textAlign="center"
                as=""
                marginLeft="0px"
                p="10px 5px"
                fontWeight="bold"
                color="rgb(109,109,109)"
                cursor="pointer"
              >
                rentomojo
              </Text>
            </Flex>
          </Box>
        </Link>
        <Box marginLeft="10px">
          <Flex>
            <LocationMenu />
          </Flex>
        </Box>
        <Box>
          <Flex
            border="1px solid rgb(186,186,186)"
            borderRadius={"10px"}
            padding="10px"
          >
            <Input
              placeholder="Search for products"
              type="search"
              variant="unstyled"
              width={"580px"}
              margin={"auto"}
              autoComplete="on"
              display={{ base: "none", md: "inline-flex" }}
            />
            <AiOutlineSearch size={"25px"} />
          </Flex>
        </Box>
        <Link to="/cart">
          <Flex alignItems={"center"} gap="10px" cursor="pointer">
            <BsCart2 size={"20px"} />
            <Text>Cart</Text>
          </Flex>
        </Link>

        <Link to="/wishlist">
          <FcLike color="red" size={"20px"} />
        </Link>

        { 
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"column"}
            spacing={6}
          >
            {userEmail ? (
   <Stack
   direction="column"
  align="center"
  spacing={4}
  cursor="pointer"
  _hover={{ color: "red" }}
  position="relative"
 >
   <Text
   
   fontSize="sm"
  //  display={{ base: "none", md: "inline-flex" }}
    fontWeight={600}
    color={"white"}
    bg={"red"}
    border="1px solid red"
    borderRadius={"8px"}
    padding="2px 15px"
    direction='row'
    _hover={{
      bg: "white",
      color: "red",
    }}
     
     > Hello {userEmail.length > 4 ? userEmail.substring(0, 4) + ".." : userEmail}</Text>
   <Button
      onClick={handleLogout} // Implement a function to handle logout
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"red"}
      border="1px solid red"
      borderRadius={"8px"}
     visibility={'hidden'}
        _hover={{
          bg: "white",
          color: "red",
          visibility: "visible",
          opacity: 1,
        }}
        position="absolute"
        top="100%"
        left="50%"
        transform="translateX(-50%)"
        transition="opacity 0.3s ease"
     
      // opacity={0} // Initial opacity set to 0
      // pointerEvents="none" // Disable pointer events to allow interaction with underlying text
      // transition="opacity 0.3s ease" // Add a transition effect
   >
     Logout
   </Button>
 </Stack>
    
    // <Button
    //   onClick={handleLogout} // Implement a function to handle logout
    //   display={{ base: "none", md: "inline-flex" }}
    //   fontSize={"sm"}
    //   fontWeight={600}
    //   color={"white"}
    //   bg={"red"}
    //   href={"#"}
    //   border="1px solid red"
    //   borderRadius={"8px"}
    //   _hover={{
    //     bg: "white",
    //     color: "red",
    //   }}
    // >
    //   Logout
    // </Button>
  ) : (
    // User is not logged in, show Login/Signup button
    <Button
      onClick={onOpen}
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"red"}
      href={"#"}
      border="1px solid red"
      borderRadius={"8px"}
      _hover={{
        bg: "white",
        color: "red",
      }}
    >
      LOGIN/SIGNUP
    </Button>
  )}

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent
                borderRadius="20px"
                margin="auto"
                minWidth={{ base: '90%', md: '800px' }}
                height={"280px"}
                top={'-40'}
                transform="translateY(-50%)"
              >
               <Loginpage/>

                <ModalCloseButton _hover={"none"} />

                {/* <ModalFooter>
              <Button color="white" bg="#bababa" variant="ghost">
                Continue
              </Button>
            </ModalFooter> */}
              </ModalContent>
            </Modal>
          </Stack>
        }
      </Flex>
    </Box>
  );
}

export default WithSubnavigation;
