import React from 'react';

function Help() {
  return (
    <div className="form-container">
      <h2>LostCloud Bot Setup Help</h2>
      <p>Follow these steps to set up your bot:</p>
      <ol>
        <li>Create a server on a hosting platform (e.g., Aternos).</li>
        <li>If necessary, enable cracked mode.</li>
        <li>Start your server.</li>
        <li>Log in to LostCloud and navigate to the Dashboard.</li>
        <li>Click on "Deploy Bot" and select the server edition (Java, Bedrock, or Java+Bedrock).</li>
        <li>Enter your server IP (and port if required) and complete the CAPTCHA.</li>
        <li>Save your unique Server ID and Server Key (the key is shown only once and is required for deletion).</li>
        <li>Visit the Forum for community support and troubleshooting.</li>
      </ol>
    </div>
  );
}

export default Help;
