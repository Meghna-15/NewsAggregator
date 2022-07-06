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

const NavBar = () => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuList = ["home", "profile", "favorite", "categories", "logout"];
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const { logout } = useContext(AccountContext);

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
                  <Button key={item} color="white">
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
                        {menuList.map((item) => (
                          <Link to={item} p={3}>
                            {item}
                          </Link>
                        ))}
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
