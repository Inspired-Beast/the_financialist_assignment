"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoGooglePlus } from 'react-icons/bi';
import Image from 'next/image';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch('http://localhost:8080/auth', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ username, password }),
        // });
        router.refresh();
        const api = axios.create({
            baseURL: 'http://localhost:8080', // Your Express server URL
            withCredentials: true // Enable sending cookies with requests
        });

        const response = await api.post('/auth', { username, password }, { cache: false });
        if (response.status===200) {
            console.log(response.status)
            router.push('/type_1_home'); // Redirect to dashboard or another page
        } else {
            const errorData = await response.data;
            console.log(errorData)
            alert(errorData.error); // Handle error
        }
    };
    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <video src={"/background.mp4"} loop autoPlay muted className='object-cover brightness-50 opacity-70 absolute h-screen w-screen -z-10 top-0 left-0'></video>
          <div className="md:w-1/2 max-w-sm">
            <Image
              width={400}
              height={400}
              src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Sample image"
            />
          </div>
          <form onSubmit={handleSubmit} className="md:w-1/3 max-w-sm">
            <div className="text-center md:text-left">
              <label className="mr-1">Sign in with</label>
              <button
                type="button"
                className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
              >
                <BiLogoFacebook
                  size={20}
                  className="flex justify-center items-center w-full"
                />
              </button>
              <button
                type="button"
                className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
              >
                <AiOutlineTwitter
                  size={20}
                  className="flex justify-center items-center w-full"
                />
              </button>
              <button
                type="button"
                className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
              >
                <BiLogoGooglePlus
                  size={20}
                  className="flex justify-center items-center w-full"
                />
              </button>
            </div>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                Or
              </p>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              placeholder="Password"
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <a
                className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </section>
      );
};

export default LoginForm;