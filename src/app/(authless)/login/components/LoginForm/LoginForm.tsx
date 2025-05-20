import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { LoginPayload } from "@app/(authless)/login/utils/models";
import { useMutation } from "@tanstack/react-query";
import { loginPost } from "@app/(authless)/login/utils/services";
import { JWT_TOKEN_KEY } from "@shared/constants";

const schema = yup.object({
    email: yup.string().email("Düzgün email formatı deyil").required("Emailinizi daxil edin!"),
    password: yup.string().required("Şifrənizi daxil edin!"),
}).required();

export const LoginForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginPayload>({
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
    });

    const [messageApi, context] = message.useMessage();

    const { mutateAsync } = useMutation({
        mutationFn: loginPost,
        onSuccess: (data) => {
            localStorage.setItem(JWT_TOKEN_KEY, data);
        },
        onError: async (error: any) => {
            await messageApi.error(error?.message || 'Xəta baş verdi!');
        },
    });

    const onSubmit = async (data: LoginPayload) => {
        await mutateAsync(data);
    };

    return (
        <Form layout="vertical" size="large" onFinish={handleSubmit(onSubmit)}>
            {context}

            <Form.Item
                label="Email"
                validateStatus={errors.email ? "error" : ""}
                help={errors.email?.message}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            placeholder="Emailinizi daxil edin"
                            {...field}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item
                label="Şifrə"
                validateStatus={errors.password ? "error" : ""}
                help={errors.password?.message}
            >
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input.Password
                            placeholder="Şifrənizi daxil edin"
                            {...field}
                        />
                    )}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full"
                    loading={isSubmitting}
                >
                    Daxil ol
                </Button>
            </Form.Item>

            <div className="mt-4 text-sm">
                <Link href="/forgot-password" className="text-blue-600 hover:underline">
                    Şifrəni unutmusunuz?
                </Link>
            </div>

            <div className="mt-2 text-sm">
                <p>
                    Hesabınız yoxdur?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Qeydiyyatdan keçin
                    </Link>
                </p>
            </div>
        </Form>
    );
};
