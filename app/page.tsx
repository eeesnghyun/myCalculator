import Calcurator from "./components/form/form";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>간편한 대출이자계산기</h1>

        <Calcurator />
      </div>
    </main>
  );
}
