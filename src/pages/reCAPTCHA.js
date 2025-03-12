import React, { useEffect, useRef } from 'react';

const ReCAPTCHA = ({ sitekey, onChange, onExpired, theme = 'light' }) => {
  const captchaRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const callbackId = useRef(`google_recaptcha_callback_${Math.floor(Math.random() * 1000000)}`);

  useEffect(() => {
    // Define callback function for when reCAPTCHA script loads
    window[callbackId.current] = () => {
      if (captchaRef.current) {
        const widgetId = window.grecaptcha.render(captchaRef.current, {
          sitekey,
          callback: onChange,
          'expired-callback': onExpired,
          theme
        });
        
        // Store widget ID for potential reset functionality
        captchaRef.current.dataset.widgetId = widgetId;
      }
    };

    // Check if grecaptcha is already loaded
    if (window.grecaptcha && window.grecaptcha.render && !scriptLoadedRef.current) {
      window[callbackId.current]();
      scriptLoadedRef.current = true;
      return;
    }

    // Load reCAPTCHA script if not already loaded
    if (!document.querySelector(`script[src*="recaptcha/api.js"]`) && !scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?onload=${callbackId.current}&render=explicit`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    }

    // Cleanup
    return () => {
      // Remove the callback function
      delete window[callbackId.current];
    };
  }, [sitekey, onChange, onExpired, theme]);

  // Method to reset the captcha - can be accessed via a ref
  const reset = () => {
    if (captchaRef.current && captchaRef.current.dataset.widgetId && window.grecaptcha) {
      window.grecaptcha.reset(parseInt(captchaRef.current.dataset.widgetId, 10));
    }
  };

  // Expose reset method
  React.useImperativeHandle(
    captchaRef,
    () => ({
      reset
    }),
    []
  );

  return <div ref={captchaRef} className="g-recaptcha" />;
};

export default ReCAPTCHA;
