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

    const skillClass = theme === 'dark' ? 'skill_dark section-shell theme-dark' : 'skill_light section-shell theme-light';

    return (
        <div className={skillClass}>
            <div className="container text-center" style={{ maxWidth: 'var(--max-w)' }}>
                {techStackData && (
                    <div>
                        <span className="section-kicker reveal">Stack</span>
                        <h2 className="section-title reveal reveal-1">{techStackData.title}</h2>
                        <p className="section-subtitle reveal reveal-2">{techStackData.intro}</p>
                        {techStackData.skills.map((category, index) => (
                            <div key={index}>
                                <h3 className="skill-category">{category.title}</h3>
                                <div className="row justify-content-center pt-4">
                                    {category.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="col-6 col-md-3 col-lg-2 mb-4">
                                            <div className="skill-tile">
                                                <img src={item.icon} className="skill-icon img-fluid mx-auto d-block" alt={item.title} style={{ maxWidth: '84px', margin: 'auto' }} loading="lazy" />
                                                <div className="card-body">
                                                    <p className="card-title mt-3">{item.title}</p>
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
