import React from 'react';
import Button from './Button';

const ModalFooter = ({ onCancel, isSubmitting, submitLabel = 'Save', cancelLabel = 'Cancel' }) => (
  <div className="flex justify-end space-x-3">
    <Button type="button" variant="secondary" onClick={onCancel}>
      {cancelLabel}
    </Button>
    <Button type="submit" variant="primary" disabled={isSubmitting}>
      {isSubmitting ? 'Saving...' : submitLabel}
    </Button>
  </div>
);

export default ModalFooter;
