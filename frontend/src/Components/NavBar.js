import {
  Box,
  Stack,
  Button,
  Container,
  useColorModeValue,
  HStack,
  ButtonGroup,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Link,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useRef, useContext } from "react";
import { AccountContext } from "./Accounts";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavBar = () => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuList = ["home", "favorite", "categories", "logout"];
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();

  const { logout } = useContext(AccountContext);

  const handleLogout = () => {
    Cookies.remove("email");
    logout();
    navigate("/");
  };

  return (
    <Box
      as="nav"
      bg="#805AD5"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      position="fixed"
      width="100%"
      zIndex="popover"
    >
      <Container py={{ base: "4", lg: "5" }}>
        <HStack spacing="10" justify="space-between">
          {isDesktop ? (
            <Stack direction="row">
              <ButtonGroup variant="link" spacing="8">
                <Button color="white" onClick={() => navigate("/home")}>
                  Home
                </Button>
                <Button color="white" onClick={() => navigate("/favorite")}>
                  Favorites
                </Button>
                <Button color="white" onClick={() => navigate("/categories")}>
                  Categories
                </Button>
                <Button color="white" onClick={() => navigate("/logout")}>
                  Logout
                </Button>
              </ButtonGroup>
            </Stack>
          ) : (
            <Box>
              <FiMenu fontSize="1.25rem" onClick={onOpen} color="white" />
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent mt={50}>
                  <DrawerBody>
                    <ButtonGroup variant="link" spacing="8">
                      <Stack direction="column">
                        <Box onClick={() => navigate("/home")} p={3}>
                          home
                        </Box>
                        <Box onClick={() => navigate("/favorite")} p={3}>
                          {"favorite"}
                        </Box>
                        <Box onClick={() => navigate("/categories")} p={3}>
                          {"categories"}
                        </Box>
                        <Box onClick={() => handleLogout()} p={3}>
                          {"logout"}
                        </Box>
                      </Stack>
                    </ButtonGroup>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
          )}
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
