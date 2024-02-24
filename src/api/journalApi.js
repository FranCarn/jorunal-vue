import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://journal-vue-6c47a-default-rtdb.firebaseio.com",
});

export default journalApi;
