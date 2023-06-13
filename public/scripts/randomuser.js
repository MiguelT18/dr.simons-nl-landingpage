import fetch from "/node-fetch";

const fetchUser = async () => {
  const response = await fetch("https://randomuser.me/api/");

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new TypeError("Oops, we haven't got JSON!");
  }

  const data = await response.json();

  return data.results[0];
};
