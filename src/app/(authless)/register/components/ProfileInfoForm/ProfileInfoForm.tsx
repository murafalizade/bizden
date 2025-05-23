import React from 'react';
import {StudentInfoForm} from "@app/(authless)/register/components/StudentInfoForm";
import {VeteranInfoForm} from "@app/(authless)/register/components/VeteranInfoForm";
import {UserRole} from "@shared/libs/models";
import {BusinessInfoForm} from "@app/(authless)/register/components/BusinessInfoForm";

interface ProfileInfoFormProps {
  role: UserRole;
}

export const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({role}) => {
    if(role === UserRole.Student){
        return <StudentInfoForm />
    } else if(role === UserRole.Veteran){
        return <VeteranInfoForm />
    } else if(role === UserRole.Business){
        return <BusinessInfoForm />
    }
    return null;
};
