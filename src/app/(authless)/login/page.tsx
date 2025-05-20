import React from 'react';
import {LoginForm} from "@app/(authless)/login/components/LoginForm";

const LoginPage = () => {
  return (
      <div className="p-8 rounded-lg bg-white shadow-md w-full max-w-md text-center">
        <h2 className="text-3xl text-blue-600 mb-1">
          BIZDƏN!
        </h2>
        <p className="block text-sm mb-6 text-gray-600">
          Xoş gəldiniz! Zəhmət olmasa, hesabınıza daxil olun.
        </p>
        <LoginForm />
    </div>
  );
};

export default LoginPage;
