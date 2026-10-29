import US_STATES from "../utils/usStates";

export default function StateSelect({ defaultValue = "" }) {
  return (
    <select name="state" defaultValue={defaultValue}>
      <option value="">Select a state (optional)</option>
      {US_STATES.map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
