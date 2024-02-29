import imageApi from "@/api/imageApi";

const uploadImage = async (file) => {
  if (!file) return;
  try {
    const formData = new FormData();
    formData.append("upload_preset", "rp8gdzhi");
    formData.append("file", file);

    const {
      data: { secure_url },
    } = await imageApi.post("/upload", formData);

    return secure_url;
  } catch (error) {
    throw new Error("Cloudinary error check endpoints");
  }
};

export default uploadImage;
