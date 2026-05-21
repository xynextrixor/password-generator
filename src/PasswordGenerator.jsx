import { useState } from 'react';
import './PasswordGenerator.css';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [copied, setCopied] = useState(false);

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:",.<>?/~`';

  const generatePassword = () => {
    let chars = '';

    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSpecialChars) chars += specialChars;

    if (chars === '') {
      alert('Please select at least one character type!');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerateClick = () => {
    generatePassword();
  };

  return (
    <div className="password-generator-container">
      <div className="password-generator-card">
        <h1>🔐 Random Password Generator</h1>

        <div className="password-display">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Your password will appear here"
            className="password-input"
          />
          <button
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={copyToClipboard}
            disabled={!password}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>

        <div className="length-control">
          <label htmlFor="passwordLength">Password Length: {passwordLength}</label>
          <input
            id="passwordLength"
            type="range"
            min="4"
            max="50"
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            className="length-slider"
          />
        </div>

        <div className="options-section">
          <h3>Character Type Options</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              <span>Uppercase Letters (A-Z)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              <span>Lowercase Letters (a-z)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              <span>Numbers (0-9)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeSpecialChars}
                onChange={(e) => setIncludeSpecialChars(e.target.checked)}
              />
              <span>Special Characters (!@#$%^&*...)</span>
            </label>
          </div>
        </div>

        <button className="generate-button" onClick={handleGenerateClick}>
          Generate Password
        </button>
      </div>
    </div>
  );
}
