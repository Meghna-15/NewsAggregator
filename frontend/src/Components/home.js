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
import Cookies from "js-cookie";

const NewsCard = () => {
  const [posts, setPost] = useState([]);
  const { getSession, poolcred } = useContext(AccountContext);

  useEffect(() => {
    if (poolcred !== "") {
      getSession().then(async ({ user }) => {
        axios
          .get(process.env.REACT_APP_BASE_URL + "/users/news", {
            params: {
              email: Cookies.get("email"),
            },
          })
          .then((response) => {
            console.log(response.data.data);
            setPost(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [poolcred]);

  const addIntoFavorite = (article) => {
    console.log(Cookies.get("email"));
    axios
      .post(process.env.REACT_APP_BASE_URL + "/users/favnews", {
        email: Cookies.get("email"),
        article_id: article._id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <Box>
        <NavBar />
      </Box>
      <Container as="main">
        <Box h="80px"></Box>
        <Box>
          {posts.length > 0
            ? posts.map((article, index) => {
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
                        onClick={() => addIntoFavorite(article)}
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
              })
            : null}
        </Box>
      </Container>
    </Box>
  );
};

export default NewsCard;
