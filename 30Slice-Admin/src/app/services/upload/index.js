import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toastError } from "../../../components/sharedComponents/toast";

export async function uploadLoadFIle(file) {
  const filename = new Date().getTime() + file.name
  const storage = getStorage();
  if (!file) {
    toastError("Vui lòng chọn hình ảnh!");
    return
  }
  
  const storageRef = ref(storage, `/img/${filename}`);
  await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url

}
