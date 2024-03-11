import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectsData } from '../interfaces/projects.interface';

const Projects: React.FC = () => {
    const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const response = await axios.get<ProjectsData>('./json/projects.json');
                setProjectsData(response.data);
            } catch (error) {
                console.error('Error fetching projects data:', error);
            }
        };

        fetchProjectsData();
    }, []);

    return (
        <div className='container'>
            {projectsData && (
                <div>
                    <h2 className='text-center'>{projectsData.title}</h2>
                    <div className="row">
                        {projectsData.projects.map((project, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <div className="card d-flex flex-column h-100 border rounded">
                                    <img src={project.image} className="card-img-top" alt={project.title} />
                                    <div className="card-body bg-black text-white flex-fill">
                                        <h5 className="card-title">{project.title}</h5>
                                        <ul className="card-text">
                                            {project.bodyText.map((text, idx) => (
                                                <li key={idx}>{text}</li>
                                            ))}
                                        </ul>
                                        <div className='text-center pt-3'>
                                            {project.links.map((link, idx) => (
                                                <a key={idx} href={link.href} className="btn btn-black text-white border rounded me-2 mb-3">{link.text}</a>
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
    );
};

export default Projects;

