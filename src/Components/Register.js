import {
  Flex,
  Grid,
  GridItem,
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  chakra,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ReactFlagsSelect from "react-flags-select";
import UserPool from "../UserPool.js";
import { useNavigate } from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CMdEmail = chakra(MdEmail);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [isUserNameError, setUserNameError] = useState(false);

  const [country, setCountry] = useState("IN");
  const onSelect = (code) => setCountry(code);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
  };

  const handleRegistration = (e) => {
    const attributeList = [];

    attributeList.push(
      new CognitoUserAttribute({ Name: "preferred_username", Value: username })
    );
    attributeList.push(
      new CognitoUserAttribute({ Name: "email", Value: email })
    );

    attributeList.push(
      new CognitoUserAttribute({ Name: "custom:Country", Value: country })
    );

    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <Grid
      templateRows={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
      templateColumns={{ base: "repeat(10, 1fr)", md: "repeat(8, 1fr)" }}
      gap={4}
    >
      <GridItem
        rowSpan={1}
        colStart={{ base: 2, md: 4 }}
        colEnd={{ base: 10, md: 6 }}
      >
        <Flex
          flexDirection="column"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="100%">
            <Center>
              <Heading as="h5">Register</Heading>
            </Center>
            <FormControl>
              <Box mt={10}>
                <FormLabel htmlFor="email">Country</FormLabel>
                <ReactFlagsSelect
                  optionsSize={18}
                  selected={country}
                  onSelect={onSelect}
                />
              </Box>
              <Box mt={3}>
                <FormLabel htmlFor="email">Username</FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />

                  <Input
                    isInvalid={isUserNameError}
                    id="email"
                    type="text"
                    value={username}
                    onChange={handleUserNameChange}
                  />
                </InputGroup>

                {!isUserNameError ? (
                  <></>
                ) : (
                  <FormErrorMessage>Username is required.</FormErrorMessage>
                )}
              </Box>

              <Box mt={3}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CMdEmail color="gray.300" />}
                  />

                  <Input
                    isInvalid={isEmailError}
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </InputGroup>

                {!isEmailError ? (
                  <></>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </Box>
              <Box mt={3}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="lg">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    isInvalid={isPasswordError}
                    id="email"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </InputGroup>
                {!isPasswordError ? (
                  <></>
                ) : (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </Box>
            </FormControl>
            <Button
              colorScheme="purple"
              width="100%"
              size="lg"
              mt={10}
              onClick={handleRegistration}
            >
              Register
            </Button>
            <Button colorScheme="gray" width="100%" size="lg" mt={3}>
              Login
            </Button>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Register;
