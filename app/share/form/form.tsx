"use client";

import MyGrid from "@/app/components/grid/grid";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Query() {
  const searchParams = useSearchParams();

  return (
    <>
      <MyGrid
        params={{
          paymentMethod: searchParams.get("paymentMethod")!,
          amount: searchParams.get("amount")!,
          period: searchParams.get("period")!,
          interest: searchParams.get("interest")!,
        }}
      />
    </>
  );
}

export default function ShareForm() {
  return (
    <Suspense>
      <Query />
    </Suspense>
  );
}
