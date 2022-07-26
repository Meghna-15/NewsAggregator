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
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { AccountContext } from "./Accounts";
import { useLocation } from "react-router-dom";

const ConfirmUser = () => {
  const [code, setCode] = useState("");

  const { getSession, poolcred } = useContext(AccountContext);

  useEffect(() => {
    if (poolcred !== "") {
      getSession().then(async ({ headers }) => {
        const url =
          "https://dg36kt4s3i.execute-api.us-east-1.amazonaws.com/Development/news/news";
        headers["Access-Control-Allow-Origin"] = "*";
        setCode(await fetch(url, headers));
      });
    }
  }, [poolcred]);

  return <Box>{code}</Box>;
};

export default ConfirmUser;
