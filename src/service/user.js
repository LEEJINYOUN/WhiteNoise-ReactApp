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

export async function addBookmark({ id, videoId }) {
  return client
    .patch(id)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [{ _id: videoId, videoId, _type: "object" }])
    .commit({ autoGenerateArrayKeys: true })
    .then((update) => {
      console.log(update);
    });
}

export async function removeBookmark({ id, videoId }) {
  return client
    .patch(id)
    .unset([`bookmarks[_id=="${videoId}"]`])
    .commit()
    .then((unset) => {
      console.log(unset);
    });
}