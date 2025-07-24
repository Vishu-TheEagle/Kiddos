
import React, { useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { APPS } from '../../../constants';
import { EmergencyContact } from '../../../types';
import { suggestTimeLimit } from '../../../services/geminiService';
import { useTheme } from '../../contexts/ThemeContext';

const PARENT_CODE = 'Kiddos@2024';

const Settings: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === PARENT_CODE) {
      setUnlocked(true);
      setError('');
    } else {
      setError('Incorrect code. Please try again.');
    }
  };

  if (!unlocked) {
    return (
      <div className={`h-full flex flex-col items-center justify-center p-8 ${theme.background} ${theme.text}`}>
        <h2 className="text-2xl font-bold">Parental Controls</h2>
        <p className={`mb-4 ${theme.textSecondary}`}>Enter code to continue</p>
        <form onSubmit={handleUnlock} className="w-full max-w-sm">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full p-3 text-center rounded-lg border-2 ${error ? 'border-red-500' : 'border-gray-300'} ${theme.background} ${theme.text}`}
            placeholder="****"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="submit" className={`mt-4 w-full py-3 rounded-lg ${theme.primary} text-white font-bold`}>
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return <ParentalControls />;
};

const ParentalControls: React.FC = () => {
    const { theme } = useTheme();
    return (
        <div className={`h-full overflow-y-auto p-4 space-y-6 ${theme.background} ${theme.text}`}>
            <h2 className="text-2xl font-bold">Parental Controls</h2>
            <AppTimeManager />
            <EmergencyContactManager />
        </div>
    );
};

const AppTimeManager: React.FC = () => {
    const { theme } = useTheme();
    const [selectedApp, setSelectedApp] = useState(APPS[0].id);
    const [age, setAge] = useState(5);
    const [suggestion, setSuggestion] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGetSuggestion = async () => {
        setLoading(true);
        const appDetails = APPS.find(a => a.id === selectedApp)?.name || 'this app';
        const result = await suggestTimeLimit(age, appDetails);
        setSuggestion(result);
        setLoading(false);
    };

    return (
        <div className={`p-4 rounded-lg ${theme.secondary}`}>
            <h3 className="text-xl font-bold mb-2">AI Time Suggester</h3>
            <p className={`${theme.textSecondary} mb-4 text-sm`}>Get AI-powered recommendations for daily app time limits.</p>
            <div className="space-y-3">
                <div>
                    <label className="block font-semibold mb-1">Child's Age</label>
                    <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className={`w-full p-2 rounded ${theme.background} ${theme.text}`} />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Select App</label>
                    <select value={selectedApp} onChange={e => setSelectedApp(e.target.value)} className={`w-full p-2 rounded ${theme.background} ${theme.text}`}>
                        {APPS.filter(a => a.component && !a.path.startsWith('/games/')).map(app => <option key={app.id} value={app.id}>{app.name}</option>)}
                    </select>
                </div>
                <button onClick={handleGetSuggestion} disabled={loading} className={`w-full py-2 rounded ${theme.primary} text-white font-semibold ${loading ? 'opacity-50' : ''}`}>
                    {loading ? 'Thinking...' : 'Get Suggestion'}
                </button>
                {suggestion && <div className={`p-3 rounded ${theme.background} text-sm`}>{suggestion}</div>}
            </div>
        </div>
    );
};

const EmergencyContactManager: React.FC = () => {
    const { theme } = useTheme();
    const [contacts, setContacts] = useLocalStorage<EmergencyContact[]>('kiddos-emergency-contacts', []);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    const addContact = (e: React.FormEvent) => {
        e.preventDefault();
        if(!name.trim() || !phone.trim()) return;
        setContacts([...contacts, {id: Date.now(), name, phone}]);
        setName('');
        setPhone('');
    }
    
    const removeContact = (id: number) => {
        setContacts(contacts.filter(c => c.id !== id));
    }
    
    return (
        <div className={`p-4 rounded-lg ${theme.secondary}`}>
            <h3 className="text-xl font-bold mb-2">Emergency Contacts</h3>
            <div className="space-y-2 mb-4">
                {contacts.map(c => (
                    <div key={c.id} className={`p-2 rounded flex justify-between items-center ${theme.background}`}>
                        <span>{c.name} - {c.phone}</span>
                        <button onClick={() => removeContact(c.id)} className="text-red-500 font-bold">X</button>
                    </div>
                ))}
            </div>
            <form onSubmit={addContact} className="space-y-2">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name (e.g., Grandma)" className={`w-full p-2 rounded ${theme.background} ${theme.text}`} />
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" type="tel" className={`w-full p-2 rounded ${theme.background} ${theme.text}`} />
                <button type="submit" className={`w-full py-2 rounded ${theme.primary} text-white font-semibold`}>Add Contact</button>
            </form>
        </div>
    );
};

export default Settings;
