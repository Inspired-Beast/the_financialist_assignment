'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

export default  function Type_1_Home(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/profile',{ withCredentials: true });
                if (response.status!==200) {
                    throw new Error('Network response was not ok');
                }
                setData(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);
    console.log(data)
    return(
        <div className='flex m-10 flex flex-col md:flex-row justify-center items-center gap-20 space-y-10 md:space-y-0 g-10'>
        <div>
        {!data ? <div>No data for type_2</div>
        :<div>
            <div>You have {data.data.type} access</div>
            </div>}
        <div>
            /profile results
            <div><pre>{JSON.stringify(data, null, 2) }</pre></div>
        </div>
        </div>
        <div className='md:w-1/2 max-w-sm mx-h-sm md:h-1/2'>
            {/* <Image src="https://images.pexels.com/photos/7282017/pexels-photo-7282017.jpeg?auto=compress&cs=tinysrgb&w=600"
            className='md:w-1/2 max-w-sm mx-h-sm md:h-1/2'
            width={400}
            height={200}
            /> */}
        </div>
    </div>
    )
}