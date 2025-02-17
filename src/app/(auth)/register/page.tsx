'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { alertService } from '@/utils/alerts';
import Link from 'next/link';
import axios from 'axios';
import IconUser from '../../components/IconUser';
import IconMail from '../../components/IconMail';
import IconLockDots from '../../components/IconLockDots';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: RegisterFormValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('El nombre de usuario es requerido'),
    email: Yup.string().email('Correo inválido').required('El correo es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/auth', values);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alertService.success('Registrado correctamente');
      router.push('/login');
    } catch (error: any) {
        alertService.error(error.response?.data?.message || 'Error al Registrar Usuario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>  
        <div className="absolute inset-0">
            <img src="/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
        </div>
        <div dir="rtl" className="relative flex min-h-screen items-center justify-center bg-[url(/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
            <img src="/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
            <img src="/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />                
            <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">          
                <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(239,18,98,1)_0%,rgba(67,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 xl:skew-x-[-14deg] ">
                    <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent -left-10 bg-gradient-to-l xl:w-16 xl:-left-20 "></div>
                    <div className="xl:skew-x-[14deg] ">                       
                        <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                            <img src="/images/auth/login.svg" alt="Cover Image" className="w-full" />
                        </div>
                    </div>
                </div>  
                <div dir="ltr" className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                    <div className="w-full max-w-[440px] lg:mt-16">
                        <div className="mb-10">
                            <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Registrarse</h1>
                            <p className="text-base font-bold leading-normal text-white-dark">Ingresa los siguientes datos para registrarte</p>
                        </div>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting, errors, submitCount, touched, values })  => (
                            <Form className="space-y-5 dark:text-white">                            
                                <div className={submitCount && touched.username ? (errors.username ? 'has-error' : 'has-success') : ''}>
                                    <label htmlFor="username">Usuario</label>
                                    <div className="relative text-white-dark">
                                        <Field
                                            name="username"
                                            type="text"
                                            id="username"
                                            placeholder="Ingresa tu usuario"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                    {submitCount && touched.username ? (
                                        errors.username ? (
                                        <div className="text-danger mt-1">{errors.username}</div>
                                        ) : (
                                        <div className="text-success mt-1">¡Usuario válido!</div>
                                        )
                                    ) : null}
                                </div>
                                    
                                <div className={submitCount && touched.email ? (errors.email ? 'has-error' : 'has-success') : ''}>
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
                                <div className={submitCount && touched.password ? (errors.password ? 'has-error' : 'has-success') : ''}>
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
                                
                                <button
                                    type="submit"
                                    className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                    disabled={Object.values(values).some((value) => !value.trim())}
                                >
                                    {isSubmitting ? 'Registrando...' : 'Registrar'}
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
                            Ya tienes una cuenta ?&nbsp;
                            <Link href="/login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                Iniciar Sesion
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
