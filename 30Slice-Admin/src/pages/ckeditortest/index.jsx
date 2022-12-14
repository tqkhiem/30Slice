import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uploadLoadFIle } from "../../app/services/upload";

export default function App() {
  const storage = getStorage();

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="xe96hx4boxd7pim8uqurpol71245lpwc1u17k20kly9szpy8"
        init={{
          height: 600,
          menubar: true,
          config: {},

          plugins: `advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount`,
          toolbar: `undo redo| link code image | formatselect | bold italic backcolor | \
				alignleft aligncenter alignright alignjustify | \
				bullist numlist outdent indent | removeformat | help`,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function () {
              var file = this.files[0];
              var reader = new FileReader();
              reader.onload = function () {
                var id = 'blobid' + (new Date()).getTime();
                const storageRef = ref(storage, `images/${id}-${file.name}`);
                var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
      
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                
                const uploadTask = uploadBytesResumable(storageRef, blobInfo.blob());
                uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
                }, error => {}, () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  cb(downloadURL, { title: file.name });
                  });
                }
                );
              };
      
              reader.readAsDataURL(file);
              };
              input.click();
          },
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
