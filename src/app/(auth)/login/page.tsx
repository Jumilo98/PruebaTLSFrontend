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

  const initialValues: LoginFormValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Correo inválido").required("El correo es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/api/auth/login", values);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alertService.success("¡Inicio de sesión exitoso!");
      router.push("/");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error al iniciar sesión";
      alertService.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Fondo del Login */}
      <div className="absolute inset-0">
        <img src="/images/auth/bg-gradient.png" alt="Fondo" className="h-full w-full object-cover"/>
      </div>

      <div className="relative flex min-h-screen items-center justify-center bg-[url(/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
        {/* Objetos decorativos */}
        <img src="/images/auth/coming-soon-object1.png" alt="Decoración" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"/>
        <img src="/images/auth/coming-soon-object2.png" alt="Decoración" className="absolute left-24 top-0 h-40 md:left-[30%]"/>
        <img src="/images/auth/coming-soon-object3.png" alt="Decoración" className="absolute right-0 top-0 h-[300px]"/>
        <img src="/images/auth/polygon-object.svg" alt="Decoración" className="absolute bottom-0 end-[28%]"/>

        {/* Contenedor del formulario */}
        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
          
          {/* Sección Izquierda (Imagen) */}
          <div className="relative hidden w-full items-center justify-center bg-gradient-to-br from-pink-500 to-blue-500 p-5 lg:inline-flex lg:max-w-[835px]">
            <div className="mt-24 hidden w-full max-w-[430px] lg:block">
              <img src="/images/auth/login.svg" alt="Login" className="w-full"/>
            </div>
          </div>

          {/* Sección Derecha (Formulario) */}
          <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
            <div className="w-full max-w-[440px] lg:mt-16">
              
              {/* Encabezado */}
              <div className="mb-10 text-center">
                <h1 className="text-3xl font-extrabold uppercase text-primary md:text-4xl">Iniciar Sesión</h1>
                <p className="text-base font-bold text-white-dark">Ingresa tu correo y contraseña</p>
              </div>

              {/* Formulario */}
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateonBlur={false}>
                {({ errors, touched, isValid, dirty }) => (
                  <Form className="space-y-5 dark:text-white">
                    
                    {/* Campo Correo */}
                    <div className={touched.email && errors.email ? "has-error" : ""}>
                      <label htmlFor="email">Correo</label>
                      <div className="relative text-white-dark">
                        <Field
                          name="email"
                          type="email"
                          id="email"
                          placeholder="Ingresa tu correo"
                          className="form-input ps-10 placeholder:text-white-dark"
                          autoFocus
                          autoComplete="email"
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconMail fill={true} />
                        </span>
                      </div>
                      {touched.email && errors.email && <div className="text-danger mt-1">{errors.email}</div>}
                    </div>

                    {/* Campo Contraseña */}
                    <div className={touched.password && errors.password ? "has-error" : ""}>
                      <label htmlFor="password">Contraseña</label>
                      <div className="relative text-white-dark">
                        <Field
                          name="password"
                          type="password"
                          id="password"
                          placeholder="Ingresa tu contraseña"
                          className="form-input ps-10 placeholder:text-white-dark"
                          autoComplete="current-password"
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <IconLockDots fill={true} />
                        </span>
                      </div>
                      {touched.password && errors.password && <div className="text-danger mt-1">{errors.password}</div>}
                    </div>

                    {/* Botón de Envío */}
                    <button
                      type="submit"
                      className="btn btn-gradient mt-6 w-full uppercase shadow-lg"
                      disabled={!isValid || !dirty || isSubmitting} // Evita envíos con datos inválidos
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

              {/* Enlace de Registro */}
              <div className="text-center dark:text-white mt-6">
                ¿No tienes una cuenta?&nbsp;
                <Link href="/register" className="text-primary underline transition hover:text-black dark:hover:text-white" onMouseDown={(e) => e.preventDefault()}>
                  Regístrate
                </Link>
              </div>
            </div>

            {/* Footer */}
            <p className="absolute bottom-6 w-full text-center dark:text-white">
              © {new Date().getFullYear()} JimmyGr, Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
