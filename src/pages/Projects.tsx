import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectsData } from '../interfaces/projects.interface';
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

    const projectClass = theme === 'dark' ? 'projects_dark section-shell theme-dark' : 'projects_light section-shell theme-light';

    return (
        <div className={projectClass}>
            <div className="container" style={{ maxWidth: 'var(--max-w)' }}>
                {projectsData && (
                    <CardProjects projectsData={projectsData} />
                )}
            </div>
        </div>
    );
};

export default Projects;
