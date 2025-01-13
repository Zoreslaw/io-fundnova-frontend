export const uploadImageToDrive = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("https://localhost:7225/api/files/upload-image", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Image upload failed");
    }
  
    const data = await response.json();
  
    if (!data.url) {
      throw new Error("No URL in server response");
    }
  
    return data.url;
};