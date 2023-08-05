const NotFound = (req, res) => {
  res.status(404).send("Not Found Route");
};

module.exports = NotFound;
