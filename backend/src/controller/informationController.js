

exports.getInformation = async () => {
  // Call a MySQL query to retrieve data from the 'information' table
  // For example:
  const query = 'SELECT * FROM information';
  const result = await db.query(query);
  return result;
};