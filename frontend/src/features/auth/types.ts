export interface User {
    _id: string;
    firstName: string;
    midName?: string; // Optional
    lastName: string;
    fatherName: string;
    motherName: string;
    dob: string; // ISO date string
    gender: "MALE" | "FEMALE" | "OTHER";
    nationality: string;
    pwd: boolean;
    pwdData?: string;
    phone: string;
    email: string; // Fixed typo
    presentAddress: Address;
    sameAsPresent: boolean;
    permanentAddress: Address;
    photo?: string;
    sign?: string;
    role: string;
    post: string;
    salary: number; // Fixed typo
    joiningYear: string; // ISO date string
    qualification: Qualification[];
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    username: string;
    __v: number;
}

// ✅ Address Type
export interface Address {
    line1: string;
    line2?: string; // Optional
    house?: string;
    street?: string;
    locality?: string;
    landmark?: string;
    city: string;
    pin: number;
    district: string;
    state: string;
    country: string; // Fixed typo
}

// ✅ Qualification Type
export interface Qualification {
    examinationName: string;
    boardName: string; // Fixed typo
    yearOfPassing: string; // ISO date string
    rollNumber: number;
    gradingSystem: string;
    grade: string;
    totalMarks: number;
    obtainMarks: number;
}
