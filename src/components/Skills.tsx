import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TechSkill } from '../interfaces/skills.interface';
import '../assets/css/Skills.css';

const Skills: React.FC = () => {
    const [techStackData, setTechStackData] = useState<TechSkill | null>(null);

    useEffect(() => {
        const fetchTechStackData = async () => {
            try {
                const response = await axios.get<TechSkill>('./json/skills.json');
                setTechStackData(response.data);
            } catch (error) {
                console.error('Error fetching tech stack data:', error);
            }
        };

        fetchTechStackData();
    }, []);

    return (
        <div className='container text-center'>
            {techStackData && (
                <div>
                    <h2 >{techStackData.title}</h2>
                    <p >{techStackData.intro}</p>
                    {techStackData.skills.map((category, index) => (
                        <div key={index}>
                            <h3 >{category.title}</h3>
                            <div className="row justify-content-center">
                                {category.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="col-md-3 col-lg-2 mb-4">
                                        <div className="card text-center bg bg-black text-white">
                                            <img src={item.icon} className="skill-icon img-fluid mx-auto d-block" alt={item.title} style={{ maxWidth: '120px', margin: 'auto'}} />
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
    );
};

export default Skills;
