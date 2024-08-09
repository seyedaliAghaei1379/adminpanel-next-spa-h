"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { updateUserCategory, userCategory } from "@/services/userCategoryServices";
import {useParams, useRouter} from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const EditUserCategory = () => {
    const router = useRouter()

    const params = useParams();
    const id = params?.id;

    const { data, isLoading, error} = useQuery(
        {
            queryKey: ['userCategory', id],
            queryFn: () => userCategory(+id),
            enabled: !!id, // Only run query if id is available
        }
    );

    const formik = useFormik({
        initialValues: {
            categoryName: "", // Initialize with empty string
        },
        validationSchema: Yup.object({
            categoryName: Yup.string()
                .max(50, 'نام دسته بندی نمی‌تواند بیشتر از 50 حرف باشد')
                .required('لطفا نام دسته بندی را وارد کنید'),
        }),
        onSubmit: (values, { resetForm }) => {
            toast.promise(
                updateUserCategory(+id, { name: values.categoryName }),
                {
                    loading: 'در حال ایجاد دسته بندی..',
                    success: 'عملیات با موفقیت انجام شد',
                    error: 'مشکلی بوجود آمده است',
                }

            )
                .then(result => {
                    router.replace('/panel/user-category')
                    // console.log('Success:', result);
                })
                .catch(error => {
                    // console.error('Error:', error);
                });

            console.log('Form values:', values);
        },
    });

    // Update form values when data changes
    useEffect(() => {
        if (data && data.data) {
            formik.setValues({
                categoryName: data.data.name
            });
        }
    }, [data]);

    if (isLoading) return <DefaultLayout>Loading...</DefaultLayout>;
    if (error) return <div>Error: {error.message}</div>;

    return (

        <DefaultLayout>
            <Toaster />
            <div className="p-4 bg-white dark:bg-graydark dark:text-bodydark rounded-md max-w-[500px]">
                <form onSubmit={formik.handleSubmit}>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        ویرایش دسته بندی
                    </label>
                    <input
                        type="text"
                        name="categoryName"
                        placeholder=""
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
                            ویرایش دسته بندی
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
};

export default EditUserCategory;
