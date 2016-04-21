const cardCreator = (object) => {
  const key = object.apiSource;

  if (key === 'SoundCloud') {
    return {
      imagePath: object.artwork_url,
      contentId: object.id,
      creator: object.user.username,
      songTitle: object.title,
      apiSource: object.apiSource,
      id: object.id,
    };
  }
  return 'apiSource not matched';
};

export default cardCreator;
