import "./label.css";

type LabelProps = {
  label: string;
};

export default function Label(props: LabelProps) {
  return <h1 className="label">{props.label}</h1>;
}
