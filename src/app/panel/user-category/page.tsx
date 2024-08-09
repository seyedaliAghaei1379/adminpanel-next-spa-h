"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { createUserCategories, getUserCategories, deleteUserCategory } from "@/services/userCategoryServices";
import Link from "next/link";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const UserCategory = () => {
    const queryClient = useQueryClient();
    const formik = useFormik({
        initialValues: {
            categoryName: '',
        },
        validationSchema: Yup.object({
            categoryName: Yup.string()
                .max(50, 'نام دسته بندی نمی‌تواند بیشتر از 50 حرف باشد')
                .required('لطفا نام دسته بندی را وارد کنید'),
        }),
        onSubmit: (values) => {
            toast.promise(
                createUserCategories({ name: values.categoryName }),
                {
                    loading: 'در حال ایجاد دسته بندی..',
                    success: 'عملیات با موفقیت انجام شد',
                    error: 'مشکلی بوجود آمده است',
                }
            )
                .then(result => {
                    // resetForm();
                    // queryClient.invalidateQueries( {queryKey : ['userCategory']});
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            console.log('Form values:', values);
        },
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['userCategory'], // The query key should be passed in an object
        queryFn: getUserCategories, // The function to fetch the data

    });

    if (isLoading) return <DefaultLayout>Loading...</DefaultLayout>;
    if (error) return <div>Error: {error.message}</div>;
    const handleDelete = (id : number) => {
        toast.custom((t) => (
            <div
                className={`toast ${t.visible ? 'toast-visible' : 'toast-hidden'} bg-white p-4 rounded shadow-md`}
            >
                <p>آیا از حذف این دسته بندی مطمئن هستید؟</p>
                <div className="mt-2">
                    <button
                        onClick={() => {
                            toast.dismiss(t.id); // Dismiss the toast
                            toast.promise(
                                deleteUserCategory(id),
                                {
                                    loading: 'در حال حذف ...',
                                    success: 'حذف دسته بندی با  موفقیت انجام شد',
                                    error: 'عملیات با خطا مواجه شد',
                                },

                            ).catch(error => {
                                console.error('Error:', error);
                            });
                            queryClient.invalidateQueries({ queryKey: ['userCategory'] })

                            // window.location.reload()
                        }
                    }
                        className="bg-red text-white px-4 py-2 rounded mr-2"
                    >
                        بله
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)} // Dismiss the toast
                        className="bg-zinc-800  text-white px-4 py-2 rounded"
                    >
                        خیر
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <DefaultLayout>
            <Toaster />
            <div className="p-4 mt-6 bg-white rounded-md dark:bg-graydark dark:text-bodydark">
                <form className="hidden" onSubmit={formik.handleSubmit}>
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

                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold leading-6 text-gray-900">دسته بندی کاربران</h1>
                        </div>
                        <div className="mt-4 sm:mr-16 sm:mt-0 sm:flex-none">
                            <Link href={"/panel/user-category/create"} className="block rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                ثبت دسته بندی جدید
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 w-[100px] pr-2 pl-3 text-right text-sm font-semibold text-gray-900 sm:pl-3">
                                            شناسه
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 w-[70%] text-right text-sm font-semibold text-gray-900">
                                            نام
                                        </th>
                                        <th scope="col" className="relative w-[80px] py-3.5 pl-3 pr-4 sm:pr-3">
                                            <span className="sr-only">ویرایش دسته بندی</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data?.data.map((userCategory : responseUserCategory) => {
                                        return (
                                            <tr key={userCategory.id} className="border-b border-zinc-200 dark:border-strokedark">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    {userCategory.id}
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    {userCategory.name}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                    <Link href={`/panel/user-category/edit/${userCategory.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                        ویرایش<span className="sr-only"></span>
                                                    </Link>
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                    <button
                                                        onClick={() => handleDelete(userCategory.id)}
                                                        className="text-white  hover:text-indigo-900 bg-red px-4 py-2 rounded-lg"
                                                    >
                                                        حذف دسته بندی<span className="sr-only"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default UserCategory;
