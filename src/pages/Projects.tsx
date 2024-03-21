import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectsData, CardItems } from '../interfaces/projects.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/projects.css';

import CardProjects from '../components/CardProjects';


const Projects: React.FC = () => {
    const { language, theme } = useAppContext();
    const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const filename = language === 'en' ? 'projects_en' : 'projects';
                const response = await axios.get<ProjectsData>(`./json/${filename}.json`);
                setProjectsData(response.data);
            } catch (error) {
                console.error('Error fetching projects data:', error);
            }
        };

        fetchProjectsData();
    }, [language]);

    const projectClass = theme === 'dark' ? 'projects_dark' : 'projects_light';

    const card = theme === 'dark' ? 'bg-dark border border-white' : 'bg-light border border-black ';
    const cardBody = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    const cardLink = theme === 'dark' ? ' btn-black text-white  border-white' : 'btn-white text-black border-black';
    const cardFooter = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';

    const cardItems: CardItems={
        card,
        cardBody,
        cardLink,
        cardFooter,
    };

    return (
        <div className={projectClass}>
            <div className='container'>
                {projectsData && (
                    <CardProjects projectsData={projectsData} cardItems={cardItems} />
                )}
            </div>
        </div>
    );
};

export default Projects;

