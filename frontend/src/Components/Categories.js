import {
  Checkbox,
  Box,
  Grid,
  GridItem,
  Flex,
  SimpleGrid,
  Heading,
  Button,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AccountContext } from "./Accounts";
import axios from "axios";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Categories = () => {
  const categories = [
    "sport",
    "tech",
    "world",
    "finance",
    "politics",
    "business",
    "economics",
    "entertainment",
    "beauty",
    "travel",
    "music",
    "food",
  ];

  const navigate = useNavigate();

  const { poolcred } = useContext(AccountContext);
  const [favCategories, setFavCategories] = useState(categories);

  useEffect(() => {
    setFavCategories(categories);
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelection = (e) => {
    const value = e.target.value;
    if (selectedCategories.indexOf(value) < 0) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item != value));
    }
  };

  const saveFavorites = async () => {
    axios
      .post(process.env.REACT_APP_BASE_URL + "/users/favtopics", {
        email: Cookies.get("email"),
        subscriptions: selectedCategories,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setFavCategories(selectedCategories);
    navigate("/home");
  };

  return (
    <Box>
      <Box>
        <NavBar />
      </Box>
      <Grid
        templateRows={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
        templateColumns={{ base: "repeat(10, 1fr)", md: "repeat(8, 1fr)" }}
        gap={4}
      >
        <GridItem
          rowSpan={1}
          colStart={{ base: 2, md: 3 }}
          colEnd={{ base: 10, md: 7 }}
        >
          <Box>
            <Flex
              flexDirection="column"
              height="100vh"
              justifyContent="center"
              alignItems="center"
            >
              <Heading>Select Your Favorite</Heading>
              <SimpleGrid
                columns={{ base: 2, md: 3 }}
                spacing={5}
                mt={10}
                width="100%"
              >
                <CheckboxGroup
                  colorScheme="green"
                  defaultValue={selectedCategories}
                >
                  {categories.map((category, index) => (
                    <Box p={4} borderWidth="2px" borderRadius={5} key={index}>
                      <Checkbox
                        colorScheme="purple"
                        value={category}
                        onChange={handleSelection}
                      >
                        {category}
                      </Checkbox>
                    </Box>
                  ))}
                </CheckboxGroup>
              </SimpleGrid>
              <Button
                colorScheme="purple"
                width="100%"
                size="lg"
                mt={10}
                onClick={saveFavorites}
              >
                Save Favourites
              </Button>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Categories;
