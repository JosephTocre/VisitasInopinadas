"use client";

import Image from "next/image";

type ResultadoStepProps = {
  onFinalizar: () => void;
  onRegistrarOtro: () => void;
  visitaId: number;
};

export default function ResultadoStep({
  onFinalizar,
  onRegistrarOtro,
  visitaId,
}: ResultadoStepProps) {

  const pdfUrl = `/api/ficha/${visitaId}/pdf`;
  const firmarUrl = `/visita/${visitaId}/firmar`;

  const qrUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${firmarUrl}`
      : "";
  return (
    <main className="page-container flex items-center justify-center">

      <div className="max-w-3xl mx-auto card-modern w-full">

        <div className="flex flex-col items-center text-center space-y-8">

          <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
            </svg>
          </div>

          <div>
            <h1 className="page-title">
              ¡Registro exitoso!
            </h1>

            <p className="page-subtitle">
              Escanea el código QR y descarga la información registrada
            </p>
          </div>

          <div className="w-full border border-border rounded-2xl p-8 flex items-center justify-center bg-white">
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                qrUrl
              )}`}
              alt="Código QR"
              width={220}
              height={220}
            />
          </div>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Descargar PDF
          </a>

          <div className="grid md:grid-cols-2 gap-4 w-full">

            <button
              type="button"
              onClick={onFinalizar}
              className="w-full border border-border rounded-xl py-3 px-4 font-medium hover:bg-gray-50 transition-colors"
            >
              ← Finalizar
            </button>

            <button
              type="button"
              onClick={onRegistrarOtro}
              className="btn-primary w-full flex items-center justify-center gap-2 group"
            >
              Registrar otro

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

          </div>

          <p className="text-sm text-text-muted">
            Sistema seguro y eficiente para el control
          </p>

        </div>

      </div>

    </main>
  );
}