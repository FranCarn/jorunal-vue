import axios from "axios";

const imageApi = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${process.env.VUE_APP_CLOUDNAME}/image`,
});

export default imageApi;
