const errorTransformer = (err) => {
  if (!err.errors) return err.message;

  const [value] = Object.values(err.errors);

  return value.message;
};

module.exports = {
  errorTransformer,
};
