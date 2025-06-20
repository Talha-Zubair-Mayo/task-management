import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import { useAuthStore } from '../store/authStore';
import FormInput from '../components/FormInput';
import { loginSchema } from '../utils/validationSchemas';
import Button from '../components/Button';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await login(values);
            toast.success('Login successful!');
            navigate('/tasks');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="mt-8 space-y-6">
                            <div className="space-y-6">
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
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                                </Button>
                            </div>
                            <div className="text-sm text-center">
                                <Button type="button" variant="secondary" onClick={() => navigate('/register')} className="w-full mt-2">
                                    Don't have an account? Register
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm;
