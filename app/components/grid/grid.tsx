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
   * 계산식 : M = P * r * (1 + r)^n / ((1 + r)^n - 1);
   * @param amount
   * @param monthlyRate
   * @param month
   */
  const formula1 = (amount: number, monthlyRate: number, month: number) => {
    const newResults = [];
    let remainPayment = amount;
    let index = 1;

    while (index <= month) {
      // 총 납부액
      const monthlyPayment = Math.round(
        (amount * monthlyRate * Math.pow(1 + monthlyRate, month)) / (Math.pow(1 + monthlyRate, month) - 1)
      );
      // 이자액 : 잔여원금 * 월 이자율
      const interest = remainPayment * monthlyRate;
      // 상환원금 : 총 납부액 - 이자액
      const principalPayment = monthlyPayment - Math.round(interest);
      // 잔여원금 : 잔여원금 - 상환원금
      remainPayment = Math.round(remainPayment - principalPayment);

      //   console.log(`-- ${index}회차 --`);
      //   console.log(`총납부액 : ${monthlyPayment)}`);
      //   console.log(`이자액 : ${interest}`);
      //   console.log(`상환원금 : ${principalPayment}`);
      //   console.log(`잔여원금 : ${remainPayment}`);

      newResults.push({
        round: index,
        principalPayment: principalPayment.toLocaleString(),
        interest: Math.round(interest).toLocaleString(),
        monthlyPayment: monthlyPayment.toLocaleString(),
        remainPayment: remainPayment.toLocaleString(),
      });
      index++;
    }

    setResult(newResults);
  };

  /**
   * 원금 균등 분할 상환
   * 계산식 : M = P / n + (P * r)
   * @param amount
   * @param monthlyRate
   * @param month
   */
  const formula2 = (amount: number, monthlyRate: number, month: number) => {
    const newResults = [];
    let remainPayment = amount;
    let index = 1;
    let principalPayment = 0;

    while (index <= month) {
      // 이자액 : 잔여원금 * 월 이자율
      const interest = Math.round(remainPayment * monthlyRate);
      // 총 납부액
      const monthlyPayment = Math.round(amount / month + interest);

      // 상환원금 : 총 납부액 - 이자액
      if (index === 1) {
        principalPayment = Math.round(monthlyPayment - interest);
      }

      // 잔여원금 : 잔여원금 - 상환원금
      remainPayment =
        Math.round(remainPayment - principalPayment) < 10 ? 0 : Math.round(remainPayment - principalPayment);

      //   console.log(`-- ${index}회차 --`);
      //   console.log(`총납부액 : ${monthlyPayment}`);
      //   console.log(`이자액 : ${interest}`);
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

  /**
   * 만기일시 상환
   * 계산식 : M = P * r
   * @param amount
   * @param monthlyRate
   * @param month
   */
  const formula3 = (amount: number, monthlyRate: number, month: number) => {
    const newResults = [];
    let index = 1;
    let principalPayment = 0;

    while (index <= month) {
      // 이자액 : 잔여원금 * 월 이자율
      const interest = Math.round(amount * monthlyRate);

      // 상환원금 : 마지막 회차에 납부
      if (index === month) {
        principalPayment = amount;
      }

      // 총 납부액
      const monthlyPayment = interest + principalPayment;

      // 잔여원금
      const remainPayment = amount - principalPayment;

      //   console.log(`-- ${index}회차 --`);
      //   console.log(`총납부액 : ${monthlyPayment}`);
      //   console.log(`이자액 : ${interest}`);
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

  useEffect(() => {
    // console.log(params);

    const method = params?.paymentMethod;
    // 대출원금
    const amount = Number(params?.amount);
    // 월 이자율 : 대출 연이율  / 12 / 100
    const monthlyRate = Number(params!.interest) / 12 / 100;
    // 대출기간(월 변환)
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
          <ul className={styles.grid_body} key={index}>
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
