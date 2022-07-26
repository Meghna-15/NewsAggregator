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
  Image,
  Center,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useState, useContext } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { AccountContext } from "./Accounts";
import { useNavigate, Link } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const { authenticate } = useContext(AccountContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    authenticate(email, password)
      .then((data) => {
        Cookies.set("email", email);
        navigate("home");
      })
      .catch((err) => {
        console.log("Failed to login!", err);
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
              <Image src="favicon.png" alt="logo" width="25%" />
            </Center>
            <FormControl mt={10}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
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

              <FormLabel mt={3} htmlFor="password">
                Password
              </FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  isInvalid={isPasswordError}
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </InputGroup>
              {!isPasswordError ? (
                <></>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>

            <Button
              colorScheme="purple"
              width="100%"
              size="lg"
              mt={5}
              onClick={handleLogin}
            >
              Sign In
            </Button>

            <Link to="/register">
              <Button colorScheme="gray" width="100%" size="lg" mt={3}>
                Register
              </Button>
            </Link>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Login;
