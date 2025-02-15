// src/utils/api.js
export async function getLatestCV() {
  const folderId = "1mmC0IamoyD7717WM2OcUsaaNBNE8gaWW"; // 你的 Google Drive 共享文件夹 ID
  const apiKey = "AIzaSyAPoavlULQrW6wjsEt2xEPKJqQAnRhFX9E"; // 你的 Google API Key
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&orderBy=modifiedTime+desc&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.files.length > 0) {
      const latestFileId = data.files[0].id;
      return `https://drive.google.com/file/d/${latestFileId}/view`;
    } else {
      console.error("No CV file found in the Google Drive folder.");
      return "#";
    }
  } catch (error) {
    console.error("Error fetching latest CV:", error);
    return "#";
  }
}
