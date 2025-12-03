import React from 'react';

const BrainIcon: React.FC = () => {
  return (
    <svg
      width="250"
      height="250"
      viewBox="0 0 500 500" // ViewBox ajustado para um desenho mais detalhado
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-75" // Mantém a opacidade para o efeito visual da imagem original
    >
      {/* Definição do Gradiente Linear (Azul para Verde-Água) */}
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          {/* Cor Azul (Topo/Esquerda) */}
          <stop offset="0%" style={{ stopColor: '#00BFFF', stopOpacity: 1 }} />
          {/* Cor Verde-Água (Baixo/Direita) */}
          <stop offset="100%" style={{ stopColor: '#00FF7F', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Caminho que se assemelha ao ícone do cérebro com sulcos */}
      {/* Esta é uma aproximação complexa do ícone. */}
      <path
        // Base do cérebro e tronco cerebral
        d="M 50 250 C 50 100 200 50 350 50 C 450 50 450 200 400 250 M 350 50 L 350 150 C 350 200 400 250 450 300 L 450 350 C 450 400 400 450 350 450 L 200 450 C 150 450 50 350 50 250"
        stroke="url(#brainGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Linhas de Detalhe (Sulcos e Fissuras - ajustadas para um visual mais "sketch") */}
      <path
        d="M 120 180 C 140 100 200 80 280 100 M 150 280 C 180 220 250 200 300 240 M 300 350 C 250 380 150 380 120 330 M 300 180 C 350 150 400 180 400 250"
        stroke="url(#brainGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Fissura Central - Dividindo os Hemisférios */}
      <path
        d="M 250 50 L 250 450"
        stroke="url(#brainGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
    </svg>
  );
};

export default BrainIcon;