exports.getHomepageData = async () => {
  // Call MySQL queries to retrieve data from various tables
  const posters = await db.query("SELECT * FROM posters");
  const images = await db.query("SELECT * FROM images");
  const info = await db.query("SELECT * FROM general_information");
  return { posters, images, info };
};
