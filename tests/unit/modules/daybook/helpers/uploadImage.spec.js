import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.VUE_APP_CLOUDNAME,
  api_key: "459122777335875",
  api_secret: process.env.VUE_APP_SECRETKEY,
});

describe("test on upload image", () => {
  jest.setTimeout(30000);
  test("should upload an image & return an url", async (done) => {
    const { data } = await axios.get(
      "https://res.cloudinary.com/ddnuznzo6/image/upload/v1664652313/samples/cloudinary-icon.png",
      {
        responseType: "arraybuffer",
      }
    );
    const file = new File([data], "foto.png");

    const url = await uploadImage(file);

    expect(typeof url).toBe("string");

    const segments = url.split("/");

    const imageId = segments[segments.length - 1].replace(".png", "");

    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });
});
