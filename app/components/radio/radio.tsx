import { useFormContext } from "react-hook-form";
import styles from "./radio.module.scss";
import { useState } from "react";

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

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const onChangeRadio = (e: OptionType) => {
    setSelectedOption(e.value);
  };

  return (
    <div className="row">
      <label className={require ? "require" : ""}>{label}</label>
      <div className={styles.radio_wrap}>
        {options.map((option, index) => (
          <label className={styles.radio_button} key={index}>
            <input
              type="radio"
              id={option.value}
              value={option.value}
              {...register(id)}
              onChange={() => onChangeRadio(option)}
            />
            <div className={`${styles.option} ${option.value === selectedOption ? styles.active : ""}`}>
              {option.name}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MyRadio;
