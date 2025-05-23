import {Controller, useForm} from "react-hook-form";
import {Button, Form, Input, Radio, Select, Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {yupResolver} from "@hookform/resolvers/yup";
import {businessInfoSchema} from "@app/(authless)/register/libs/schemas";
import {BusinessType} from "@shared/libs/models";
import {OptGroup} from "rc-select";
import {CATEGORY_LIST} from "@app/(authless)/register/libs/constants";
import FileUploader from "@shared/components/FileUploader/FileUploader";
import {useAppDispatch, useAppSelector} from "@shared/store/store";
import {setBusinessInfoPayload, setStep} from "@app/(authless)/register/libs/slice";
import {BusinessProfilePayload, RegisterStep} from "@app/(authless)/register/libs/models";
import React from "react";
import {useJwtController} from "@shared/hooks/useJwtController";
import {mapperFileUploader} from "@shared/libs/helpers";

export const BusinessInfoForm = () => {

    const {getJwtPayload} = useJwtController();
    const jwt = getJwtPayload();

    const businessInfo = useAppSelector(state => state.register.businessInfoPayload)!;

    const {
        control,
        watch,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<BusinessProfilePayload>({
        resolver: yupResolver(businessInfoSchema),
        reValidateMode: 'onChange',
        defaultValues: {
            ...businessInfo
        }
    });


    const userType = watch("type");
    const isIndividual = userType === BusinessType.Individual;

    const dispatch = useAppDispatch();

    const nextStep = () => {
        dispatch(setStep(RegisterStep.Submission));
    }

    const onSubmit = (variables: BusinessProfilePayload) => {
        dispatch(setBusinessInfoPayload(variables));
        nextStep();
    }

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <div style={{marginBottom: 12, display: "flex", alignItems: "center", gap: 8}}>
                <span style={{fontWeight: 600}}>Biznes Məlumatları</span>
                <Tooltip
                    title="Daxil edilən məlumatlar yalnız yoxlama məqsədilə istifadə olunacaq və üçüncü şəxslərlə paylaşılmayacaq.">
                    <InfoCircleOutlined style={{color: "#1890ff"}}/>
                </Tooltip>
            </div>

            <Form.Item label="İstifadəçi tipi" validateStatus={errors.type ? 'error' : ''} help={errors.type?.message}>
                <Controller
                    name="type"
                    control={control}
                    render={({field}) => (
                        <Radio.Group
                            {...field}
                        >
                            <Radio.Button value={0}>Biznes</Radio.Button>
                            <Radio.Button value={1}>Fərdi</Radio.Button>
                        </Radio.Group>
                    )}
                />
            </Form.Item>

            {isIndividual ? (
                <>
                    <Form.Item label="Biznes Adı" required validateStatus={errors.name ? 'error' : ''}
                               help={errors.name?.message}>
                        <Controller
                            control={control}
                            name="name"
                            render={({field}) => (
                                <Input
                                    placeholder="Biznes adını daxil edin"
                                    {...field}
                                    value={jwt?.fullName}
                                    maxLength={255}
                                    disabled
                                />
                            )}/>
                    </Form.Item>

                    <Form.Item
                        label="Kateqoriya"
                        required
                        validateStatus={errors.category ? 'error' : ''} help={errors.category?.message}
                    >
                        <Controller
                            name="category"
                            control={control}
                            render={({field}) => (
                                <Select
                                    placeholder="Kateqoriya seçin"
                                    style={{width: "100%"}}
                                    {...field}
                                    showSearch
                                    optionFilterProp="children"
                                >
                                    {CATEGORY_LIST.map((group) => (
                                        <OptGroup key={group.label} label={group.label}>
                                            {group.options.map((option) => (
                                                <Select.Option key={option} value={option}>
                                                    {option}
                                                </Select.Option>
                                            ))}
                                        </OptGroup>
                                    ))}
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Şəhər"
                        required
                        validateStatus={errors.city ? 'error' : ''} help={errors.city?.message}
                    >
                        <Controller
                            name="city"
                            control={control}
                            render={({field}) => (
                                <Select
                                    placeholder="Şəhəri seçin"
                                    {...field}
                                >
                                    <Select.Option value="Bakı">Bakı</Select.Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Qonaq etmək və kömək istədiyiniz mövzu haqqında qısa məlumat"
                        required
                        validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}
                    >
                        <Controller
                            name="description"
                            control={control}
                            render={({field}) => (
                                <Input.TextArea
                                    rows={3}
                                    maxLength={1000}
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Motivasiya Məktubu"
                        required
                        validateStatus={errors.motivationLetter ? 'error' : ''} help={errors.motivationLetter?.message}
                    >
                        <Controller
                            name="motivationLetter"
                            control={control}
                            render={({field}) => (
                                <Input.TextArea
                                    placeholder="Niyə bu layihədə iştirak etmək istəyirsiniz?"
                                    maxLength={500}
                                    rows={5}
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>
                </>
            ) : (
                <>
                    <Form.Item label="Biznes Adı" required validateStatus={errors.name ? 'error' : ''}
                               help={errors.name?.message}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{required: "Biznes adını daxil edin!"}}
                            render={({field}) => (
                                <Input
                                    placeholder="Biznes adını daxil edin"
                                    {...field}
                                    maxLength={255}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Kateqoriya" required validateStatus={errors.category ? 'error' : ''}
                               help={errors.category?.message}>
                        <Controller
                            name="category"
                            control={control}
                            rules={{required: "Biznes kateqoriyasını seçin!"}}
                            render={({field}) => (
                                <Select
                                    placeholder="Kateqoriya seçin"
                                    style={{width: "100%"}}
                                    {...field}
                                    showSearch
                                    optionFilterProp="children"
                                >
                                    {CATEGORY_LIST.map((group) => (
                                        <OptGroup key={group.label} label={group.label}>
                                            {group.options.map((option) => (
                                                <Select.Option key={option} value={option}>
                                                    {option}
                                                </Select.Option>
                                            ))}
                                        </OptGroup>
                                    ))}
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Şəhər" required validateStatus={errors.city ? 'error' : ''}
                               help={errors.city?.message}>
                        <Controller
                            name="city"
                            control={control}
                            render={({field}) => (
                                <Select
                                    placeholder="Şəhəri seçin"
                                    {...field}
                                >
                                    <Select.Option value="Bakı">Bakı</Select.Option>
                                </Select>
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Ünvan" required validateStatus={errors.location ? 'error' : ''}
                               help={errors.location?.message}>
                        <Controller
                            name="location"
                            control={control}
                            render={({field}) => (
                                <Input
                                    placeholder="Ünvanınızı daxil edin"
                                    {...field}
                                    maxLength={255}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Əlaqə Nömrəsi" required validateStatus={errors.phoneNumber ? 'error' : ''}
                               help={errors.phoneNumber?.message}>
                        <Controller
                            name="phoneNumber"
                            control={control}
                            rules={{required: "Əlaqə nömrəsini daxil edin!"}}
                            render={({field}) => (
                                <Input
                                    placeholder="+994 XX XXX XX XX"
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Biznes Haqqında Qısa Məlumat" required
                               validateStatus={errors.description ? 'error' : ''} help={errors.description?.message}>
                        <Controller
                            name="description"
                            control={control}
                            rules={{required: "Biznesiniz haqqında qısa məlumat daxil edin!"}}
                            render={({field}) => (
                                <Input.TextArea
                                    placeholder="Biznesinizin nə işlə məşğul olduğunu qeyd edin"
                                    rows={3}
                                    maxLength={1000}
                                    {...field}
                                />
                            )}
                        />
                    </Form.Item>

                    <Form.Item label="Biznes Loqosu" required validateStatus={errors.profileImage ? 'error' : ''}
                               help={errors.profileImage?.message}>
                        <Controller name={'profileImage'}
                                    control={control}
                                    render={({field}) => (
                                        <FileUploader
                                            onSuccess={(file: string) => {
                                                field.onChange(file)
                                            }}
                                            onRemove={() => {
                                                field.onChange('')
                                            }}
                                            accept="image/*"
                                            defaultFiles={
                                                mapperFileUploader(businessInfo?.profileImage ? [businessInfo?.profileImage] : [])
                                            }
                                        />
                                    )}
                        />
                    </Form.Item>
                </>
            )}

            <Form.Item>
                <div className={'text-right'}>
                    <Button type="primary" htmlType="submit" loading={isSubmitting}>
                        İrəli
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};
