import ShareForm from "./form/form";

export default function Share() {
  return (
    <main>
      <div className="container" style={{ maxWidth: "720px" }}>
        <h1>계산 결과 공유하기</h1>

        <ShareForm />
      </div>
    </main>
  );
}
