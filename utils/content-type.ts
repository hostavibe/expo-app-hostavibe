

export const getContentType = (imageExtension: string | null) => {
  if (!imageExtension) {
    return 'image/jpeg';
  }

  switch (imageExtension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg'; // fallback to jpeg
  }
};
