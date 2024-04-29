"use client";

import { useEffect } from "react";
import Image from "next/image";
import styles from "./share.module.scss";

type Props = {
  paymentMethod: string;
  amount: string;
  period: string;
  interest: string;
};

export default function MyShare({
  paymentMethod,
  amount,
  period,
  interest,
}: Props) {
  const onClickWebView = async () => {
    if (window.shareChannel) {
      window.shareChannel.postMessage(
        JSON.stringify({
          paymentMethod: paymentMethod,
          amount: amount,
          period: period,
          interest: interest,
        })
      );
    }
  };

  useEffect(() => {
    if (!window.shareChannel) {
      if (window.Kakao) {
        const { Kakao } = window;

        if (!Kakao.isInitialized()) {
          Kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_KEY}`);
        }

        const redirectUrl = `${window.location.origin}/share?paymentMethod=${paymentMethod}&amount=${amount}&period=${period}&interest=${interest}`;
        let methodName = "";

        switch (paymentMethod) {
          case "1":
            methodName = "원리금 균등 상환";
            break;
          case "2":
            methodName = "원금 균등 상환";
            break;
          case "3":
            methodName = "만기일시 상환";
            break;
        }

        Kakao.Share.createDefaultButton({
          container: "#kakao-link-btn",
          objectType: "feed",
          content: {
            title: "my-calculator",
            description: "계산 결과를 확인해 보세요!",
            imageUrl: `${window.location.origin}/favicon.png`,
            link: {
              mobileWebUrl: redirectUrl,
              webUrl: redirectUrl,
            },
          },
          buttons: [
            {
              title: "계산 결과 확인하기",
              link: {
                webUrl: redirectUrl,
                mobileWebUrl: redirectUrl,
              },
            },
          ],
        });
      }
    }
  }, []);

  return (
    <div className={styles.share_image}>
      <Image
        id="kakao-link-btn"
        width={44}
        height={44}
        src={"/kakaotalk_sharing_btn_medium.png"}
        alt="카카오톡 공유 이미지"
        onClick={() => onClickWebView()}
      />
    </div>
  );
}
