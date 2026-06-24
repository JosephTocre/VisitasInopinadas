"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import SignatureCanvas from "react-signature-canvas";

export default function FirmaPad() {
  const params = useParams();
  const rawId = params?.id;
  const initialId = Array.isArray(rawId) ? rawId[0] : rawId;
  const rutaId = typeof window !== "undefined"
    ? window.location.pathname.split("/")[2]
    : undefined;
  const visitaId = Number(initialId ?? rutaId ?? 0);
  const sigRef = useRef<SignatureCanvas>(null);

  const limpiar = () => {
    sigRef.current?.clear();
  };

  const guardar = async () => {
    if (!visitaId || isNaN(visitaId)) {
      console.error("ID de visita inválido", params);
      return;
    }

    if (!sigRef.current || sigRef.current.isEmpty()) return;

    const firmaBase64 = sigRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

     const res = await fetch(`/api/visita/${visitaId}/firmar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firma: firmaBase64,
    }),
  });

  console.log("STATUS:", res.status);

  const text = await res.text();

  console.log("RESPONSE:", text);

    const data = await res.json();

    console.log("Respuesta backend:", data);
  };

  return (
    <div className="border rounded p-4">
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          className: "w-full h-64 border",
        }}
      />

      <div className="flex gap-2 mt-3">
        <button onClick={limpiar} className="px-3 py-1 bg-gray-300">
          Limpiar
        </button>

        <button onClick={guardar} className="px-3 py-1 bg-blue-500 text-white">
          Guardar firma
        </button>
      </div>
    </div>
  );
}