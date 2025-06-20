import React from 'react';
import { Field } from 'formik';

const FormSelect = ({ label, name, options, ...props }) => {
    return (
        <div className="form-group">
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
            )}
            <Field name={name}>
                {({ field, form: { touched, errors } }) => (
                    <>
                        <select
                            className={`input ${touched[name] && errors[name] ? 'border-red-500' : ''}`}
                            {...field}
                            {...props}
                        >
                            <option value="">Select an option</option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {touched[name] && errors[name] ? (
                            <div className="error-message">{errors[name]}</div>
                        ) : null}
                    </>
                )}
            </Field>
        </div>
    );
};

export default FormSelect;
