"use client";

import React from 'react';
import {Steps} from "antd";

interface RegisterFormProps {
  // Define your props here
}
const { Step } = Steps;

export const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  return (
    <>
      <Steps current={0} className={'text-sm!'}>
        <Step title="Hesab Məlumatları" />
        <Step title="Əlavə Məlumat" />
        <Step title="Təsdiq" />
      </Steps>
    </>
  );
};
