export default function TextArea({ placeholder, value, onChange }) {
  return (
    <textarea
      name=""
      id=""
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></textarea>
  );
}
