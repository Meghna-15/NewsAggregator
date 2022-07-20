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
import { useState, useEffect } from "react";

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

  const saveFavorites = () => {
    setFavCategories(selectedCategories);
  };

  return (
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
  );
};

export default Categories;
