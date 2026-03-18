import { useState } from "react";
import jsPDF from "jspdf";

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    sexo: "Feminino",
    medico: "",
    crm: "",
    procedimento: "Mamografia Simples",
    laterality: "Bilateral",
    observacoes: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const gerarPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    doc.setFontSize(16);
    doc.text("REQUISIÇÃO DE MAMOGRAFIA", 105, 20, { align: "center" });
    doc.setFontSize(12);

    doc.text("Nome do paciente:", 20, 40);
    doc.text(formData.nome || "__________________________", 60, 40);
    doc.text("Idade:", 20, 50);
    doc.text(formData.idade || "___", 40, 50);
    doc.text("Sexo:", 60, 50);
    doc.text(formData.sexo || "____", 75, 50);

    doc.text("Médico solicitante:", 20, 60);
    doc.text(formData.medico || "__________________________", 60, 60);
    doc.text("CRM:", 20, 70);
    doc.text(formData.crm || "__________", 35, 70);

    doc.text("Exame solicitado:", 20, 80);
    doc.text(formData.procedimento || "__________________________", 60, 80);

    doc.text("Lado:", 20, 90);
    doc.text(formData.laterality || "__________________", 40, 90);

    doc.text("Observações:", 20, 100);
    doc.text(formData.observacoes || "_________________________________________", 20, 110);
    doc.text("_________________________________________", 20, 115);

    doc.text("Assinatura do médico:", 20, 130);
    doc.text("_____________________________", 70, 130);

    doc.save("requisicao_mamografia.pdf");
  };

  return (
    <div style={{padding: "40px", maxWidth: "600px", margin: "auto", fontFamily: "Arial"}}>
      <h1 style={{textAlign: "center"}}>Requisição de Mamografia</h1>
      <input name="nome" placeholder="Nome do paciente" value={formData.nome} onChange={handleChange} style={{width:"100%", margin:"5px 0"}} />
      <input name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} style={{width:"100%", margin:"5px 0"}} />
      <select name="sexo" value={formData.sexo} onChange={handleChange} style={{width:"100%", margin:"5px 0"}}>
        <option>Feminino</option>
        <option>Masculino</option>
      </select>
      <input name="medico" placeholder="Nome do Médico" value={formData.medico} onChange={handleChange} style={{width:"100%", margin:"5px 0"}} />
      <input name="crm" placeholder="CRM" value={formData.crm} onChange={handleChange} style={{width:"100%", margin:"5px 0"}} />
      <select name="procedimento" value={formData.procedimento} onChange={handleChange} style={{width:"100%", margin:"5px 0"}}>
        <option>Mamografia Simples</option>
        <option>Mamografia com Contraste</option>
      </select>
      <select name="laterality" value={formData.laterality} onChange={handleChange} style={{width:"100%", margin:"5px 0"}}>
        <option>Bilateral</option>
        <option>Direita</option>
        <option>Esquerda</option>
      </select>
      <textarea name="observacoes" placeholder="Observações" value={formData.observacoes} onChange={handleChange} style={{width:"100%", margin:"5px 0"}} />
      <button onClick={gerarPDF} style={{marginTop: "20px", padding: "10px 20px", fontSize:"16px"}}>Gerar PDF</button>
    </div>
  );
}