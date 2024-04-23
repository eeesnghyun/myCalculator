"use client";

import { FormProvider, useForm } from "react-hook-form";
import MyInput from "../input/input";
import MyButton from "../button/button";
import MyRadio from "../radio/radio";

const OPTIONS = [
  {
    value: "1",
    name: "원리금 균등",
  },
  {
    value: "2",
    name: "원금 균등",
  },
  {
    value: "3",
    name: "만기 일시",
  },
];

export default function Calcurator() {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <MyRadio id={"paymentMethod"} require={false} options={OPTIONS} label={"상환방식"} />
      <MyInput id={"amount"} label={"대출원금"} unit={"만원"} />
      <MyInput id={"period"} label={"대출기간"} unit={"년"} />
      <MyInput id={"interest"} label={"연이자"} unit={"%"} />

      <MyButton text={"계산하기"} onClick={() => console.log("!")} />
    </FormProvider>
  );
}
