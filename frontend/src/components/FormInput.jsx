import React from 'react';
import { Field } from 'formik';

const FormInput = ({ label, name, ...props }) => {
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
                        <input
                            className={`input ${touched[name] && errors[name] ? 'border-red-500' : ''}`}
                            {...field}
                            {...props}
                        />
                        {touched[name] && errors[name] ? (
                            <div className="error-message">{errors[name]}</div>
                        ) : null}
                    </>
                )}
            </Field>
        </div>
    );
};

export default FormInput; 