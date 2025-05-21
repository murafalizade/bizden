import * as yup from "yup";

export const submissionSchema = yup.object({
    note: yup.string().optional(),
    confirmation: yup.boolean().oneOf([true], "Təsdiq zəruridir"),
})

export const studentInfoSchema = yup.object({
    universityName: yup.string().optional(),
    major: yup.string().optional(),
    startYear: yup.string().optional(),
    endYear: yup.string().optional(),
    studentIdFiles: yup.string().optional(),
})

export const veteranInfoSchema = yup.object({
    type: yup.string().optional(),
    description: yup.string().optional(),
    relevanceType: yup.string().optional(),
    veteranProofFiles: yup.string().optional(),
})

export const getStep2And3SchemaByRole = (role: string) => {
    const baseStep3 = {
        confirmation: yup.boolean().oneOf([true], "Təsdiq zəruridir"),
    };

    switch (role) {
        case "Student":
            return yup.object({
                university: yup.string().required("Universitet adı tələb olunur"),
                major: yup.string().required("İxtisas tələb olunur"),
                ...baseStep3,
            });

        case "Veteran":
            return yup.object({
                relation: yup.string().required("Əlaqə tipi tələb olunur"),
                document: yup.mixed().required("Sənəd əlavə edin"),
                ...baseStep3,
            });

        case "Business":
            return yup.object({
                companyName: yup.string().required("Şirkət adı tələb olunur"),
                supportType: yup.string().required("Dəstək növü tələb olunur"),
                ...baseStep3,
            });

        default:
            return yup.object(baseStep3); // fallback
    }
};
