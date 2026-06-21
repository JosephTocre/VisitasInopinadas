import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportButtonProps {
  data: any[];
  title: string;
  filename: string;
}

export function ExportButton({ data, title, filename }: ExportButtonProps) {
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text(title, 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["Fecha", "Sede", "Curso", "Docente"]],
      body: data.map((v) => [
        new Date(v.fecha).toLocaleDateString(),
        v.sede,
        v.curso,
        v.controlDocente
          ? `${v.controlDocente.nombre_docente} ${v.controlDocente.apellido_docente}`
          : "N/A",
      ]),
    });
    doc.save(`${filename}.pdf`);
  };

  return (
    <button
      onClick={exportarPDF}
      className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:opacity-80 transition"
    >
      Exportar en PDF
    </button>
  );
}