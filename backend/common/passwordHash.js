const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");

function genHash(password) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

function verifyHash(hash, password) {
  const [salt, key] = hash.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  return match ? true : false;
}

module.exports = { genHash, verifyHash };
