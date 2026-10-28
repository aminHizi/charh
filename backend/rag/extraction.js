const  fs =require("fs");
const  { extractText, getDocumentProxy } =require( "unpdf");

async function extractPdf(path) {
  const buffer = fs.readFileSync(path);                       // the saved bytes
  const pdf = await getDocumentProxy(new Uint8Array(buffer)); // open the PDF
  const { totalPages, text } = await extractText(pdf);        // text is an array: one string per page
  
  return { totalPages, pages: text };
}
exports = module.exports = extractPdf;