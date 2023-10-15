// MyComponent.js
import React from 'react';
import Image from 'next/image'
import sensorImage from './Images/SensorUltrasonico.png'

function HeroImage() {
  return (
    <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Sensor ultrasónico HC-SR04</h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">El sensor ultrasónico HC-SR04 es un dispositivo popular utilizado para medir distancias de manera precisa y no invasiva. Este sensor funciona emitiendo ondas ultrasónicas de alta frecuencia y luego registrando el tiempo que tarda en recibir el eco de esas ondas una vez que rebotan en un objeto.</p>
                <p className="inline-flex pl-0 px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800">
                    Industria 4.0: Tecnologias emergentes
                </p>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <Image src={sensorImage} alt="Sensor Ultrasonico" width={500} height={500} />
            </div>                
        </div>
    </section>
  );
}

export default HeroImage;
