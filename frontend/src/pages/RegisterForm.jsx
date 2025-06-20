import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { useAuthStore } from '../store/authStore';
import FormInput from '../components/FormInput';
import { registerSchema } from '../utils/validationSchemas';
import Button from '../components/Button';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { register } = useAuthStore();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await register(values);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="mt-8 space-y-6">
                            <div className="space-y-6">
                                <FormInput
                                    label="Username"
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                />
                                <FormInput
                                    label="Email address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Email address"
                                />
                                <FormInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                />
                                <FormInput
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Confirm password"
                                />
                            </div>
                            <div>
                                <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? 'Creating account...' : 'Create account'}
                                </Button>
                            </div>
                            <div className="text-sm text-center">
                                <Button type="button" variant="secondary" onClick={() => navigate('/login')} className="w-full mt-2">
                                    Already have an account? Sign in
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RegisterForm; 
