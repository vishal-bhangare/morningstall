function convertToMongoQuery(queryParams, QueriesToExclude) {
  const obj = {};

  for (const [key, value] of Object.entries(queryParams)) {
    if (QueriesToExclude.includes(key)) continue;
    else if (key.startsWith("language")) {
      if (!obj.language) {
        obj.language = { $in: [] };
      }
      obj.language = { $in: [...obj.language.$in, value] };
    } else {
      obj[key] = value;
    }
  }

  return obj;
}

module.exports = { convertToMongoQuery };
