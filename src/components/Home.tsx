import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SocialIcon } from 'react-social-icons';
import Typewriter from 'typewriter-effect';
import { Data } from '../interfaces/home.interfaces';
import '../assets/css/Home.css'

const Home: React.FC = () => {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Data>('./json/home.json');
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='hero'>
            {data && (
                <div>
                    <h1>{data.name}</h1>
                        <Typewriter
                            options={{
                                strings: data.roles,
                                autoStart: true,
                                loop: true,
                                delay: 30, 
                                deleteSpeed: 20
                            }}
                        />
                    <div>
                        <SocialIcon url={data.linkedin} style={{ height: 50, width: 50 }} />
                        <SocialIcon url={data.github} style={{ height: 50, width: 50 }} />
                        <SocialIcon url={`mailto:${data.email}`} style={{ height: 50, width: 50 }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;