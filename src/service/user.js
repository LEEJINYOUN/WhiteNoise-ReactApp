import { client } from "./sanity";
import { v4 as uuidv4 } from "uuid";

export async function addUser({ id, username, name, email, password, image }) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    name,
    email,
    password,
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

export async function emailSignUpCheck({ email, password, name, username }) {
  return client
    .fetch(`*[_type == "user" && email == "${email}"][0]`)
    .then((res) =>
      res !== null
        ? alert("존재하는 아이디입니다.")
        : addUser({
            id: uuidv4(),
            username,
            name,
            email,
            password,
            image:
              "http://www.fao.org/fileadmin/templates/experts-feed-safety/images/profile-img03.jpg",
          })
    );
}

export async function getEmailLogin({ email, setUser, navigate }) {
  return client
    .fetch(`*[_type == "user" && email == "${email}"][0]`)
    .then((res) => {
      let userObject = {
        id: res._id,
        name: res.name,
        image: res.image,
        email: res.email,
        username: res.email.split("@")[0],
      };
      setUser(userObject);
      localStorage.setItem("userInfo", JSON.stringify(userObject));
      navigate("/");
    });
}

export async function emailLogin({ email, password, setUser, navigate }) {
  return client
    .fetch(
      `*[_type == "user" && email == "${email}"][0]{"password" : password == "${password}"}`
    )
    .then((res) =>
      res.password === false
        ? alert("비밀번호가 다릅니다")
        : getEmailLogin({ email, setUser, navigate })
    );
}
