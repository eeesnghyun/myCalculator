"use client";

import { FormProvider, useForm } from "react-hook-form";
import MyInput from "../input/input";
import MyButton from "../button/button";
import MyRadio from "../radio/radio";
import Modal from "../modal/modal";
import styles from "./form.module.scss";
import { useState } from "react";
import MyGrid, { GridType } from "../grid/grid";

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
  const [toggleModal, setToggleModal] = useState(false);
  const [params, setParams] = useState<GridType>();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = async (form: any) => {
    console.log(form);

    setParams({
      paymentMethod: form.paymentMethod,
      amount: form.amount,
      period: form.period,
      interest: form.interest,
    });

    setToggleModal(!toggleModal);
  };

  const onInvalid = (errors: any) => {
    console.log(errors);

    if (errors && errors.amount) {
      alert(errors.amount.message);
      return;
    } else if (errors && errors.period) {
      alert(errors.period.message);
      return;
    } else if (errors && errors.interest) {
      alert(errors.interest.message);
      return;
    }
  };

  return (
    <FormProvider {...methods}>
      <MyRadio id={"paymentMethod"} options={OPTIONS} label={"상환방식"} />
      <MyInput id={"amount"} label={"대출원금"} require={true} unit={"원"} />
      <MyInput id={"period"} label={"대출기간"} require={true} unit={"년"} />
      <MyInput id={"interest"} label={"연이자"} require={true} unit={"%"} />

      <MyButton text={"계산하기"} onClick={methods.handleSubmit(onSubmit, onInvalid)} />

      {toggleModal && (
        <Modal setToggleModal={setToggleModal}>
          <article className={styles.popup}>
            <MyGrid params={params} />
          </article>
        </Modal>
      )}
    </FormProvider>
  );
}
