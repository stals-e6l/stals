import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
// import { apiPost } from '../../api'

export const downloadPdf = async (htmlRef: string) => {
  const doc = new jsPDF('l')
  doc.text('Accommodation Details', doc.internal.pageSize.getWidth() / 2, 10, {
    align: 'center',
  })
  autoTable(doc, { html: htmlRef })
  doc.save('AccommodationDetails.pdf')

  // await apiPost<IReport, IReport>('report', {
  //   payload: {
  //     user_id: '',
  //     pdf_url: '',
  //   },
  // })
}
