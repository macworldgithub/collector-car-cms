import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Car } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupForm>();

  const password = watch('password');

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(data.email, data.password, data.name);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Car className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Full name"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              error={errors.name?.message}
            />
            <Input
              label="Email address"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email',
                },
              })}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message}
            />
            <Input
              label="Confirm password"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === password || 'Passwords do not match',
              })}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </div>
    </div>
  );
}