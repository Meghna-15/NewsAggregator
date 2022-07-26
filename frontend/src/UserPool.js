import axios from "axios";

function dataPromise() {
  return axios
    .get(
      "https://vhfrosov44r5iiwekwpmfp5z2u0sfyup.lambda-url.us-east-1.on.aws/"
    )
    .then((response) => {
      return response.data.body;
    });
}

export { dataPromise };
