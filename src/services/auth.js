import { client } from "./sanityInit";
import { v4 as uuidv4 } from "uuid";

export async function addUser({ id, nickname, name, email, password, image }) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    nickname,
    name,
    email,
    password,
    image,
    bookmarks: [],
  });
}

export async function emailSignUpCheck({ email, password, name, nickname }) {
  return client
    .fetch(`*[_type == "user" && email == "${email}"][0]`)
    .then((res) =>
      res !== null
        ? alert("존재하는 아이디입니다.")
        : addUser({
            id: uuidv4(),
            nickname,
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
        nickname: res.email.split("@")[0],
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
