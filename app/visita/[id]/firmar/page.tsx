"use client";

import { useRef } from "react";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import SignatureCanvas from "react-signature-canvas";

export default function FirmaPad() {
  const params = useParams();
  const rawId = params?.id;
  const initialId = Array.isArray(rawId) ? rawId[0] : rawId;

  const rutaId =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[2]
      : undefined;

  const visitaId = Number(initialId ?? rutaId ?? 0);

  const sigRef = useRef<SignatureCanvas>(null);

  const limpiar = () => {
    sigRef.current?.clear();
  };

  const guardar = async () => {
    if (!visitaId || isNaN(visitaId)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "ID de visita inválido",
      });
      return;
    }

    if (!sigRef.current || sigRef.current.isEmpty()) {
      Swal.fire({
        icon: "warning",
        title: "Firma requerida",
        text: "Por favor registre una firma.",
      });
      return;
    }

    const firmaBase64 = sigRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    try {
      const res = await fetch(`/api/visita/${visitaId}/firmar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firma: firmaBase64,
        }),
      });

      const data = await res.json();

      console.log("Respuesta backend:", data);

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Firma guardada",
          text: "La firma se registró correctamente.",
          confirmButtonText: "Aceptar",
        });

        sigRef.current?.clear();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error || "No se pudo guardar la firma.",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un problema al guardar la firma.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
          Firma Digital
        </h1>

        <p className="text-sm text-gray-500 text-center mb-4">
          Firme dentro del recuadro
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white">
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
              className:
                "w-full h-56 sm:h-72 md:h-80 touch-none bg-white",
            }}
          />
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={limpiar}
            className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 hover:bg-gray-200 active:scale-[0.98] transition"
          >
            Limpiar
          </button>

          <button
            onClick={guardar}
            className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition shadow-md"
          >
            Guardar Firma
          </button>
        </div>
      </div>
    </div>
  );
}