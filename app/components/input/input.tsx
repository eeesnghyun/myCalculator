import { useFormContext } from "react-hook-form";
import styles from "./input.module.scss";

type Props = {
  id: string;
  type?: string;
  label: string;
  unit: string;
  width?: number;
  placeholder?: string;
  require?: boolean;
};

const MyInput = ({ id, label, unit, type, width, require, placeholder }: Props) => {
  const { register } = useFormContext();

  return (
    <div className="row" style={{ width: width ? width + "%" : "" }}>
      <label className={require ? "require" : ""}>{label}</label>
      <div className={styles.input_wrap}>
        <input
          type={type ? type : "text"}
          placeholder={placeholder ? placeholder : ""}
          {...register(id, {
            required: {
              value: require ? true : false,
              message: `${label}를(을) 입력해 주세요`,
            },
          })}
        />
        <span className={styles.span_wrap}>{unit}</span>
      </div>
    </div>
  );
};

export default MyInput;
