import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function ExportButton({
  data,
  title,
  filename,
  type = "pdf",
  filtros,
}: any) {
  const exportar = async () => {
    if (type === "excel") {
      // Llamada a tu API de Excel pasándole las fechas
      const res = await fetch(
        `/api/reportes/excel?inicio=${filtros.fechaInicio}&fin=${filtros.fechaFin}`,
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.xlsx`;
      a.click();
    } else {
      const doc = new jsPDF();
      doc.text(title, 14, 15);
      autoTable(doc, {
        startY: 20,
        head: [["Fecha", "Sede", "Curso", "Docente"]],
        body: data.map((v: { fecha: string | number | Date; sede: any; curso: any; controlDocente: { nombre_docente: any; apellido_docente: any; }; }) => [
          new Date(v.fecha).toLocaleDateString(),
          v.sede,
          v.curso,
          v.controlDocente
            ? `${v.controlDocente.nombre_docente} ${v.controlDocente.apellido_docente}`
            : "N/A",
        ]),
      });
      doc.save(`${filename}.pdf`);
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
