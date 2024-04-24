import { useEffect, useState } from "react";
import styles from "./grid.module.scss";

export type GridType = {
  paymentMethod: string;
  amount: string;
  period: string;
  interest: string;
};

type ResultType = {
  round: number;
  principalPayment: string;
  interest: string;
  monthlyPayment: string;
  remainPayment: string;
};

type Props = {
  params: GridType | undefined;
};

const MyGrid = ({ params }: Props) => {
  const [result, setResult] = useState<ResultType[]>();

  /**
   * 원리금 균등 분할 상환
   * 계산 공식 : M = P * r * (1 + r)^n / ((1 + r)^n - 1);
   * @param amount
   * @param monthlyRate
   * @param month
   */
  const formula1 = (amount: number, monthlyRate: number, month: number) => {
    const newResults = [];
    let remainPayment = amount;
    let index = 1;

    while (remainPayment > 0) {
      // 총납부액
      const monthlyPayment = Math.round(
        (amount * monthlyRate * Math.pow(1 + monthlyRate, month)) / (Math.pow(1 + monthlyRate, month) - 1)
      );
      // 이자액
      const interest = Math.round(remainPayment * monthlyRate);
      // 상환원금
      const principalPayment = Math.round(monthlyPayment - interest);
      // 잔여원금
      remainPayment = Math.round(remainPayment - principalPayment);

      //   console.log(`-- ${index}회차 --`);
      //   console.log(`총납부액 : ${Math.round(monthlyPayment)}`);
      //   console.log(`이자액 : ${Math.round(interest)}`);
      //   console.log(`상환원금 : ${principalPayment}`);
      //   console.log(`잔여원금 : ${remainPayment}`);

      newResults.push({
        round: index,
        principalPayment: principalPayment.toLocaleString(),
        interest: interest.toLocaleString(),
        monthlyPayment: monthlyPayment.toLocaleString(),
        remainPayment: remainPayment.toLocaleString(),
      });
      index++;
    }

    setResult(newResults);
  };

  // 원금 균등 분할 상환
  const formula2 = (amount: number, monthlyRate: number, month: number) => {};

  // 만기일시 상환
  const formula3 = (amount: number, monthlyRate: number, month: number) => {};

  useEffect(() => {
    // console.log(params);

    const method = params?.paymentMethod;
    // 대출 원금
    const amount = Number(params?.amount);
    // 월 이자율 : 대출 연이율  / 12 / 100
    const monthlyRate = Number(params!.interest) / 12 / 100;
    // 대출 기간(월 변환)
    const month = Number(params?.period!) * 12;

    // console.log(`월 이자율 : ${monthlyRate}`);

    switch (method) {
      case "1":
        formula1(amount, monthlyRate, month);
        break;
      case "2":
        formula2(amount, monthlyRate, month);
        break;
      case "3":
        formula3(amount, monthlyRate, month);
        break;
    }
  }, []);

  return (
    <div className={styles.grid_container}>
      <ul className={styles.grid_header}>
        <li style={{ width: "10%" }}>회차</li>
        <li style={{ width: "22%" }}>상환원금</li>
        <li style={{ width: "22%" }}>이자액</li>
        <li style={{ width: "23%" }}>총납부액</li>
        <li style={{ width: "23%" }}>잔여원금</li>
      </ul>

      {result?.map((obj, index) => {
        return (
          <ul className={styles.grid_body}>
            <li style={{ width: "10%", textAlign: "center" }}>{obj.round}</li>
            <li style={{ width: "22%", textAlign: "right" }}>{obj.principalPayment}</li>
            <li style={{ width: "22%", textAlign: "right" }}>{obj.interest}</li>
            <li style={{ width: "23%", textAlign: "right" }}>{obj.monthlyPayment}</li>
            <li style={{ width: "23%", textAlign: "right" }}>{obj.remainPayment}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default MyGrid;
