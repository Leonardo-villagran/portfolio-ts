import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TechSkill } from '../interfaces/skills.interface';
import '../assets/css/Skills.css';
import { useAppContext } from '../context/Context';

const Skills: React.FC = () => {
    const { language, theme } = useAppContext();
    const [techStackData, setTechStackData] = useState<TechSkill | null>(null);

    useEffect(() => {
        const fetchTechStackData = async () => {
            try {
                const filename = language === 'en' ? 'skills_en' : 'skills';
                const response = await axios.get<TechSkill>(`./json/${filename}.json`);
                setTechStackData(response.data);
            } catch (error) {
                console.error('Error fetching tech stack data:', error);
            }
        };

        fetchTechStackData();
    }, [language]);

    // Agrega una clase al contenedor principal del hero según el tema seleccionado
    const skillClass = theme === 'dark' ? 'skill_dark' : 'skill_light';
    const cardColor = theme === 'dark' ?
        'card text-center bg-transparent text-white border-0 ' :
        'card text-center bg-transparent text-dark border-0 ';

    return (
        <div className={skillClass}>
            <div className='container text-center'>
                {techStackData && (
                    <div>
                        <h2 className='p-2'>{techStackData.title}</h2>
                        <p className='p-2'>{techStackData.intro}</p>
                        {techStackData.skills.map((category, index) => (
                            <div key={index}>
                                <h3 className='p-2' >{category.title}</h3>
                                <div className="row justify-content-center pt-4">
                                    {category.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="col-md-3 col-lg-2 mb-4">
                                            <div className={cardColor}>
                                                <img src={item.icon} className="skill-icon img-fluid mx-auto d-block" alt={item.title} style={{ maxWidth: '120px', margin: 'auto' }} />
                                                <div className="card-body ">
                                                    <p className="card-title">{item.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Skills;
