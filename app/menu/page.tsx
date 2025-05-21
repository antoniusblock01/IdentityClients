'use client';

import { useRouter } from 'next/navigation';

export default function MenuPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fff8dc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3rem',
        padding: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#000',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>
        Меню функциональных возможностей
      </h1>

      <button
        onClick={() => router.push('/verification/phone')}
        style={buttonStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0c000')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFD600')}
        aria-label="Верификация Номера"
      >
        Верификация Номера
      </button>

      <button
        onClick={() => router.push('/verification/codeword')}
        style={buttonStyle}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0c000')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFD600')}
        aria-label="Кодовое слово"
      >
        Кодовое слово
      </button>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#FFD600',
  border: 'none',
  borderRadius: '12px',
  padding: '1.5rem 3rem',
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#000',
  cursor: 'pointer',
  boxShadow: '0 6px 16px rgba(255, 214, 0, 0.7)',
  transition: 'background-color 0.3s ease',
  width: '320px',
  maxWidth: '90vw',
  textAlign: 'center',
};
