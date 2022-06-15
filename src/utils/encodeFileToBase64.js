const encodeFileToBase64 = (fileBlob, setPreviewImage) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImage(reader.result);

        resolve();
      };
    });
  } catch (e) {
    console.log("preview 생성 실패");
  }
};

export default encodeFileToBase64;
