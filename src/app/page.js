'use client';
import React, { useState, useEffect, Fragment } from 'react';
import ModalDelete from './modalDelete';
import ModalDeleteAll from './modalDeleteAll';
import HeroImage from './heroImage';
import Head from "next/head";



export default function Home() {
    const [distances, setDistances] = useState([]);
    const [idDeleting, setIdDeleting] = useState([]);
    const [nElements, setNElements] = useState(0);
    const [deletingAll, setDeletingAll] = useState(false);
    const [modalDeletingVisible, setModalDeletingVisible] = useState(false);

      useEffect(() => {
        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        // Optionally, you can log or handle the rejection here
        });
    }, []);
    
    useEffect(() => {
        // Fetch the documents from the API when the component mounts
        fetchDistances();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    // Function to toggle the modal visibility
    const toggleModalDeleting = () => {
        setModalDeletingVisible(!modalDeletingVisible);
    };

    // Function to toggle the modal visibility
    const toggleModalDeletingAll = () => {
        setDeletingAll(!deletingAll);
    };

    const fetchDistances = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_HOST}/getDistances`);
        const data = await response.json();
        if(data.message == "Data found"){
            setDistances(data.distances);
            setNElements(distances.length)
        } else {
            setNElements(0)
            setDistances({})
        }
    } catch (error) {
        console.error('Error fetching distances:', error);
    }
    };

    // Function to toggle the modal visibility
    const openModalDeleting = (_idP) => {
        setIdDeleting(_idP)
        toggleModalDeleting()
    };

  return (
    <Fragment>
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
        </Head>
        <main className="flex min-h-screen flex-col items-center p-0 sm:p-8">
            <HeroImage/>
            {modalDeletingVisible && <ModalDelete toggleModalDeleting={toggleModalDeleting} idDeleting={idDeleting} fetchDistances={fetchDistances}/>}
            {deletingAll && (distances.length > 0) && <ModalDeleteAll toggleModalDeletingAll={toggleModalDeletingAll} fetchDistances={fetchDistances} nElements={nElements}/>}
        <h1 className="m-8">Sensor Ultrasónico</h1>
        <div className="max-w-full flex flex-col items-start sm:relative overflow-x-auto shadow-md sm:rounded-lg">
            <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 justify-self-end" onClick={toggleModalDeletingAll}>Borrar todo</button>
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Hora
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Distancia (cm)
                        </th>
                        <th scope="col" className="px-6 py-3" colSpan={2}>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {(distances.length > 0) && distances.map((distance, index) => {
                        const timestamp = new Date(distance.timestamp);
                        const date = timestamp.toISOString().split('T')[0];
                        const time = timestamp.toISOString().split('T')[1].split('.')[0];

                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <td style={{ display: 'none' }}>{distance._id}</td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {date}
                                </th>
                                <td className="px-6 py-4">
                                    {time}
                                </td>
                                <td className="px-6 py-4">
                                    {distance.distance}
                                </td>
                                <td className="px-6 py-4 text-right">
                                <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => openModalDeleting(distance._id)}>Borrar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        </main>
    </Fragment>
  )
}
