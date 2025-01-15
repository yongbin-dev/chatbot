const mimeToExtensionMap: any = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "text/plain": "txt",
  "text/html": "html",
  "text/css": "css",
  "application/json": "json",
  "application/javascript": "js",
  "application/pdf": "pdf",
  "application/zip": "zip",
  "audio/mpeg": "mp3",
  "audio/ogg": "ogg",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/ogg": "ogv",
};

// MIME 타입으로 확장자를 반환하는 함수
export const getExtensionFromMimeType = (mimeType: string) => {
  if (mimeToExtensionMap[mimeType]) {
    return mimeToExtensionMap[mimeType];
  } else {
    console.warn(`Unknown MIME type: ${mimeType}`);
    return null; // 알 수 없는 MIME 타입의 경우 null 반환
  }
};
