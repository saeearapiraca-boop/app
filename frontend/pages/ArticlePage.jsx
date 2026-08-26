import { useNavigate, useParams } from "react-router-dom";
import "./ArticlePage.css";

export default function ArticlePage() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL

  // 1. Criamos uma "base de dados" simulada com todos os artigos
  const todosArtigos = [
    {
      id: "1", // Importante: o useParams sempre retorna o id como texto (string)
      titulo: "Descarte de Lixo: Como separar corretamente",
      imagem: "/descarteLixo.jpg",
      data: "25 de Agosto, 2026",
      tempoLeitura: "3 min de leitura",
      conteudo: (
        <>
          <p>O descarte correto do lixo é fundamental para manter a nossa cidade limpa...</p>
          <h4>1. Separe o Orgânico do Reciclável</h4>
          <p>Restos de comida devem ir para um saco. Papel limpo vai para outro...</p>
        </>
      )
    },
    {
      id: "2",
      titulo: "Água Parada: O perigo mora em casa",
      imagem: "/aguaParada.jpg",
      data: "22 de Agosto, 2026",
      tempoLeitura: "2 min de leitura",
      conteudo: (
        <>
          <p>Evitar o acúmulo de água é a melhor forma de combater o mosquito da dengue.</p>
          <h4>1. Vistorie seu quintal</h4>
          <p>Vire garrafas de cabeça para baixo e coloque areia nos pratos de plantas.</p>
        </>
      )
    }
  ];

  // 2. AQUI ESTÁ O SEGREDO: Usamos o 'id' para achar o artigo certo na lista!
  const artigo = todosArtigos.find((item) => item.id === id);

  // Se o usuário digitar um ID que não existe na URL, mostramos um aviso
  if (!artigo) {
    return (
      <div className="article-page" style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Artigo não encontrado!</h2>
        <span className="back" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></span>
      </div>
    );
  }

  // 3. Renderizamos a página normalmente com os dados encontrados
  return (
    <div className="article-page">
    
        <span className="back-floating-btn" onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></span>
      

      <div 
        className="article-hero"
        style={{ backgroundImage: `url(${artigo.imagem})` }}
      ></div>

      <main className="article-body">
        <div className="article-meta">
          <span><i className="bi bi-calendar"></i> {artigo.data}</span>
          <span><i className="bi bi-clock"></i> {artigo.tempoLeitura}</span>
        </div>

        <h1 className="article-title">{artigo.titulo}</h1>

        <div className="article-text">
          {artigo.conteudo}
        </div>
      </main>
    </div>
  );
}