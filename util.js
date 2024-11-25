function generateRandomNumber() {
  return Math.random();
}

function square(number) {
  return number * number;
}

// export
// module.exports = generateRandomNumber;

export { square };

export default generateRandomNumber;
