'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKentAccessStore } from '@/hooks/acess';
import toast from 'react-hot-toast';

export default function AccessPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { setKentAccess } = useKentAccessStore();

  const CORRECT_CODE = 'KENT1401#$'; // ⚠️ visible in frontend

  // Auto-focus input on mount
  useEffect(() => {
    const input = document.getElementById('accessInput') as HTMLInputElement;
    input?.focus();
  }, []);

  const handleSubmit = () => {
    if (code === CORRECT_CODE) {
        setKentAccess(true)
        toast.success("Success")
        router.push('/software/kent-repertory'); // redirect to main page
    } else {
      setError('Invalid access code');
      setCode('');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: '380px',
          padding: '2.2rem',
          borderRadius: '14px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          textAlign: 'center',
          animation: 'popIn 0.25s ease-out',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          Access Required
        </h2>
        <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '1.5rem' }}>
          Please enter the access code to continue
        </p>

        <input
          id="accessInput"
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Access code"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          style={{
            width: '100%',
            padding: '0.75rem 0.9rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            outline: 'none',
            marginBottom: '0.8rem',
          }}
        />

        {error && (
          <span style={{ display: 'block', marginBottom: '0.6rem', color: '#dc2626', fontSize: '0.85rem' }}>
            {error}
          </span>
        )}

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '10px',
            border: 'none',
            background: '#6366f1',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#4f46e5')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#6366f1')}
        >
          Continue
        </button>
      </div>

      {/* Inline keyframes animation */}
      <style>
        {`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
