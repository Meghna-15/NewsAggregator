import {
  Box,
  Image,
  Text,
  Badge,
  Stack,
  Button,
  Container,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AiFillHeart } from "react-icons/ai";
import NavBar from "./NavBar";
import { AccountContext } from "./Accounts";

const NewsCard = () => {
  const [posts, setPost] = useState([]);
  const { getSession, poolcred } = useContext(AccountContext);

  useEffect(() => {
    if (poolcred !== "") {
      getSession().then(async ({ header }) => {
        axios
          .get("https://api.newscatcherapi.com/v2/search", {
            params: { q: "*", lang: "en", sort_by: "relevancy", page: "1" },
            headers: {
              "x-api-key": "pwCd_zDgwwssiG7Nz-juhUorStxg0rYQF6rFJKsbuAE",
            },
          })
          .then((response) => {
            setPost(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [poolcred]);

  return (
    <Box>
      <Box>
        <NavBar />
      </Box>
      <Container as="main">
        <Box>
          {posts.articles?.map((article, index) => {
            return (
              <Box width="100wh" color="black" key={index}>
                <Box p={4}>
                  <Stack direction="row">
                    <Badge colorScheme="blue">{article.topic}</Badge>
                    <Badge colorScheme="red" variant="outline" ml={2}>
                      {article.published_date.split(" ")[0]}
                    </Badge>
                  </Stack>
                  <Text fontSize="xl" fontWeight="bold" align="left" mt={2}>
                    {article.title}
                  </Text>
                  <Image
                    width="100%"
                    height="35vh"
                    src={
                      !!article.media
                        ? article.media
                        : "https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    }
                    alt="Dan Abramov"
                    borderRadius="10px"
                    mt={5}
                  />
                  <Text
                    fontSize="lg"
                    align="center"
                    mt={5}
                    noOfLines={7}
                    color="gray"
                  >
                    {article.summary}
                  </Text>
                  <Button
                    colorScheme="red"
                    variant="solid"
                    width="100%"
                    mt={5}
                    leftIcon={<AiFillHeart />}
                  >
                    Add to Favourites
                  </Button>
                  <Link href={article.link} isExternal>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      width="100%"
                      mt={5}
                    >
                      Read Full Articles
                    </Button>
                  </Link>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default NewsCard;
