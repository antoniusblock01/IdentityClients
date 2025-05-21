'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ConfirmCodePage() {
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '';

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [message, setMessage] = useState('');
  const [hideClientData, setHideClientData] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError('Введите 6-значный код');
      return;
    }

    setError('');
    setIsConfirming(true);
    setHideClientData(true);

    // Имитируем запрос на сервер
    setTimeout(() => {
      // Имитация успешного подтверждения

      // Логика:
      // 1) скрыть клиентские данные — сделано через hideClientData
      // 2) удалить дубликаты (эмулируем)
      // 3) показать сообщение

      setMessage(
        `Подтвержден телефон: ${phone}. Дубликаты успешно очищены от данного номера телефона.`
      );
      setIsConfirming(false);
    }, 2000);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Подтверждение кода из SMS</h1>
      {phone && !hideClientData && (
        <p style={{ marginBottom: '1rem' }}>
          Номер телефона клиента: <strong>{phone}</strong>
        </p>
      )}
      {hideClientData && (
        <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '1rem' }}>
          Данные клиента скрыты на время подтверждения...
        </p>
      )}

      {!message && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Введите 6-значный код"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={inputStyle}
            maxLength={6}
            required
            disabled={isConfirming}
          />
          {error && <p style={errorStyle}>{error}</p>}
          <button type="submit" style={buttonStyle} disabled={isConfirming}>
            {isConfirming ? 'Подтверждение...' : 'Подтвердить'}
          </button>
        </form>
      )}

      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
}

const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#fff8dc',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#000',
  textAlign: 'center' as const,
};

const titleStyle = {
  fontSize: '2rem',
  marginBottom: '1.5rem',
  fontWeight: '700',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  width: '320px',
  maxWidth: '90vw',
  gap: '1rem',
};

const inputStyle = {
  padding: '0.75rem 1rem',
  fontSize: '1.25rem',
  borderRadius: '8px',
  border: '2px solid #FFD600',
  outline: 'none',
  textAlign: 'center' as const,
  letterSpacing: '0.5rem',
};

const errorStyle = {
  color: 'red',
  fontWeight: '600',
  fontSize: '1rem',
  marginTop: '-0.5rem',
};

const buttonStyle = {
  padding: '1rem',
  backgroundColor: '#FFD600',
  border: 'none',
  borderRadius: '12px',
  fontWeight: '700',
  fontSize: '1.25rem',
  cursor: 'pointer',
  color: '#000',
  boxShadow: '0 6px 16px rgba(255, 214, 0, 0.7)',
};

const messageStyle = {
  fontWeight: '600',
  fontSize: '1.25rem',
  color: 'green',
};
