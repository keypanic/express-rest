function isEmptyOrNullPromise(user) {
  return new Promise((resolve, reject) => {
    if (user.name === undefined || !user.name) return reject('no name');
    resolve(user);
  });
}

function isEmptyOrNull(user) {
  if (user.name === undefined || !user.name) return true;
  return false;
}

module.exports = {
  isEmptyOrNullPromise,
  isEmptyOrNull
};
