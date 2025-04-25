"use client"

import { useForm } from "@tanstack/react-form";


import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NATIONALITY } from "@/lib/nationality-list";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { GRADE_SYSTEM, ROLE, StaffSchema, TStaffRegisterForm } from "@/schemas/staff-schema";

export function StaffRegisterForm() {

    // unified the calander open and close logic
    const [isCalenderOpen, setIsCalenderOpen] = useState(false)
    const [isJoiningYearCalenderOpen, setIsJoiningYearCalenderOpen] = useState(true)

    // Photo and sign preview
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)
    const [previewSign, setPreviewSign] = useState<string | null>(null)

    const [gradeSystem, setGradeSystem] = useState<GRADE_SYSTEM | null>(null)


    const { Field, handleSubmit, state, getAllErrors, getFieldValue, setFieldValue } = useForm({
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            fatherName: "",
            motherName: "",
            phone: "",
            email: "",
            dob: null,
            pwd: false,
            post: "",
            pwdData: "",
            gender: null,
            nationality: "",
            fromAnotherSchool: false,
            sameAsPresent: false,
            presentAddress: {
                line1: "",
                line2: "",
                house: "",
                street: "",
                locality: "",
                landmark: "",
                city: "",
                pin: "",
                district: "",
                state: "",
                country: ""
            },
            parmamentAddress: {
                line1: "",
                line2: "",
                house: "",
                street: "",
                locality: "",
                landmark: "",
                city: "",
                pin: "",
                district: "",
                state: "",
                country: ""
            },
            joiningYear: null,
            role: null,
            sallery: 0,
            qualification: {
                bordName: "",
                examinationName: "",
                gradingSystem: null,
                rollNumber: 0,
                yearOfPassing: "",
                grade: "",
                obtainMarks: 0,
                percentage: 0,
                totalMarks: 0,
            }
        } as TStaffRegisterForm,
        validators: {
            // onSubmit: StudentSchema
        },
        onSubmit: ({ value }) => {
            const formData = new FormData();
            formData.append("data", JSON.stringify(value))
        }
    })

    const handleIsCalenderOpen = (val: boolean, date: string | null = null) => {
        setIsCalenderOpen(val);

        if (date) {
            setFieldValue("dob", date);
        }
    }

    const handleIsJoiningYearCalenderOpen = (val: boolean, date: string | null = null) => {
        setIsJoiningYearCalenderOpen(val);

        if (date) {
            setFieldValue("joiningYear", date);
        }
    }

    const handleUploadPhoto = (file: File | null | undefined) => {

        if (file) {
            // setFieldValue("photo", file)
            // setSelectedPhoto(file)
            const objectUrl = URL.createObjectURL(file)
            setPreviewPhoto(objectUrl)
        }
    }

    const handleUploadSign = (file: File | null | undefined) => {
        if (file) {
            // setFieldValue("sign", file)
            // setSelectedSign(file)
            const objectUrl = URL.createObjectURL(file)
            setPreviewSign(objectUrl)
        }
    }

    const handleGradeSystem = (val: GRADE_SYSTEM | null) => {
        setGradeSystem(val);
    }

    useEffect(() => {

        return () => {
            if (previewPhoto) {
                URL.revokeObjectURL(previewPhoto)
            }
            if (previewSign) {
                URL.revokeObjectURL(previewSign)
            }
        }
    }, [previewPhoto, previewSign])

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
        }}
            encType="multipart/form-data"
        >
            <h1 className="font-semibold text-lg">Staff Registration Form</h1>
            <div className='max-w-[150rem] grid grid-cols-[auto_20rem] gap-5 p-5 mx-auto'>

                {/* STUDENT INFORMATION */}
                <div className="grid md:grid-cols-[1fr_1fr_1fr] grid-rows-[auto_auto_auto_auto_1fr] gap-5">
                    <Field
                        name="firstName"
                        children={({ state, handleChange, handleBlur, name }) => (
                            <div>
                                <Input
                                    type="text"
                                    defaultValue={state.value}
                                    onBlur={handleBlur}
                                    placeholder={name.toLocaleLowerCase()}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                            </div>
                        )}
                    />

                    <Field
                        name="middleName"
                        children={({ state, handleChange, handleBlur, name }) => (
                            <div>
                                <Input
                                    type="text"
                                    defaultValue={state.value}
                                    onBlur={handleBlur}
                                    placeholder={name.toLocaleLowerCase()}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                            </div>
                        )}
                    />

                    <Field
                        name="lastName"
                        children={({ state, handleChange, handleBlur, name }) => (
                            <div>
                                <Input
                                    type="text"
                                    defaultValue={state.value}
                                    onBlur={handleBlur}
                                    placeholder={name.toLocaleLowerCase()}
                                    onChange={(e) => handleChange(e.target.value)}
                                />
                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                            </div>
                        )}
                    />

                    <div className="md:col-span-full flex flex-col md:flex-row gap-2">
                        <Field
                            name="fatherName"
                            children={({ state, handleChange, handleBlur, name }) => (
                                <div className="flex-1">
                                    <Input
                                        type="text"
                                        defaultValue={state.value}
                                        onBlur={handleBlur}
                                        placeholder={name.toLocaleLowerCase()}
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                </div>
                            )}
                        />

                        <Field
                            name="motherName"
                            children={({ state, handleChange, handleBlur, name }) => (
                                <div className="flex-1">
                                    <Input
                                        type="text"
                                        defaultValue={state.value}
                                        onBlur={handleBlur}
                                        placeholder={name.toLocaleLowerCase()}
                                        onChange={(e) => handleChange(e.target.value)}
                                    />
                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                </div>
                            )}
                        />
                    </div>

                    <div className="md:col-span-full md:flex gap-2">

                        <Field
                            name="gender"
                            children={({ state, handleChange, handleBlur, name }) => (
                                <div>
                                    <Select defaultValue={undefined} onValueChange={(v: 'MALE' | 'FEMALE' | 'OTHER') => {

                                        if (v) {
                                            handleChange(v)
                                        }
                                    }}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={!state.value ? name.toUpperCase() : "GENDER"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="MALE">Male</SelectItem>
                                                <SelectItem value="FEMALE">Female</SelectItem>
                                                <SelectItem value="OTHER">Other</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                </div>
                            )}
                        />

                        <Field
                            name="nationality"
                            children={({ state, handleChange, handleBlur, name }) => (
                                <div>
                                    <Select value={state.value} onValueChange={handleChange}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={"NATIONALITY"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {/* Search Bar */}
                                                {/* <SelectItem></SelectItem> */}
                                                {
                                                    NATIONALITY.map((nation, idx) => (
                                                        <SelectItem key={nation.key} value={nation.val}>{nation.val}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                </div>
                            )}
                        />

                        <Field
                            name="dob"
                            children={({ state, handleChange, handleBlur, name }) => (
                                <div>
                                    <Popover open={isCalenderOpen} onOpenChange={handleIsCalenderOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !state.value && "text-muted-foreground"
                                                )}
                                            >
                                                {state.value ? (
                                                    format(state.value, 'yyyy-MM-dd')
                                                ) : (
                                                    <span>DOB</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                onSelect={(v) => {
                                                    if (v) {
                                                        const studentDob = format(v, "dd-MM-yyyy")
                                                        handleChange(studentDob);
                                                        handleIsCalenderOpen(false, studentDob)
                                                    }
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                </div>
                            )}
                        />

                        <Field
                            name="phone"
                            children={({ state, handleChange, handleBlur, name }) => (
                                <div className="shrink-0 flex-1">
                                    <Input
                                        type="tel"
                                        onBlur={handleBlur}
                                        placeholder={name.toLocaleLowerCase()}
                                        onChange={(e) => handleChange(e.target.value)}
                                        defaultValue={state.value}
                                    />
                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                </div>
                            )}
                        />

                        <Field
                            name="email"
                            children={({ state, handleChange, handleBlur, name }) => (
                                <div className="shrink-0 flex-1">
                                    <Input
                                        type="email"
                                        onBlur={handleBlur}
                                        placeholder={name.toLocaleLowerCase()}
                                        onChange={(e) => handleChange(e.target.value)}
                                        defaultValue={state.value}
                                    />
                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                </div>
                            )}
                        />

                    </div>


                    <Field
                        name="pwd"
                        children={({ state, handleChange, handleBlur, name }) => (
                            <div className="md:col-span-full md:flex md:items-center md:gap-2">
                                <span className="flex gap-2 justify-center items-center">
                                    <Checkbox
                                        onBlur={handleBlur}
                                        onCheckedChange={checked => handleChange(!!checked)}
                                        className="cursor-pointer"
                                        id={name}
                                        checked={state.value}
                                    />
                                    <Label htmlFor={name} className={cn("text-muted-foreground", getFieldValue("pwd") && "text-black")}>{name}</Label>
                                </span>
                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}

                                <Field
                                    name="pwdData"
                                    children={({ state: pwdData, handleChange, handleBlur, name }) => (
                                        <div>
                                            <Input
                                                disabled={!state.value}
                                                type="text"
                                                onBlur={handleBlur}
                                                onChange={e => handleChange(e.target.value)}
                                                placeholder={name.toLowerCase()}
                                            />
                                            {pwdData.meta.errors.length > 0 && <p className="text-red-500">{pwdData.meta.errors?.[0]?.message}</p>}
                                        </div>
                                    )}
                                />
                            </div>
                        )}
                    />

                    <Tabs defaultValue="address" className="col-span-full">
                        <TabsList className="w-[20rem] sm:[35rem]">
                            <TabsTrigger className="data-[state=active]:ring-2 data-[state=active]:ring-amber-500" value="address">Address</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:ring-2 data-[state=active]:ring-amber-500" value="qualification">Qualification</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:ring-2 data-[state=active]:ring-amber-500" value="other">Other</TabsTrigger>
                        </TabsList>

                        <TabsContent value="address" className="col-span-full flex justify-between">
                            <Card className="flex-1 border-none outline-none shadow-none">
                                <CardHeader>
                                    <CardTitle>Present Address</CardTitle>
                                    <CardDescription>
                                        <Checkbox
                                            checked={false}
                                            className="invisible"
                                        />
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <Field
                                        name="presentAddress.line1"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.line2"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.house"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.street"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.locality"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.landmark"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.city"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.pin"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="number"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}

                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.district"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.state"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="presentAddress.country"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />


                                </CardContent>
                            </Card>
                            <Card className="flex-1 border-none outline-none shadow-none">
                                <CardHeader>
                                    <CardTitle>Permament Address</CardTitle>
                                    <CardDescription>
                                        <Field
                                            name="sameAsPresent"
                                            children={({ name, state, handleChange }) => (
                                                <div className="flex gap-2">
                                                    <Checkbox
                                                        checked={state.value}
                                                        className="cursor-pointer"
                                                        onCheckedChange={checked => {

                                                            handleChange(!!checked)
                                                            if (checked) {
                                                                const presentAddressValues = getFieldValue("presentAddress")
                                                                setFieldValue("parmamentAddress", presentAddressValues)
                                                            } else {
                                                                setFieldValue("parmamentAddress", "")
                                                            }
                                                        }}
                                                        id={name}
                                                    />
                                                    <Label htmlFor={name} className={cn("text-muted-foreground", state.value && "text-black")}>Same As Present</Label>
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <Field
                                        name="parmamentAddress.line1"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.line2"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.house"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.street"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.locality"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.landmark"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.city"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.pin"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="number"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}

                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.district"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.state"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="parmamentAddress.country"
                                        children={({ state, handleChange, handleBlur, name }) => (
                                            <div>
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />


                                </CardContent>
                            </Card>

                        </TabsContent>

                        <TabsContent value="qualification" className="col-span-full">
                            <Card className="shadow-none outline-none border-none">
                                <CardHeader>
                                    <CardTitle>Qualification</CardTitle>
                                </CardHeader>
                                <CardContent className="flex gap-4">

                                    <div className="flex-1 gap-4 flex-col flex">
                                        <Field
                                            name="qualification.examinationName"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div>
                                                    <Input
                                                        type="text"
                                                        defaultValue={state.value}
                                                        onBlur={handleBlur}
                                                        placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                        onChange={e => handleChange(e.target.value)}
                                                    />
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="qualification.bordName"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div>
                                                    <Input
                                                        type="text"
                                                        defaultValue={state.value}
                                                        onBlur={handleBlur}
                                                        placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                        onChange={e => handleChange(e.target.value)}
                                                    />
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />

                                        {/* TODO: Date element */}
                                        <Field
                                            name="qualification.yearOfPassing"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div>
                                                    <Popover open={isJoiningYearCalenderOpen} onOpenChange={handleIsJoiningYearCalenderOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !state.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {state.value ? (
                                                                    format(state.value, 'yyyy-MM-dd')
                                                                ) : (
                                                                    <span>{name}</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>

                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                onSelect={(v) => {
                                                                    if (v) {
                                                                        const joinYr = format(v, "dd-MM-yyyy")
                                                                        handleChange(joinYr);
                                                                        handleIsJoiningYearCalenderOpen(false, joinYr)
                                                                    }
                                                                }}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="qualification.rollNumber"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div>
                                                    <Input
                                                        type="text"
                                                        defaultValue={state.value === 0 ? "" : state.value}
                                                        onBlur={handleBlur}
                                                        placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                        onChange={e => handleChange(parseInt(e.target.value))}
                                                    />
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="flex-1 gap-4 flex-col flex">
                                        <Field
                                            name="qualification.gradingSystem"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div >
                                                    <Select defaultValue={undefined} onValueChange={(v: unknown | null) => {
                                                        const val = v as TStaffRegisterForm["qualification"]["gradingSystem"];
                                                        if (val) {
                                                            handleChange(val)
                                                            handleGradeSystem(val)
                                                        }
                                                    }}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={state.value ? name.toUpperCase() : "Select Grade System"} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {
                                                                    Object.values(GRADE_SYSTEM)?.map((val, idx) => (
                                                                        <SelectItem key={idx} value={val}>{val}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="qualification.grade"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div>
                                                    <Input
                                                        type="text"
                                                        className={cn("hidden", gradeSystem !== GRADE_SYSTEM.percentage && "block")}
                                                        defaultValue={state.value}
                                                        onBlur={handleBlur}
                                                        placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                        onChange={e => handleChange(e.target.value)}
                                                    />
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="qualification.percentage"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div>
                                                    <Input
                                                        type="text"
                                                        defaultValue={state.value === 0 ? "" : state.value}
                                                        className={cn("hidden", gradeSystem !== GRADE_SYSTEM.letterGrade && "block")}
                                                        onBlur={handleBlur}
                                                        placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                        onChange={e => handleChange(parseInt(e.target.value))}
                                                    />
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="qualification.totalMarks"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div>
                                                    <Input
                                                        type="text"
                                                        defaultValue={state.value === 0 ? "" : state.value}
                                                        className={cn("hidden", gradeSystem !== GRADE_SYSTEM.letterGrade && "block")}
                                                        onBlur={handleBlur}
                                                        placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                        onChange={e => handleChange(parseInt(e.target.value))}
                                                    />
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="qualification.obtainMarks"
                                            children={({ state, handleBlur, handleChange, name }) => (
                                                <div>
                                                    <Input
                                                        type="text"
                                                        defaultValue={state.value === 0 ? "" : state.value}
                                                        onBlur={handleBlur}
                                                        className={cn("hidden", gradeSystem !== GRADE_SYSTEM.letterGrade && "block")}
                                                        placeholder={name.split('.').join(' ').toLocaleLowerCase()}
                                                        onChange={e => handleChange(parseInt(e.target.value))}
                                                    />
                                                    {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>


                        <TabsContent value="other" className="col-span-full">
                            <Card className="shadow-none outline-none border-none">
                                <CardHeader>
                                    <CardTitle>Other</CardTitle>
                                </CardHeader>
                                <CardContent className="flex gap-4">
                                    <Field
                                        name="role"
                                        children={({ handleBlur, handleChange, state, name }) => (
                                            <div className="flex-1">
                                                <Select defaultValue={undefined} onValueChange={(v: unknown | null) => {
                                                    const val = v as TStaffRegisterForm["role"];
                                                    if (val) {
                                                        handleChange(val)
                                                    }
                                                }}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={!state.value ? name.toUpperCase() : "Select Role"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {
                                                                Object.values(ROLE).map((val, idx) => (
                                                                    <SelectItem key={idx} value={val}>{val}</SelectItem>
                                                                ))
                                                            }
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="post"
                                        children={({ handleBlur, handleChange, state, name }) => (
                                            <div className="flex-1">
                                                <Input
                                                    type="text"
                                                    defaultValue={state.value}
                                                    onBlur={handleBlur}
                                                    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                                                    onChange={(e) => handleChange(e.target.value)}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="sallery"
                                        children={({ handleBlur, handleChange, state, name }) => (
                                            <div className="flex-1">
                                                <Input
                                                    type="number"
                                                    onBlur={handleBlur}
                                                    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                                                    onChange={e => handleChange(parseFloat(e.target.value))}
                                                />
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="joiningYear"
                                        children={({ handleBlur, handleChange, state, name }) => (
                                            <div className="flex-1">
                                                <Popover open={isJoiningYearCalenderOpen} onOpenChange={handleIsJoiningYearCalenderOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !state.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {state.value ? (
                                                                format(state.value, 'yyyy-MM-dd')
                                                            ) : (
                                                                <span>{name.charAt(0).toUpperCase() + name.slice(1, 7) + " " + name.charAt(7) + name.slice(8)}</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            onSelect={(v) => {
                                                                if (v) {
                                                                    const joinYr = format(v, "dd-MM-yyyy")
                                                                    handleChange(joinYr);
                                                                    handleIsJoiningYearCalenderOpen(false, joinYr)
                                                                }
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {state.meta.errors.length > 0 && <p className="text-red-500">{state.meta.errors?.[0]?.message}</p>}
                                            </div>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* STUDENT PHOTO & SIGN */}
                <div className="flex flex-col gap-10 p-2">

                    <Card className="border-none">
                        <CardHeader>
                            <CardTitle>Staff Photo</CardTitle>
                        </CardHeader>
                        <CardContent className={cn("relative w-62 h-62 mx-auto rounded-sm border-4 border-amber-300 border-dotted flex items-center justify-center bg-gray-100 cursor-pointer")}>
                            {
                                previewPhoto ? (
                                    <Image
                                        src={previewPhoto}
                                        alt="photo"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Label htmlFor="std-upload-photo">
                                        <p>
                                            Upload Your Photo
                                        </p>
                                    </Label>
                                )
                            }
                        </CardContent>
                        <CardFooter>
                            {
                                <Field
                                    name="photo"
                                    children={({ handleChange }) => (
                                        <Input
                                            type="file"
                                            id="std-upload-photo"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.currentTarget?.files?.[0];
                                                setFieldValue("photo", file)
                                                handleUploadPhoto(file);
                                            }}
                                            className="cursor-pointer file:border file:px-3 file:rounded-sm"
                                        />
                                    )}
                                />
                            }
                        </CardFooter>
                    </Card>

                    <Card className="border-none">
                        <CardHeader>
                            <CardTitle>Staff Signature</CardTitle>
                        </CardHeader>
                        <CardContent className="relative w-62 h-14 mx-auto rounded-sm border-4 border-dotted border-amber-300 flex items-center justify-center bg-gray-100 cursor-pointer">
                            {
                                previewSign ? (
                                    <Image
                                        src={previewSign}
                                        alt={"Sign"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Label htmlFor="std-upload-sign">
                                        <p>Upload Your Signature</p>
                                    </Label>
                                )
                            }
                        </CardContent>
                        <CardFooter>
                            <Field
                                name="sign"
                                children={({ handleChange, handleBlur, state, name }) => (
                                    <Input
                                        type="file"
                                        id="std-upload-sign"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.currentTarget?.files?.[0];
                                            setFieldValue("sign", file)
                                            handleUploadSign(file);
                                        }}
                                        className="cursor-pointer file:border file:px-3 file:rounded-sm"
                                    />
                                )}
                            />
                        </CardFooter>
                    </Card>

                    <Button type="submit" className="mt-[50%]">Submit</Button>
                </div >

            </div >
        </form >
    )
}
