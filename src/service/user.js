import { client } from "./sanity";

export async function addUser({ id, username, name, email, image }) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    name,
    email,
    image,
    bookmarks: [],
  });
}
