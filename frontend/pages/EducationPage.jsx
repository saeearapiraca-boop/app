// Se estiver usando react-router-dom, importe o hook de navegação:
import { useNavigate } from "react-router-dom"; 
import "./EducationPage.css";
import BottomNav from "../src/components/BottomNav";

export default function EducationPage() {
  const navigate = useNavigate();

  // Lista de conteúdos (você pode puxar isso de uma API no futuro)
  const conteudos = [
    {
      id: 1,
      titulo: "Descarte de Lixo",
      descricao: "Aprenda a separar o lixo corretamente e descubra os dias da coleta seletiva no seu bairro.",
      imagem: "/descarteLixo.jpg"
    },
    {
      id: 2,
      titulo: "Água Parada",
      descricao: "Saiba como vistoriar seu quintal e evitar o acúmulo de água em vasos e garrafas.",
      imagem: "/aguaParada.jpg"
    },
    {
      id: 3,
      titulo: "Reciclagem de Óleo",
      descricao: "Descubra os pontos de coleta para óleo de cozinha usado e evite a poluição dos rios.",
      imagem: "/reciclagemOleo.png" // Lembre-se de adicionar essa imagem na pasta public
    },
    {
      id: 4,
      titulo: "Cuidados com Pets",
      descricao: "A importância de recolher as fezes do seu animal de estimação durante os passeios.",
      imagem: "/cuidadoPet.jpg" // Lembre-se de adicionar essa imagem na pasta public
    }
  ];

  return (
    <div className="education-page">

        <BottomNav />

      {/* HEADER DA PÁGINA */}
      <header className="education-header">
        <span className="back" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></span>
        <h2>Conteúdos Educativos</h2>
      </header>

      {/* GRID DE CONTEÚDOS */}
      <div className="education-grid">
        {conteudos.map((item) => (
          <div className="education-card" key={item.id}>
            {/* Usando estilo inline para a imagem de fundo facilita não precisar de muitas classes no CSS */}
            <div 
              className="education-image-dynamic" 
              style={{ backgroundImage: `url(${item.imagem})` }}
            ></div>

            <div className="education-content">
              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
              <span onClick={() => navigate(`/educativo/${item.id}`)}>Ler mais</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}