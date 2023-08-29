"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {

  const [lang, setLang] = useState("Not Set Yet!");
  const [theme, setTheme] = useState("Not Set Yet!");
  const [data, setData] = useState({
    message: "",
    version: ""
  })


  const getCookie = async () => {
    const response = await fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await response.json();

    setLang(data.lang ? data.lang : "Not Set Yet!");
    setTheme(data.theme ? data.theme : "Not Set Yet!")
  }

  useEffect(() => {
    async function fetchStaticData() {
      const response = await fetch("/api/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })

      const data = await response.json()
      setData(data);
    }
    fetchStaticData();
  }, [])

  useEffect(() => {
    getCookie();
  }, []);



  const handelClick = async () => {

    const userPreference = {
      theme: "dark",
      language: "en",
    };
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPreference),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success: " + data.message);
      getCookie();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className=' p-4 text-4xl font-bold text-gray-700'>{data?.message}</h1>
      <h3 className='m-6 p-4 text-xl font-bold text-gray-600'>Version : {data.version}</h3>
      <div className="w-full flex justify-center">
        <button
          className="bg-red-600 p-4 rounded-md text-white"
          onClick={handelClick}
        >
          Set Cookie
        </button>

        <Link href="/api/redirect">
          <button
            className="bg-green-600 p-4 mx-4 rounded-md text-white"
          >
            Go to Blog Page
          </button>
        </Link>
      </div>
      <h3 className='text-center text-2xl mt-4 p-2 font-bold'>Cookies</h3>
      <div className="w-full flex justify-center">

        <table className="table table-auto bg-gray-800 text-white border-solid border-2 border-sky-500 mt-8">
          <thead>
            <tr>
              <th className="py-4 px-8 mx-4">Language</th>
              <th className="py-4 px-8 mx-4">Theme</th>
            </tr>
          </thead>

          <tbody className="table-body">
            <tr>
              <td className='px-8 py-4'>{lang}</td>
              <td className='px-8 py-4'>{theme}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
