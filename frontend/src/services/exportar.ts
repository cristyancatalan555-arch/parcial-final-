export type Valor = string | number | null;

export interface Reporte {
  titulo: string;
  archivo: string;
  columnas: { nombre: string; ancho: number; decimales?: boolean }[];
  filas: Valor[][];
  filtro?: string;
  total?: boolean;
}

const fechaActual = () => new Date().toLocaleDateString('es-GT');
const importe = (valor: number) => valor.toFixed(2);

function totalGeneral(reporte: Reporte) {
  return reporte.filas.reduce((centavos, fila) =>
    centavos + Math.round(Number(fila.at(-1) ?? 0) * 100), 0) / 100;
}

export async function exportarPdf(reporte: Reporte) {
  const [{ jsPDF }, { autoTable }] = await Promise.all([
    import('jspdf'), import('jspdf-autotable'),
  ]);
  const pdf = new jsPDF({ orientation: 'landscape', format: 'a4' });
  const fecha = fechaActual();
  const pie = reporte.total ? [[
    { content: 'Total general', colSpan: reporte.columnas.length - 1 },
    { content: importe(totalGeneral(reporte)), styles: { halign: 'right' as const } },
  ]] : undefined;
  autoTable(pdf, {
    head: [reporte.columnas.map(c => c.nombre)],
    body: reporte.filas.map(fila => fila.map((valor, i) =>
      typeof valor === 'number' && reporte.columnas[i].decimales ? importe(valor) : (valor ?? ''),
    )),
    foot: pie,
    showFoot: 'lastPage',
    margin: { top: reporte.filtro ? 35 : 30, bottom: 16 },
    theme: 'grid',
    headStyles: { fillColor: [22, 70, 100] },
    footStyles: { fillColor: [22, 70, 100] },
    willDrawPage: () => {
      pdf.setFillColor(22, 70, 100);
      pdf.roundedRect(14, 10, 14, 14, 2, 2, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text('F', 21, 20, { align: 'center' });
      pdf.setTextColor(22, 70, 100);
      pdf.setFontSize(17);
      pdf.text(reporte.titulo, 33, 17);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text('Ferretería | ' + fecha, 33, 23);
      if (reporte.filtro) pdf.text('Filtro: ' + reporte.filtro, 33, 29);
    },
  });
  const paginas = pdf.getNumberOfPages();
  for (let i = 1; i <= paginas; i++) {
    pdf.setPage(i);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(22, 70, 100);
    pdf.text(`Página ${i} de ${paginas}`, 283, 201, { align: 'right' });
  }
  pdf.save(reporte.archivo + '.pdf');
}

export async function exportarExcel(reporte: Reporte) {
  const { default: ExcelJS } = await import('exceljs');
  const libro = new ExcelJS.Workbook();
  const hoja = libro.addWorksheet('Reporte');
  hoja.columns = reporte.columnas.map(c => ({ width: c.ancho, style: { numFmt: c.decimales ? '#,##0.00' : 'General' } }));
  hoja.mergeCells(1, 1, 1, reporte.columnas.length);
  hoja.getCell('A1').value = reporte.titulo;
  hoja.getCell('A1').font = { bold: true, size: 16 };
  hoja.getCell('A2').value = 'Fecha: ' + fechaActual();
  if (reporte.filtro) hoja.getCell('A3').value = 'Filtro: ' + reporte.filtro;

  const encabezado = hoja.getRow(4);
  encabezado.values = reporte.columnas.map(c => c.nombre);
  reporte.filas.forEach(fila => hoja.addRow(fila));

  if (reporte.total) {
    const fila = hoja.addRow(['Total general']);
    const numero = reporte.columnas.length;
    const letra = hoja.getColumn(numero).letter;
    if (reporte.filas.length) {
      fila.getCell(numero).value = {
        formula: `SUM(${letra}5:${letra}${fila.number - 1})`,
        result: totalGeneral(reporte),
      };
    } else {
      fila.getCell(numero).value = { formula: 'SUM(0)', result: 0 };
    }
    fila.font = { bold: true };
  }

  for (let i = 4; i <= hoja.rowCount; i++) {
    const fila = hoja.getRow(i);
    for (let j = 1; j <= reporte.columnas.length; j++) {
      const celda = fila.getCell(j);
      const lado = { style: 'thin' as const, color: { argb: 'FFD3DCE5' } };
      celda.border = { top: lado, left: lado, right: lado, bottom: lado };
      if (i === 4) {
        celda.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF164664' } };
        celda.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      }
    }
  }

  const bytes = new Uint8Array(await libro.xlsx.writeBuffer());
  const url = URL.createObjectURL(new Blob([bytes], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }));
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = reporte.archivo + '.xlsx';
  document.body.append(enlace);
  enlace.click();
  enlace.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
