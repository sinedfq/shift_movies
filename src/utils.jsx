export const getImageUrl = (img) => {
  if (!img) return 'https://via.placeholder.com/300x450?text=No+Image';
  if (img.startsWith('http')) return img;
  return `https://shift-intensive.ru/api/${img}`;
};

export const handleImageError = (e, setImageError) => {
  setImageError(true);
  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
};

