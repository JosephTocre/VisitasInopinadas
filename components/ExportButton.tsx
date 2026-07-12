import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

export function ExportButton({
  data,
  title,
  filename,
  type = "pdf",
  filtros,
  selectedIds = [],
}: any) {
  const exportar = async () => {
    if (type === "excel") {
      const token = localStorage.getItem("token");

      // Llamada a tu API de Excel pasándole las fechas
      const res = await fetch(
        `/api/reportes/excel?inicio=${filtros.fechaInicio}&fin=${filtros.fechaFin}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Acceso denegado",
          text: "No tienes permisos para descargar este reporte.",
        });
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.xlsx`;
      a.click();
    } else {
      const params = new URLSearchParams();

      const idsToUse =
        selectedIds && selectedIds.length > 0
          ? selectedIds
          : data && Array.isArray(data)
            ? data.map((v: any) => v.id_visita)
            : [];

      idsToUse.forEach((id: number | string) =>
        params.append("id", id.toString()),
      );

      const res = await fetch(`/api/ficha/pdf?${params.toString()}`);

      // AÑADE ESTO: Verifica si la respuesta es exitosa
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron generar los PDFs.",
        });
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.pdf`;
      a.click();
    }
  };

  return (
    <button
      onClick={exportar}
      className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition"
    >
      Exportar {type == "excel" ? "Excel" : "PDF"}
    </button>
  );
}
