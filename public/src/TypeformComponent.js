// src/components/TypeformComponent.js

import React, { useEffect } from 'react';
import { createWidget } from '@typeform/embed';

const TypeformComponent = ({ formId, width, height }) => {
  useEffect(() => {
    const container = document.getElementById('typeform-container');

    if (!container) {
      console.error('Typeform container not found');
      return;
    }

    const typeform = createWidget(formId, {
      container,
    });

    // Cleanup on unmount
    return () => {
      if (typeform.instance && typeform.instance.remove) {
        typeform.instance.remove();
      }
    };
  }, [formId]);

  return <div id="typeform-container" style={{ width, height }} />;
};

export default TypeformComponent;
