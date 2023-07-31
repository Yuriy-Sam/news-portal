import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

async function savePhotoToLocal(formData: FormData) {
  const file: File | undefined = formData.getAll("avatar")[0] as File;
  console.log(file);

  if (file) {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const name = uuidv4();
    const ext = file.type.split("/")[1];

    const tempdir = os.tmpdir();
    const uploadDir = path.join(tempdir, `/ ${name}.${ext}`);
    fs.writeFile(uploadDir, buffer);
    return { filepath: uploadDir, filename: file.name };
  } else {
    console.error("No file selected.");
  }
}

export async function uploadPhoto(formData: FormData) {
  try {
    const newFile = await savePhotoToLocal(formData);
  } catch (error: any) {
    return { errMessage: error.message };
  }
}
