const NotFound = (req, res) => {
  res.status(404).send("Route deos not exist");
};

module.exports = NotFound;
