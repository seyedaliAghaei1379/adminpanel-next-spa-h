"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast , {Toaster} from "react-hot-toast";
import {createUserCategories, userCategory} from "@/services/userCategoryServices";
import {useRouter} from "next/navigation";

const UserCategory = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: Yup.object({
            categoryName: Yup.string()
                .max(50, 'نام دسته بندی نمی‌تواند بیشتر از 50 حرف باشد')
                .required('لطفا نام دسته بندی را وارد کنید'),
        }),
        onSubmit: (values , {resetForm}) => {
            toast.promise(
                createUserCategories({ name: values.categoryName }),
                {
                    loading: 'در حال ایجاد دسته بندی..',
                    success: 'عملیات با موفقیت انجام شد',
                    error: 'مشکلی بوجود آمده است',
                }
            )
                .then(result => {
                    resetForm()

                    console.log('Success:', result);
                    router.replace('/panel/user-category')

                    // toast.success("دسته بندی با موفقیت ساخته شد")
                    // Perform additional actions if needed
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error if needed
                });

            console.log('Form values:', values);
        },
    });

    return (
        <DefaultLayout>
            <Toaster />
            <div className={"p-4 bg-white dark:bg-graydark dark:text-bodydark rounded-md max-w-[500px]"}>
                <form onSubmit={formik.handleSubmit}>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        ساخت دسته بندی جدید
                    </label>
                    <input
                        type="text"
                        name="categoryName"
                        placeholder="مثلا : اداری"
                        className={`w-full rounded-lg border-[1.5px] ${formik.touched.categoryName && formik.errors.categoryName ? 'border-red-500' : 'border-stroke'} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.categoryName}
                    />
                    {formik.touched.categoryName && formik.errors.categoryName ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.categoryName}</div>
                    ) : null}
                    <div className="mb-5 mt-4">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        >
                            ایجاد دسته بندی
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default UserCategory;
