import * as yup from "yup";
import {CATEGORY_LIST, UNIVERSITY_LIST} from "@app/(authless)/register/libs/constants";
import {BusinessType} from "@shared/libs/models";

export const submissionSchema = yup.object({
    note: yup.string().optional(),
    confirmation: yup.boolean().oneOf([true], "Təsdiq zəruridir"),
})

export const studentInfoSchema = yup.object({
    universityName: yup
        .string()
        .oneOf(UNIVERSITY_LIST, "Yalnız tanınmış universitet adı daxil edilməlidir")
        .required("Universitet adı tələb olunur"),
    major: yup
        .string()
        .required("İxtisas tələb olunur"),
    startYear: yup
        .number()
        .required("Başlama ili tələb olunur"),
    endYear: yup
        .number()
        .required("Bitirmə ili tələb olunur"),
    studentIdFiles: yup
        .array()
        .of(yup.string().required("Fayl boş ola bilməz"))
        .min(1, "Ən azı bir tələbə vəsiqəsi faylı əlavə edilməlidir")
        .required("Tələbə vəsiqəsi faylları tələb olunur"),
});

export const veteranInfoSchema = yup.object({
    type: yup
        .number()
        .required("Veteran növü tələb olunur"),
    description: yup
        .string()
        .required("Açıqlama tələb olunur"),
    relevanceType: yup
        .string()
        .required("Əlaqə növü tələb olunur"),
    veteranProofFiles: yup
        .array()
        .of(yup.string().required("Fayl boş ola bilməz"))
        .min(1, "Ən azı bir sübut faylı əlavə edilməlidir")
        .required("Veteran sübut faylları tələb olunur"),
});

export const businessInfoSchema = yup.object({
    name: yup
        .string()
        .required("Biznes adı tələb olunur"),

    type: yup
        .number()
        .oneOf([BusinessType.Corporate, BusinessType.Individual])
        .required("Biznes növü tələb olunur"),

    category: yup
        .string()
        .oneOf(CATEGORY_LIST.flatMap(x=> x.options), "Yalnız tanınmış kateqoriya adı daxil edilməlidir")
        .required("Kateqoriya tələb olunur"),

    city: yup
        .string()
        .required("Şəhər tələb olunur"),

    description: yup
        .string()
        .required("Biznes açıqlaması tələb olunur"),

    motivationLetter: yup
        .string()
        .when("type", {
            is: BusinessType.Corporate,
            then: (schema) => schema.optional(),
            otherwise: (schema) => schema.required("Motivasiya məktubu tələb olunur"),
        }),

    location: yup
        .string()
        .when("type", {
            is: BusinessType.Corporate,
            then: (schema) => schema.required("Ünvan tələb olunur"),
            otherwise: (schema) => schema.optional(),
        }),

    phoneNumber: yup
        .string()
        .when("type", {
            is: BusinessType.Corporate,
            then: (schema) => schema.required("Telefon nömrəsi tələb olunur"),
            otherwise: (schema) => schema.optional(),
        }),

    profileImage: yup
        .string()
        .when("type", {
            is: BusinessType.Corporate,
            then: (schema) => schema.required("Profil şəkli tələb olunur"),
            otherwise: (schema) => schema.optional(),
        }),
});
