import React from "react";
import Link from "next/link";
import {RegisterForm} from "@app/(authless)/register/components/RegisterForm";

const RegisterPage = () => {
    return (
        <div className="p-8 rounded-lg bg-white shadow-md w-full max-w-xl text-center">
            <h2 className="text-3xl text-blue-600 mb-1">
                BIZDƏN!
            </h2>
            <p className="block text-sm mb-6 text-gray-600">
                Artıq hesabınız var? <Link href="/login"  className="text-blue-600 hover:underline">Buradan daxil olun</Link>
            </p>

            <RegisterForm />
        </div>
    )
}

export default RegisterPage;
