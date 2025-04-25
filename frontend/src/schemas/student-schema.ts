import { z } from "zod"


const FileSchema = z.custom<File>((value) => {
    return value instanceof File;
}, "Expected a file")


export const StudentSchema = z.object({
    // First Name with required validation and error message
    firstName: z.string()
        .min(2, { message: "First name must be at least 2 characters long" })
        .max(50, { message: "First name cannot exceed 50 characters" })
        .refine(value => /^[a-zA-Z\s'-]+$/.test(value), {
            message: "First name can only contain letters, spaces, hyphens, and apostrophes"
        }),

    // Optional Middle Name with length validation
    middleName: z.string()
        .min(1, { message: "Middle name must be at least 1 character long" })
        .max(50, { message: "Middle name cannot exceed 50 characters" })
        .optional(),

    // Last Name with required validation and error message
    lastName: z.string()
        .min(2, { message: "Last name must be at least 2 characters long" })
        .max(50, { message: "Last name cannot exceed 50 characters" })
        .refine(value => /^[a-zA-Z\s'-]+$/.test(value), {
            message: "Last name can only contain letters, spaces, hyphens, and apostrophes"
        }),

    // Father's Name with required validation
    fatherName: z.string()
        .min(2, { message: "Father's name must be at least 2 characters long" })
        .max(50, { message: "Father's name cannot exceed 50 characters" })
        .refine(value => /^[a-zA-Z\s'-]+$/.test(value), {
            message: "Father's name can only contain letters, spaces, hyphens, and apostrophes"
        }),

    // Mother's Name with required validation
    motherName: z.string()
        .min(2, { message: "Mother's name must be at least 2 characters long" })
        .max(50, { message: "Mother's name cannot exceed 50 characters" })
        .refine(value => /^[a-zA-Z\s'-]+$/.test(value), {
            message: "Mother's name can only contain letters, spaces, hyphens, and apostrophes"
        }),

    // Date of Birth with additional validations
    // dob:
    //     z.date()
    //         .refine(date => {
    //             const today = new Date();
    //             const minAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    //             const maxAge = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
    //             return date <= minAge && date >= maxAge;
    //         }, { message: "Age must be between 18 and 60 years" }).nullish()
    // ,

    dob: z.string().date().nullish().transform(val => val ? new Date(val) : val)
    ,

    // Nationality
    nationality: z.string().nonempty(),

    // PWD (Persons with Disability) status
    pwd: z.boolean(),

    pwdData: z.string()
        .max(500, { message: "PWD details cannot exceed 500 characters" })
        .optional(),

    // Phone number validation with custom error messages
    phone: z.string()
        .regex(/^[6-9]\d{9}$/, { message: "Invalid mobile number. Must be 10 digits starting with 6-9" }),

    // Email validation with custom error message
    email: z.string()
        .email({ message: "Invalid email address" })
        .max(100, { message: "Email address cannot exceed 100 characters" }),

    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
        message: "Choose from the Options"
    }).nullable(),

    // Same as present address flag
    sameAsPresent: z.boolean().optional(),

    // photo and sign
    photo: FileSchema.optional().nullable(),
    sign: FileSchema.optional().nullable(),

    // Present Address with more detailed validations
    presentAddress: z.object({
        line1: z.string()
            .min(3, { message: "Address line 1 must be at least 3 characters long" })
            .max(100, { message: "Address line 1 cannot exceed 100 characters" }),
        line2: z.string()
            .max(100, { message: "Address line 2 cannot exceed 100 characters" })
            .optional(),
        house: z.string()
            .max(50, { message: "House number cannot exceed 50 characters" })
            .optional(),
        street: z.string()
            .max(100, { message: "Street name cannot exceed 100 characters" })
            .optional(),
        locality: z.string()
            .min(3, { message: "Locality must be at least 3 characters long" })
            .max(100, { message: "Locality cannot exceed 100 characters" }),
        landmark: z.string()
            .max(100, { message: "Landmark cannot exceed 100 characters" }),
        city: z.string()
            .min(2, { message: "City must be at least 2 characters long" })
            .max(50, { message: "City cannot exceed 50 characters" }),
        pin: z.string()
            .regex(/^\d{6}$/, { message: "PIN code must be 6 digits" }),
        district: z.string()
            .min(2, { message: "District must be at least 2 characters long" })
            .max(50, { message: "District cannot exceed 50 characters" }),
        state: z.string()
            .min(2, { message: "State must be at least 2 characters long" })
            .max(50, { message: "State cannot exceed 50 characters" }),
        country: z.string()
            .max(50, { message: "Country name cannot exceed 50 characters" })

    }),

    parmamentAddress: z.object({
        line1: z.string()
            .min(3, { message: "Address line 1 must be at least 3 characters long" })
            .max(100, { message: "Address line 1 cannot exceed 100 characters" }),
        line2: z.string()
            .max(100, { message: "Address line 2 cannot exceed 100 characters" })
            .optional(),
        house: z.string()
            .max(50, { message: "House number cannot exceed 50 characters" })
            .optional(),
        street: z.string()
            .max(100, { message: "Street name cannot exceed 100 characters" })
            .optional(),
        locality: z.string()
            .min(3, { message: "Locality must be at least 3 characters long" })
            .max(100, { message: "Locality cannot exceed 100 characters" }),
        landmark: z.string()
            .max(100, { message: "Landmark cannot exceed 100 characters" }),
        city: z.string()
            .min(2, { message: "City must be at least 2 characters long" })
            .max(50, { message: "City cannot exceed 50 characters" }),
        pin: z.string()
            .regex(/^\d{6}$/, { message: "PIN code must be 6 digits" }),
        district: z.string()
            .min(2, { message: "District must be at least 2 characters long" })
            .max(50, { message: "District cannot exceed 50 characters" }),
        state: z.string()
            .min(2, { message: "State must be at least 2 characters long" })
            .max(50, { message: "State cannot exceed 50 characters" }),
        country: z.string()
            .max(50, { message: "Country name cannot exceed 50 characters" })

    }),



    // From Another School flag
    fromAnotherSchool: z.boolean(),

    // Previous Academic Data with more robust validations
    previousAcademicData: z.object({
        examinationName: z.string()
            .min(2, { message: "Examination name must be at least 2 characters long" })
            .max(100, { message: "Examination name cannot exceed 100 characters" }),
        bordName: z.string()
            .min(2, { message: "Board name must be at least 2 characters long" })
            .max(100, { message: "Board name cannot exceed 100 characters" }),
        yearOfPassing: z.string()
            .regex(/^\d{4}$/, { message: "Year of passing must be a 4-digit year" }),
        rollNumber: z.string()
            .min(4, { message: "Roll number must be at least 4 characters long" })
            .max(20, { message: "Roll number cannot exceed 20 characters" }),
        gradingSystem: z.enum(["letterGrade", "percentage"]),
        grade: z.string()
            .max(10, { message: "Grade cannot exceed 10 characters" }),
        percentage: z.number({ message: "Percentage must be a valid number" }),
        totalMarks: z.string()
            .regex(/^\d+$/, { message: "Total marks must be a number" }),
        obtainedMarks: z.string()
            .regex(/^\d+$/, { message: "Obtained marks must be a number" })
    }),

    // Transfer Certificate (TC) details
    tc: z.object({
        schoolName: z.string()
            .min(2, { message: "School name must be at least 2 characters long" })
            .max(100, { message: "School name cannot exceed 100 characters" }),
        tcNumber: z.string()
            .min(4, { message: "TC number must be at least 4 characters long" })
            .max(20, { message: "TC number cannot exceed 20 characters" }),
        admissionNumber: z.string()
            .min(4, { message: "Admission number must be at least 4 characters long" })
            .max(20, { message: "Admission number cannot exceed 20 characters" }),
        date: z.string().nullish()
    }),

    // Migration Certificate details
    migration: z.object({
        schoolName: z.string()
            .min(2, { message: "School name must be at least 2 characters long" })
            .max(100, { message: "School name cannot exceed 100 characters" }),
        migrationNumber: z.string()
            .min(4, { message: "Migration number must be at least 4 characters long" })
            .max(20, { message: "Migration number cannot exceed 20 characters" }),
        rollNumber: z.string()
            .min(4, { message: "Roll number must be at least 4 characters long" })
            .max(20, { message: "Roll number cannot exceed 20 characters" }),
        date: z.string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" })
    })
})

export type TStudentRegisterForm = z.infer<typeof StudentSchema>