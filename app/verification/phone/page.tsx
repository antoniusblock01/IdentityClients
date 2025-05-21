'use client';

import { useState } from 'react';

import '@fontsource/montserrat';
import '@fontsource/roboto';

type Client = {
  id: string;
  fullName: string;
  passport: string;
  phone: string;
};

const MOCK_CLIENTS_DB: Client[] = [
  { id: '1', fullName: 'Иванов Иван Иванович', passport: 'AB1234567', phone: '+79991234567' },
  { id: '2', fullName: 'Петров Петр Петрович', passport: 'CD7654321', phone: '+79991234567' },
  { id: '3', fullName: 'Сидоров Сидор Сидорович', passport: 'EF1122334', phone: '+79997654321' },
];

function searchClients(phone: string): Promise<Client[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const clients = MOCK_CLIENTS_DB.filter(c => c.phone === phone);
      resolve(clients);
    }, 1000);
  });
}

export default function PhoneVerificationPage() {
  const [phone, setPhone] = useState('');
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [smsRequested, setSmsRequested] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [codewordRequested, setCodewordRequested] = useState(false);
  const [codeword, setCodeword] = useState('');
  const [confirmCodeword, setConfirmCodeword] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setClients(null);
    setSelectedClientId(null);
    setSmsRequested(false);
    setSmsCode('');
    setCodewordRequested(false);
    setCodeword('');
    setConfirmCodeword('');

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }

    setLoading(true);
    const foundClients = await searchClients('+' + phoneDigits);
    setLoading(false);

    if (foundClients.length === 0) {
      setError('Клиент с указанным номером телефона не найден.');
    } else {
      setClients(foundClients);
      if (foundClients.length === 1) {
        setSelectedClientId(foundClients[0].id);
      }
    }
  };

  const handleRequestSms = () => {
    setSmsRequested(true);
  };

  const handleVerifySmsCode = () => {
    if (/^\d{4}$/.test(smsCode)) {
      alert('SMS-код подтверждён');
    } else {
      alert('Введите корректный 4-значный код');
    }
  };

  const handleRequestCodeword = () => {
    setCodewordRequested(true);
  };

  const handleSubmitCodeword = () => {
    if (!codeword || !confirmCodeword) {
      alert('Пожалуйста, заполните оба поля');
      return;
    }

    if (codeword !== confirmCodeword) {
      alert('Кодовые слова не совпадают');
      return;
    }

    alert(`Кодовое слово "${codeword}" успешно установлено`);
    setCodewordRequested(false);
    setCodeword('');
    setConfirmCodeword('');
  };

  const selectedClient = clients?.find(c => c.id === selectedClientId);

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Введите номер телефона клиента</h1>

      <form onSubmit={handleSearch} style={formStyle}>
        <input
          type="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={inputStyle}
          required
          disabled={loading}
        />
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? 'Поиск...' : 'Найти клиентов'}
        </button>
      </form>

      {error && <p style={errorStyle}>{error}</p>}

      {clients && clients.length > 1 && (
        <div style={{ ...clientListStyle, border: '2px solid black', borderRadius: '12px', padding: '1rem' }}>
          <h2 style={subtitleStyle}>Найдено несколько клиентов. Выберите нужного:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {clients.map(client => (
              <li
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                style={{
                  ...clientItemStyle,
                  backgroundColor: client.id === selectedClientId ? '#ffe600' : '#f4f4f5',
                  cursor: 'pointer',
                }}
              >
                <strong>{client.fullName}</strong><br />
                Паспорт: {client.passport}<br />
                Телефон: {client.phone}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedClient && (
        <div style={selectedClientStyle}>
          <h2 style={subtitleStyle}>Данные клиента</h2>
          <p><strong>ФИО:</strong> {selectedClient.fullName}</p>
          <p><strong>Паспорт:</strong> {selectedClient.passport}</p>
          <p><strong>Телефон:</strong> {selectedClient.phone}</p>

          <div style={buttonsContainerStyle}>
            <button style={actionButtonStyle} onClick={handleRequestSms}>
              Запросить SMS-код
            </button>
            <button style={actionButtonStyle} onClick={handleRequestCodeword}>
              Установить кодовое слово
            </button>
          </div>

          {smsRequested && (
            <div style={{ marginTop: '1.5rem' }}>
              <input
                type="text"
                placeholder="Введите 4-значный код"
                maxLength={4}
                value={smsCode}
                onChange={e => setSmsCode(e.target.value)}
                style={{ ...inputStyle, width: '200px' }}
              />
              <button
                style={{ ...buttonStyle, marginLeft: '1rem' }}
                onClick={handleVerifySmsCode}
              >
                Проверить код
              </button>
            </div>
          )}

          {codewordRequested && (
            <div style={codewordBlockStyle}>
              <h3 style={codewordTitleStyle}>Установка кодового слова</h3>
              <input
                type="text"
                placeholder="Введите кодовое слово"
                value={codeword}
                onChange={e => setCodeword(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Повторите кодовое слово"
                value={confirmCodeword}
                onChange={e => setConfirmCodeword(e.target.value)}
                style={{ ...inputStyle, marginTop: '1rem' }}
              />
              <button
                style={{ ...buttonStyle, marginTop: '1rem' }}
                onClick={handleSubmitCodeword}
              >
                Сохранить
              </button>
            </div>
          )}
        </div>
      )}

      {clients && clients.length === 0 && (
        <div>
          <p style={{ color: '#1e1e1e' }}>Клиент с указанным номером телефона не найден.</p>
          <button onClick={() => { setClients(null); setError(''); setPhone(''); }} style={buttonStyle}>
            Повторить ввод номера
          </button>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  fontFamily: 'Montserrat, Roboto, sans-serif',
  padding: '3rem',
  maxWidth: '800px',
  width: '90vw',
  margin: '3rem auto',
  background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  color: '#1e1e1e',
};

const titleStyle = {
  fontSize: '2rem',
  marginBottom: '1rem',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  fontFamily: 'Montserrat, sans-serif',
};

const subtitleStyle = {
  fontSize: '1.25rem',
  fontWeight: '600',
  fontFamily: 'Montserrat, sans-serif',
  marginBottom: '1rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1rem',
};

const inputStyle = {
    padding: '1rem',
    fontSize: '1.1rem',
    borderRadius: '12px',
    border: '1px solid #ccc',
    outline: 'none',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#eaeaea ',
  };

const buttonStyle = {
    backgroundColor: '#ffe600',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '1.0rem 1.2rem',
    transition: 'background-color 0.3s',
    fontFamily: 'Montserrat, sans-serif',
    width: 'fit-content',
    height: 'fit-content',
    alignSelf: 'center',
  };

const errorStyle = {
  color: 'red',
  fontWeight: '600',
  marginTop: '1rem',
};

const clientListStyle = {
  marginTop: '1rem',
};

const clientItemStyle = {
  padding: '1rem',
  marginBottom: '0.5rem',
  borderRadius: '10px',
  transition: 'all 0.3s ease',
  fontFamily: 'Roboto, sans-serif',
};

const selectedClientStyle = {
  marginTop: '1rem',
  padding: '1.5rem',
  border: '1px solid #ffe600',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  fontFamily: 'Roboto, sans-serif',
};

const buttonsContainerStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1.5rem',
};

const actionButtonStyle = {
  flex: 1,
  padding: '1rem',
  backgroundColor: '#ffe600',
  border: 'none',
  borderRadius: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  fontFamily: 'Montserrat, sans-serif',
};

const codewordBlockStyle = {
  marginTop: '2rem',
  padding: '1.5rem',
  border: '1px solid #ccc',
  borderRadius: '12px',
  backgroundColor: '#f8f8f8',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
};

const codewordTitleStyle = {
  marginBottom: '1rem',
  fontSize: '1.2rem',
  fontFamily: 'Montserrat, sans-serif',
  color: '#333',
};
