import React from 'react';
import style from "./fileInput.module.css"

const FileInput = ({URL_UPLOAD_IMAGE, URL_API_IMAGE, updateDataUrl}) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Subir la imagen a Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dogs_page"); // Reemplaza "TU_UPLOAD_PRESET" con tu upload preset de Cloudinary

      // Realizar la petición HTTP POST a Cloudinary
      fetch(URL_API_IMAGE, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
            const url = data.secure_url;
            updateDataUrl(url); // Almacenar la URL pública de la imagen subida
        })
        .catch((error) => {
          console.error("Error al subir la imagen:", error);
        });
    }
  };

return(
          <div className={style.containerFile}>
            {/* Campo de carga de imágenes */}
            <label htmlFor="fileInput" className={style.customFileInput}>
              <img
                src={URL_UPLOAD_IMAGE}
                alt="upload"
                className={style.containerImage}
              />
            </label>
            <input type="file" id="fileInput" onChange={handleImageUpload} />
          </div>
)


}

export default FileInput;
