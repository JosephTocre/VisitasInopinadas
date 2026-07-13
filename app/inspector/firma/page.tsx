"use client";

import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function FirmaInspectorPage() {

    const sigRef = useRef<SignatureCanvas>(null);
    const router = useRouter();


    const [tieneFirma, setTieneFirma] = useState(false);
    const [cargando, setCargando] = useState(true);



    const obtenerUsuarioId = () => {

        if (typeof window === "undefined") return null;


        const usuarioGuardado = localStorage.getItem("usuario");


        if (!usuarioGuardado) return null;


        const usuario = JSON.parse(usuarioGuardado);


        return usuario.id;

    };




    // Verificar si el inspector ya tiene firma
    useEffect(() => {


        const verificarFirma = async () => {


            const usuarioId = obtenerUsuarioId();



            if (!usuarioId) {

                setCargando(false);

                Swal.fire({
                    icon: "error",
                    title: "Usuario no encontrado",
                    text: "No se pudo identificar al inspector"
                });

                return;

            }
            try {
                const res = await fetch(
                    `/api/personal/${usuarioId}/firmar`
                );
                const data = await res.json();
                if (data?.firma) {

                    setTieneFirma(true);

                }
            } catch (error) {
                console.error(error);

            } finally {

                setCargando(false);
            }
        };
        verificarFirma();
    }, []);

    const limpiar = () => {

        sigRef.current?.clear();

    };

    const guardar = async () => {

        const usuarioId = obtenerUsuarioId();

        if (!usuarioId) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se encontró el inspector"
            });

            return;

        }

        if (!sigRef.current || sigRef.current.isEmpty()) {

            Swal.fire({

                icon: "warning",
                title: "Firma requerida",
                text: "Debe registrar su firma antes de guardar"

            });

            return;

        }

        const firma = sigRef.current
            .getTrimmedCanvas()
            .toDataURL("image/png");
        try {

            const res = await fetch(
                `/api/personal/${usuarioId}/firmar`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        firma

                    })

                }
            );

            const data = await res.json();

            if (res.ok) {

                Swal.fire({

                    icon: "success",
                    title: "Firma registrada",
                    text: "Su firma fue guardada correctamente",
                    confirmButtonText: "Aceptar"

                });

                setTieneFirma(true);

                router.push("/inspector");

            } else {

                Swal.fire({

                    icon: "error",
                    title: "Error",
                    text: data.error || "No se pudo guardar la firma"

                });

            }

        } catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",
                title: "Error",
                text: "Error al guardar la firma"

            });

        }
    };

    if (cargando) {

        return (

            <div className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-gray-50
            ">

                Cargando...

            </div>

        );


    }

    return (

        <div className="
            min-h-screen
            bg-gray-50
            flex
            items-center
            justify-center
            p-4
        ">

            <div className="
                w-full
                max-w-xl
                bg-white
                rounded-2xl
                shadow-lg
                p-6
            ">

                <h1 className="
                    text-2xl
                    font-bold
                    text-center
                ">

                    Firma del Inspector

                </h1>

                <p className="
                    text-center
                    text-sm
                    text-gray-500
                    mt-2
                    mb-6
                ">
                    Esta firma aparecerá automáticamente en los reportes PDF
                </p>

                {
                    tieneFirma ? (
                        <div className="
                            bg-green-50
                            border
                            border-green-200
                            rounded-xl
                            p-5
                            text-center
                        ">
                            <h2 className="
                                text-green-700
                                font-bold
                            ">

                                ✓ Firma registrada

                            </h2>

                            <p className="
                                text-sm
                                text-gray-600
                                mt-2
                            ">

                                Su firma ya está guardada y será utilizada en futuras visitas.

                            </p>

                        </div>

                    ) : (

                        <>
                            <div className="
                                border-2
                                border-dashed
                                border-gray-300
                                rounded-xl
                                overflow-hidden
                            ">



                                <SignatureCanvas

                                    ref={sigRef}

                                    penColor="black"


                                    canvasProps={{

                                        className:
                                            "w-full h-64 bg-white touch-none"

                                    }}

                                />
                            </div>

                            <div className="
                                flex
                                gap-3
                                mt-6
                            ">
                                <button

                                    onClick={limpiar}
                                    className="
                                        flex-1
                                        py-3
                                        rounded-xl
                                        bg-gray-100
                                        hover:bg-gray-200
                                        font-semibold
                                    "
                                >
                                    Limpiar
                                </button>
                                <button
                                    onClick={guardar}
                                    className="
                                        flex-1
                                        py-3
                                        rounded-xl
                                        bg-black
                                        text-white
                                        hover:bg-gray-900
                                        font-semibold
                                    "
                                >
                                    Guardar firma
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );

}