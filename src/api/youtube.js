import axios from "axios";

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: {
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
      },
    });
  }

  async search(keyword, GET_DATA_COUNT) {
    return keyword
      ? this.#searchData(keyword, GET_DATA_COUNT)
      : this.#defaultData(GET_DATA_COUNT);
  }

  async #searchData(keyword, GET_DATA_COUNT) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: GET_DATA_COUNT,
          type: "video",
          q: "백색소음" + keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #defaultData(GET_DATA_COUNT) {
    return this.httpClient
      .get("search", {
        params: {
          part: "snippet",
          maxResults: GET_DATA_COUNT,
          type: "video",
          q: "백색소음",
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }
}
