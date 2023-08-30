const fsc = require('fs');
const path = require('path');
const {jsPDF} = require("jspdf");
var xl = require('excel4node');

//generacion de un archivo de texto con el modulo FS usandolo como callback
fsc.writeFile(path.join(__dirname,'archivo.txt'),"archivo creado api callback",(err)=>{
    if(err){
        console.log(err); si 
    }else{
        console.log("archivo creado con el api fs callback");
    }
});

//instalacion del paquete JsPDF para agregarle a la app la habilidad de generar pdf
const doc = new jsPDF();
doc.text("Hello world",10,10);
doc.save(path.join(__dirname,"a4.pdf"));


//generacion del excel
// Require library
var xl = require('excel4node');

// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet('Sheet 1');
var ws2 = wb.addWorksheet('Sheet 2');

// Create a reusable style
var style = wb.createStyle({
  font: {
    color: '#FF0800',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});

// Set value of cell A1 to 100 as a number type styled with paramaters of style
ws.cell(1, 1)
  .number(100)
  .style(style);

  wb.write(path.join(__dirname,'Excel.xlsx'));