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

const NavBar = () => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuList = ["home", "profile", "favorite", "categories", "logout"];
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();

  const { logout } = useContext(AccountContext);

  const handleLogout = () => {
    console.log("logout clicked");
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
                {menuList.map((item) => (
                  <Button
                    key={item}
                    color="white"
                    onClick={() =>
                      !(item === "logout")
                        ? navigate("/" + item + "")
                        : handleLogout()
                    }
                  >
                    {item}
                  </Button>
                ))}
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
                        <Link to="profile" p={3}>
                          {"profile"}
                        </Link>
                        <Box onClick={() => navigate("/favourite")} p={3}>
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
