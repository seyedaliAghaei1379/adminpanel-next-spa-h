"use client";
import React, {useContext} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {login} from "@/services/authServices";
import toast, {Toaster} from "react-hot-toast";
import {useUser} from "../../../../context/UserContext";
import {useRouter} from "next/navigation";

const SignIn = () => {
    const {user, setUser, loading, setLoading} = useUser();
    const router = useRouter()
    // console.log(user)
    if(user?.token){
        router.replace('/')
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
        password: Yup.string()
            .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
            .required("رمز عبور الزامی است"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // Handle form submission
            toast.promise(
                login({
                    email: values.email,
                    password: values.password
                }),
                {
                    loading: 'در حال ورود...',
                    success: 'عملیات با موفقیت انجام شد',
                    error: 'عملیات با خطا مواجه شد',
                }
            )
                .then(result => {
                    // console.log("result");
                    // console.log(result);
                    // console.log("result end");
                    sessionStorage.setItem('token' , result?.token)
                    sessionStorage.setItem('permissions' , String(result?.permissions))
                    setUser({
                        token : result?.token,
                        permissions : result?.permissions
                    })

                    // console.log("user")
                    // console.log(user)
                    // console.log("user")


                    // Do something with result.token if needed
                })
                .catch(e => {
                    console.error(e);
                    // Handle error if needed
                });

        },
    });

    return (
        <div className={"container min-h-screen flex justify-center items-center mx-auto max-w-[500px] mt-4"}>
            <Toaster/>
            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                    <div className="w-full border-stroke dark:border-strokedark xl:border-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <span className="mb-1.5 block font-medium ">اطلاعات خود را وارد کنید</span>
                            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                                ورود به حساب
                            </h2>

                            <form onSubmit={formik.handleSubmit}>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className={`w-full rounded-lg border ${
                                                formik.touched.email && formik.errors.email
                                                    ? "border-red-500"
                                                    : "border-stroke"
                                            } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                            {...formik.getFieldProps("email")}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className="text-red-500 text-sm mt-1">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            className={`w-full rounded-lg border ${
                                                formik.touched.password && formik.errors.password
                                                    ? "border-red-500"
                                                    : "border-stroke"
                                            } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                            {...formik.getFieldProps("password")}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="text-red-500 text-sm mt-1">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    >
                                        ورود
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
