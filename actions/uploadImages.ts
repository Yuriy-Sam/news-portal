export const uploadImage = async (file: any, preset: string) => {
  // "posts_upload"
  const uploadFormData = new FormData();
  // console.log("file langth", file.length);
  uploadFormData.append("file", file);
  uploadFormData.append("upload_preset", preset);
  // let result = null;
  const result = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: uploadFormData,
    }
  )
    .then((res) => res.json())
    .then((data) => data.secure_url)
    .catch((err) => console.log("Error cloouuuud:", err));
  console.log("result uploadImage", result);
  return result;
};
