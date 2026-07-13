"use client";

import { useRef, useState, useEffect } from "react";
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
  const [tieneFirma, setTieneFirma] = useState(false);
  const [cargando, setCargando] = useState(true);

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
          title: "Firma registrada",
          text: "Su firma fue guardada correctamente.",
          confirmButtonText: "Aceptar",
        });

        setTieneFirma(true);
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

  useEffect(() => {
    const verificarFirma = async () => {
      if (!visitaId || isNaN(visitaId)) {
        setCargando(false);
        return;
      }

      try {
        const res = await fetch(`/api/visita/${visitaId}/firmar`);
        const data = await res.json();

        if (data?.firma) {
          setTieneFirma(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    verificarFirma();
  }, [visitaId]);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center">
          Firma del Docente
        </h1>

        <p className="text-center text-sm text-gray-500 mt-2 mb-6">
          Firme dentro del recuadro para confirmar la visita.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white">
          {
            tieneFirma ? (
              <div
                className="
        bg-green-50
        border
        border-green-200
        rounded-xl
        p-5
        text-center
      "
              >
                <h2 className="text-green-700 font-bold">
                  ✓ Firma registrada
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  La firma del docente ya fue registrada para esta visita.
                </p>
              </div>
            ) : (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white">
                  <SignatureCanvas
                    ref={sigRef}
                    penColor="black"
                    canvasProps={{
                      className: "w-full h-64 sm:h-72 bg-white touch-none",
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={limpiar}
                    className="
            flex-1
            py-3
            rounded-xl
            bg-gray-100
            hover:bg-gray-200
            transition
            font-semibold
          "
                  >
                    Limpiar
                  </button>

                  <button
                    onClick={guardar}
                    className="
            flex-1
            py-3
            rounded-xl
            bg-black
            text-white
            hover:bg-gray-900
            transition
            font-semibold
            shadow-md
          "
                  >
                    Guardar firma
                  </button>
                </div>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}