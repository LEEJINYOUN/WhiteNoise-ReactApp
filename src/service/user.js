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

export async function addBookmark({
  id,
  videoId,
  thumbnails,
  title,
  channelTitle,
  publishedAt,
}) {
  return client
    .patch(id)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _id: videoId,
        videoId,
        thumbnails,
        title,
        channelTitle,
        publishedAt,
        _type: "object",
      },
    ])
    .commit({ autoGenerateArrayKeys: true })
    .then(() => {
      alert("즐겨찾기에 추가했습니다.");
    });
}

export async function removeBookmark({ id, videoId }) {
  return client
    .patch(id)
    .unset([`bookmarks[_id=="${videoId}"]`])
    .commit()
    .then(() => {
      alert("즐겨찾기에서 삭제했습니다.");
    });
}

export async function getBookmarks({ email }) {
  return client.fetch(
    `*[_type == "user" && email == "${email}"][0]{
      "bookmarks" : bookmarks[]}
    `
  );
}

export async function bookmarkCheck({
  email,
  id,
  videoId,
  thumbnails,
  title,
  channelTitle,
  publishedAt,
}) {
  return client
    .fetch(
      `*[_type == "user" && email == "${email}"][0]{
      "bookmarks" : "${videoId}" in bookmarks[].videoId}
    `
    )
    .then((res) =>
      res.bookmarks === false || res.bookmarks === null
        ? addBookmark({
            id,
            videoId,
            thumbnails,
            title,
            channelTitle,
            publishedAt,
          })
        : window.confirm("이미 추가된 컨텐츠입니다. 삭제하시겠습니까?")
        ? removeBookmark({
            id,
            videoId,
          })
        : null
    );
}
