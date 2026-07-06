const conditionColor = (condition) => {
  switch (condition?.toLowerCase()) {
    case "new":
      return "#2563eb";
    case "great":
    case "good":
      return "#3b6d11";
    case "fair":
      return "#854f0b";
    default:
      return "#888";
  }
};

export default conditionColor;