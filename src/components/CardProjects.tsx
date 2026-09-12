import { CardProjectsProps } from '../interfaces/projects.interface';
import '../assets/css/projects.css';

const CardProjects: React.FC<CardProjectsProps> = (props: CardProjectsProps) => {
    const { projectsData } = props;

    return (
        <div>
            <div className="text-center">
                <span className="section-kicker reveal">Portfolio</span>
                <h2 className="section-title reveal reveal-1">{projectsData.title}</h2>
            </div>
            <div className="row mt-4">
                {projectsData.projects.map((project, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                        <article className="project-card reveal" style={{ animationDelay: `${Math.min(index * 0.08, 0.4)}s` }}>
                            <div className="project-media">
                                <img src={project.image} alt={project.title} loading="lazy" />
                            </div>
                            <div className="project-body">
                                <h5 className="card-title">{project.title}</h5>
                                <ul className="card-text">
                                    {project.bodyText.map((text, idx) => (
                                        <li className="py-1" key={idx}>{text}</li>
                                    ))}
                                </ul>
                                <div className="project-links">
                                    {project.links.map((link, idx) => (
                                        <a key={idx} href={link.href} className="project-link-btn" target="_blank" rel="noopener noreferrer">
                                            {link.text} ↗
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="project-tags">
                                {project.tags.map((tag, idx) => (
                                    <span key={idx} className="project-tag">{tag}</span>
                                ))}
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardProjects;
