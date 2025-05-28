import React, { useMemo, useState } from 'react';
import { StudentInfoForm } from '@app/(authless)/register/components/StudentInfoForm';
import { VeteranInfoForm } from '@app/(authless)/register/components/VeteranInfoForm';
import { UserRole } from '@shared/libs/models';
import { BusinessInfoForm } from '@app/(authless)/register/components/BusinessInfoForm';
import { When } from '@shared/components/When';
import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';
import {
  businessInfoSchema,
  studentInfoSchema,
  veteranInfoSchema,
} from '@app/(authless)/register/libs/schemas';
import { useAppDispatch, useAppSelector } from '@shared/store/store';
import { setSelectedRole } from '@app/(authless)/register/libs/slice';

interface ProfileInfoFormProps {}

const Option = Select.Option;

export const ProfileInfoForm: React.FC<ProfileInfoFormProps> = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.register.selectedRole);

  return (
    <div className="space-y-6">
      <Form.Item label="Mən" className={'mt-3!'}>
        <Select
          placeholder="Rol seçin"
          allowClear
          value={role}
          onChange={value => dispatch(setSelectedRole(value))}
        >
          <Option value={UserRole.Student}>Tələbəyəm</Option>
          <Option value={UserRole.Veteran}>Veteran və ya Şəhid Ailəsi üzvüyəm</Option>
          <Option value={UserRole.Business}>Dəstək olmaq istəyirəm</Option>
        </Select>
      </Form.Item>

      <When condition={role === UserRole.Student}>
        <StudentInfoForm />
      </When>

      <When condition={role === UserRole.Veteran}>
        <VeteranInfoForm />
      </When>

      <When condition={role === UserRole.Business}>
        <BusinessInfoForm />
      </When>
    </div>
  );
};
