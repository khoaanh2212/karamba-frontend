import pick from "lodash/pick";

const InputProps = [
  "placeholder",
  "type",
  "value",
  "onChange",
  "checked"
];

export default props => pick(props, InputProps);
