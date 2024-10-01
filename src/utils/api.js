export const getCaller = async (url) => {
   console.log("Base URL:", process.env.REACT_APP_BASE_URL);
  const response = await fetch(`https://stats.ayodhya365.co/aviator/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: `${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return response;
};
