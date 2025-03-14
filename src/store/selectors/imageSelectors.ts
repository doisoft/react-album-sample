import { selector } from "recoil";
import { searchState } from "../atoms/searchState";
import { pageState } from "../atoms/pageState";

import axios from "axios";
// 오픈 API 호출
const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "879S8763lCKUtAhXJObhrrv-qB8YEPsR9hGRpkDshGk";
const PER_PAGE = 30;

export const imageData = selector({
  key: 'imageData',
  get: async ({ get }) => {
    const searchValue = get(searchState);
    const pageValue = get(pageState);

    // API 호출
    try {
      const res = await axios.get(
        `${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`
      );
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
});
