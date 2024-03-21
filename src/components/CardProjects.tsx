import { CardProjectsProps}    from '../interfaces/projects.interface';
import '../assets/css/projects.css';

const CardProjects: React.FC<CardProjectsProps> = (props: CardProjectsProps) => {


    const { projectsData, cardItems} = props;


    return (
        <div>
            <h2 className='text-center'>{projectsData.title}</h2>
            <div className="row">
                {projectsData.projects.map((project, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4 mb-3 pb-2">
                        <div className={`card d-flex flex-column h-100 border border-2 rounded ${cardItems.card}`}>
                            <img src={project.image} className="card-img-top border-0 " alt={project.title} />
                            <div className={`card-body d-flex flex-column h-100 custom-rounded-bottom ${cardItems.cardBody}`}>
                                <h5 className="card-title p-1">{project.title}</h5>
                                <ul className="card-text">
                                    {project.bodyText.map((text, idx) => (
                                        <li className="py-1" key={idx}>{text}</li>
                                    ))}
                                </ul>
                                <div className='text-center pt-3 border-0'>
                                    {project.links.map((link, idx) => (
                                        <a key={idx} href={link.href} className={`btn border rounded font-weight-bold me-2 mb-3 ${cardItems.cardLink}`} target="_blank">{link.text}</a>
                                    ))}
                                </div>

                            </div>
                            <div className={`card-footer text-center ${cardItems.cardFooter}`}>
                                {project.tags.map((tag, idx) => (
                                    <span key={idx} className="badge badge-dark btn btn-dark me-2 mb-2">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardProjects