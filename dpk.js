const crypto = require("crypto");

function createSha3Hash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if(! event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if(! event.partitionKey) {
    const data = JSON.stringify(event);
    return createSha3Hash(data);
  }

  let candidate = event.partitionKey;
  if(typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if(candidate.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }

  return createSha3Hash(candidate);
};