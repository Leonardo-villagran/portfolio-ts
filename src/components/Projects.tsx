import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectsData } from '../interfaces/projects.interface';
import { useAppContext } from '../context/Context';
import '../assets/css/projects.css';

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
    const card= theme === 'dark' ? 'card d-flex flex-column h-100 border rounded bg-dark' : 'card d-flex flex-column h-100 border rounded bg-light';
    const cardBody= theme === 'dark' ? 'card-body bg-black text-white flex-fill rounded ' : 'card-body bg-white text-black flex-fill rounded ';
    const cardLink= theme === 'dark' ? 'btn btn-black text-white border font-weight-bold me-2 mb-3' : 'btn btn-white text-black border font-weight-bold me-2 mb-3';

    return (
        <div className={projectClass}>
            <div className='container'>
                {projectsData && (
                    <div>
                        <h2 className='text-center'>{projectsData.title}</h2>
                        <div className="row">
                            {projectsData.projects.map((project, index) => (
                                <div key={index} className="col-md-4 mb-3">
                                    <div className={card}>
                                        <img src={project.image} className="card-img-top" alt={project.title} />
                                        <div className={cardBody}>
                                            <h5 className="card-title">{project.title}</h5>
                                            <ul className="card-text rounded">
                                                {project.bodyText.map((text, idx) => (
                                                    <li key={idx}>{text}</li>
                                                ))}
                                            </ul>
                                            <div className='text-center pt-3'>
                                                {project.links.map((link, idx) => (
                                                    <a key={idx} href={link.href} className={cardLink} target="_blank">{link.text}</a>
                                                ))}
                                            </div>
                                            <div className="text-center pt-4">
                                                {project.tags.map((tag, idx) => (
                                                    <span key={idx} className="badge badge-dark btn btn-dark me-2 mb-2">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;

