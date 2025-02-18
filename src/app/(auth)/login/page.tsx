'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { alertService } from '@/utils/alerts';
import Link from "next/link";
import axios from "axios";
import IconMail from "../../components/IconMail";
import IconLockDots from "../../components/IconLockDots";


interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/auth/login", values);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/"); // Redirigir a la página principal
    } catch (error: any) {
      alertService.error(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="absolute inset-0">
        <img src="/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover"/>
      </div>
      <div className="relative flex min-h-screen items-center justify-center bg-[url(/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        <img src="/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"/>
        <img src="/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]"/>
        <img src="/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]"/>
        <img src="/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]"/>
        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
          <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 xl:skew-x-[14deg] ">
            <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent -right-10 bg-gradient-to-r xl:w-16 xl:-right-20 "></div>
            <div className="xl:-skew-x-[14deg] ">
              <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                <img src="/images/auth/login.svg" alt="Cover Image" className="w-full"/>
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
            <div className="w-full max-w-[440px] lg:mt-16">
              <div className="mb-10">
                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Iniciar Sesion</h1>
                <p className="text-base font-bold leading-normal text-white-dark">Ingresa tu correo y contrasena para ingresar</p>
              </div>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting, errors, submitCount, touched, values }) => (
                  <Form className="space-y-5 dark:text-white">
                    {/* Campo de Correo */}
                    <div
                      className={ submitCount && touched.email ? errors.email ? "has-error" : "has-success" : ""}>
                      <label htmlFor="email">Correo</label>
                      <div className="relative text-white-dark">
                        <Field
                          name="email"
                          type="text"
                          id="email"
                          placeholder="Ingresa tu correo"
                          className="form-input ps-10 placeholder:text-white-dark"
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconMail fill={true} />
                        </span>
                      </div>
                      {submitCount && touched.email ? (
                        errors.email ? (
                          <div className="text-danger mt-1">{errors.email}</div>
                        ) : (
                          <div className="text-success mt-1">¡Correo válido!</div>
                        )
                      ) : null}
                    </div>

                    {/* Campo de Contraseña */}
                    <div
                      className={submitCount && touched.password ? errors.password ? "has-error" : "has-success" : ""}>
                      <label htmlFor="password">Contraseña</label>
                      <div className="relative text-white-dark">
                        <Field
                          name="password"
                          type="password"
                          id="password"
                          placeholder="Ingresa tu contraseña"
                          className="form-input ps-10 placeholder:text-white-dark"
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconLockDots fill={true} />
                        </span>
                      </div>
                      {submitCount && touched.password ? (
                        errors.password ? (
                          <div className="text-danger mt-1">{errors.password}</div>
                        ) : (
                          <div className="text-success mt-1">¡Contraseña válida!</div>
                        )
                      ) : null}
                    </div>

                    {/* Botón de envío */}
                    <button
                      type="submit"
                      className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                      disabled={Object.values(values).some((value) => !value.trim())} // Deshabilita el botón si algún campo está vacío
                    >
                      {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </button>
                  </Form>
                )}
              </Formik>
              <div className="relative my-7 text-center md:mb-9">
                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">
                  o
                </span>
              </div>
              <div className="text-center dark:text-white">
                No tienes una cuenta ?&nbsp;
                <Link href="/register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                  Registrarse
                </Link>
              </div>
            </div>
            <p className="absolute bottom-6 w-full text-center dark:text-white">© {new Date().getFullYear()}. JimmyGr, Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </>
  );
}