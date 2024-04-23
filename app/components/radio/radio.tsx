import { useFormContext } from "react-hook-form";
import styles from "./radio.module.scss";

type OptionType = {
  value: string;
  name: string;
};

type Props = {
  id: string;
  require: boolean;
  options: OptionType[];
  label: string;
  width?: Number;
};

const MyRadio = ({ id, label, require, options }: Props) => {
  const { register } = useFormContext();

  return (
    <div className="row">
      <label className={require ? "require" : ""}>{label}</label>
      <div className={styles.radio_wrap}>
        {options.map((option, index) => (
          <label className={styles.radio_button} key={index}>
            <input type="radio" value={option.value} {...register(id)} />
            <span className={styles.option}>{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MyRadio;
