import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import {UploadFile} from "antd/es/upload/interface";
import {BASE_API_URL} from "@shared/constants";
import api from "@shared/libs/service";

const { Dragger } = Upload;

type FileUploaderProps = {
    onSuccess: (response: string) => void;
    defaultFiles?: UploadFile[],
    onRemove: (response: string) => void;
    multiple?: boolean,
    accept?: string,
};

const FileUploader: React.FC<FileUploaderProps> = ({ onSuccess, defaultFiles, onRemove, multiple = false, accept = '*' }) => {
    const uploadProps: UploadProps = {
        name: 'file',
        accept,
        defaultFileList: defaultFiles,
        multiple,
        action: BASE_API_URL+'/api/file/upload',
        async onChange(info) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} faylı uğurla yükləndi.`);
                if (onSuccess && info.file.response) {
                    onSuccess(info.file.response as string);
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} faylının yüklənməsi uğursuz oldu.`);
            }
        },
        async onRemove(info) {
            if (info.response) {
                await api.delete(`/file/${info.response}`);
                onRemove(info.response);
            }
        }
    };

    return (
        <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Faylı yükləmək üçün klikləyin və ya bura sürükləyin</p>
            <p className="ant-upload-hint">
                Tək və ya çoxlu fayl yükləməni dəstəkləyir.
            </p>
        </Dragger>
    );
};

export default FileUploader;
