// Flattens a DRF error body (list, or object of field -> messages) into one string.
const apiErrorMessage = (body, fallback) => {
  const messages = [];
  const collect = (value) => {
    if (typeof value === "string") messages.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === "object") Object.values(value).forEach(collect);
  };
  collect(body);
  return messages.length ? messages.join(" ") : fallback;
};

export default apiErrorMessage;
