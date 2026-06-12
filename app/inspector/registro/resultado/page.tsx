// app/registro/exitoso/page.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegistroExitosoPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#eaeaea] flex flex-col items-center justify-center px-8 py-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm px-10 py-10 flex flex-col items-center text-center gap-6">

        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold text-black">¡Registro exitoso!</h1>
          <p className="text-sm text-gray-500">Escanea el código QR y descarga la información</p>
        </div>

        <div className="w-full border border-gray-200 rounded-xl p-6 flex items-center justify-center">
          <Image
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://tuapp.com/registro/12345"
            alt="Código QR"
            width={200}
            height={200}
          />
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <Link href="/inicio" className="w-full">
            <button className="w-full border border-black text-black font-semibold text-sm rounded-lg py-3 hover:bg-gray-50 transition-colors">
              ← Finalizar
            </button>
          </Link>
          <button
            onClick={() => router.push("/registro")}
            className="w-full bg-black text-white font-semibold text-sm rounded-lg py-3 hover:bg-gray-900 transition-colors"
          >
            + Registrar otro
          </button>
        </div>

      </div>

      <p className="text-xs text-gray-400 mt-4">
        Sistema seguro y eficiente para el control
      </p>

    </main>
  );
}