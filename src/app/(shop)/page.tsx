import { titleFont } from "../config/fonts";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl">Hola Mundo!!!</h1>
      <h1 className={`${titleFont.className} text-5xl`}>Hola Mundo!!!</h1>
    </div>
  );
}
