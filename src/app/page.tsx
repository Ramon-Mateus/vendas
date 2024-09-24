import Link from "next/link";

export default function Home() {
return (
    <div className="flex justify-center items-center mt-10">
      <Link href='../produtos/'>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center mr-2">
          Produtos
        </button>
      </Link>
      <Link href='../estoques/'>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center">
          Estoques
        </button>
      </Link>
    </div>
  );
}
