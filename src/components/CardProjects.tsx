import React, { useState, useMemo } from 'react';
import { CardProjectsProps, Project } from '../interfaces/projects.interface';
import '../assets/css/projects.css';
import { useAppContext } from '../context/Context';
import SearchIcon from '@mui/icons-material/Search';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

type CategoryType = 'all' | 'featured' | 'ai' | 'fullstack' | 'cloud' | 'data';

const CardProjects: React.FC<CardProjectsProps> = (props: CardProjectsProps) => {
    const { projectsData } = props;
    const { language } = useAppContext();

    const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Filter categories definitions
    const categories: { id: CategoryType; labelEs: string; labelEn: string; icon?: React.ReactNode }[] = [
        { id: 'all', labelEs: 'Todos', labelEn: 'All' },
        { id: 'featured', labelEs: 'Destacados', labelEn: 'Featured', icon: <StarIcon sx={{ fontSize: '0.95rem' }} /> },
        { id: 'ai', labelEs: 'IA & GenAI', labelEn: 'AI & GenAI', icon: <AutoAwesomeIcon sx={{ fontSize: '0.95rem' }} /> },
        { id: 'fullstack', labelEs: 'Full-Stack', labelEn: 'Full-Stack' },
        { id: 'cloud', labelEs: 'Cloud & Docker', labelEn: 'Cloud & Docker' },
        { id: 'data', labelEs: 'Python & Data', labelEn: 'Python & Data' },
    ];

    // Helper to determine featured projects
    const isFeatured = (p: Project) => {
        const titleLower = p.title.toLowerCase();
        return (
            titleLower.includes('portafolio docente') ||
            titleLower.includes('tracker') ||
            titleLower.includes('simce') ||
            titleLower.includes('planifica') ||
            titleLower.includes('biotik')
        );
    };

    // Helper to determine AI projects
    const isAiProject = (p: Project) => {
        const titleLower = p.title.toLowerCase();
        const hasTag = p.tags.some((t: string) => {
            const tl = t.toLowerCase();
            return tl.includes('ai') || tl.includes('ia') || tl.includes('gemini') || tl.includes('generative');
        });
        return hasTag || titleLower.includes('ia') || titleLower.includes('ai');
    };

    // Helper to determine Cloud/Docker projects
    const isCloudProject = (p: Project) => {
        return p.tags.some((t: string) => {
            const tl = t.toLowerCase();
            return tl.includes('docker') || tl.includes('cloud') || tl.includes('nginx');
        });
    };

    // Helper to determine Python/Data projects
    const isDataProject = (p: Project) => {
        return p.tags.some((t: string) => {
            const tl = t.toLowerCase();
            return tl.includes('python') || tl.includes('flask') || tl.includes('data') || tl.includes('odk');
        });
    };

    // Filtered projects list
    const filteredProjects = useMemo(() => {
        return projectsData.projects.filter(project => {
            // Category filter
            if (activeCategory === 'featured' && !isFeatured(project)) return false;
            if (activeCategory === 'ai' && !isAiProject(project)) return false;
            if (activeCategory === 'fullstack' && !project.tags.some((t: string) => ['React', 'Node.js', 'Express', 'PostgreSQL'].includes(t))) return false;
            if (activeCategory === 'cloud' && !isCloudProject(project)) return false;
            if (activeCategory === 'data' && !isDataProject(project)) return false;

            // Specific tag filter
            if (selectedTag && !project.tags.includes(selectedTag)) return false;

            // Search query filter
            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase();
                const matchTitle = project.title.toLowerCase().includes(query);
                const matchBody = project.bodyText.some((b: string) => b.toLowerCase().includes(query));
                const matchTags = project.tags.some((t: string) => t.toLowerCase().includes(query));
                if (!matchTitle && !matchBody && !matchTags) return false;
            }

            return true;
        });
    }, [projectsData.projects, activeCategory, searchQuery, selectedTag]);


    const handleTagClick = (tag: string) => {
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
        }
    };

    const clearAllFilters = () => {
        setActiveCategory('all');
        setSearchQuery('');
        setSelectedTag(null);
    };

    return (
        <div className="projects-showcase-wrapper">
            {/* Header */}
            <div className="text-center mb-4">
                <span className="section-kicker reveal">Portfolio</span>
                <h2 className="section-title reveal reveal-1">{projectsData.title}</h2>
                <p className="section-subtitle reveal reveal-2">
                    {language === 'en'
                        ? 'Production web applications, cloud architectures, and artificial intelligence solutions.'
                        : 'Sistemas web en producción, arquitecturas cloud y soluciones con inteligencia artificial.'}
                </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="projects-controls-container reveal reveal-2">
                {/* Category Pills */}
                <div className="category-pills-row">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`category-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => {
                                setActiveCategory(cat.id);
                                setSelectedTag(null);
                            }}
                        >
                            {cat.icon && <span className="cat-icon">{cat.icon}</span>}
                            <span>{language === 'en' ? cat.labelEn : cat.labelEs}</span>
                        </button>
                    ))}
                </div>

                {/* Search Box */}
                <div className="projects-search-bar">
                    <SearchIcon sx={{ color: '#64748b', fontSize: '1.2rem', marginLeft: '0.75rem' }} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={
                            language === 'en'
                                ? 'Search by technology (React, Docker, Gemini, PostgreSQL)...'
                                : 'Buscar por tecnología (React, Docker, Gemini, PostgreSQL)...'
                        }
                        className="search-input-field"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="search-clear-btn"
                            title={language === 'en' ? 'Clear search' : 'Limpiar búsqueda'}
                        >
                            <ClearIcon sx={{ fontSize: '1rem' }} />
                        </button>
                    )}
                </div>

                {/* Active Filter Indicators */}
                <div className="projects-meta-bar">
                    <span className="projects-count">
                        {language === 'en'
                            ? `Showing ${filteredProjects.length} of ${projectsData.projects.length} projects`
                            : `Mostrando ${filteredProjects.length} de ${projectsData.projects.length} proyectos`}
                    </span>

                    {(selectedTag || searchQuery || activeCategory !== 'all') && (
                        <button type="button" onClick={clearAllFilters} className="clear-filters-link">
                            <ClearIcon sx={{ fontSize: '0.9rem', marginRight: '3px' }} />
                            {language === 'en' ? 'Reset filters' : 'Restablecer filtros'}
                            {selectedTag && <span className="active-tag-badge">#{selectedTag}</span>}
                        </button>
                    )}
                </div>
            </div>

            {/* Projects Grid */}
            <div className="row mt-3">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => {
                        const featured = isFeatured(project);
                        const aiPowered = isAiProject(project);

                        return (
                            <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                                <article
                                    className={`project-card ${featured ? 'card-featured' : ''} reveal`}
                                    style={{ animationDelay: `${Math.min(index * 0.06, 0.35)}s` }}
                                >
                                    {/* Media Container with badges */}
                                    <div className="project-media">
                                        <img src={project.image} alt={project.title} loading="lazy" />

                                        {/* Ribbons / Badges */}
                                        <div className="project-media-badges">
                                            {featured && (
                                                <span className="badge-featured">
                                                    <StarIcon sx={{ fontSize: '0.8rem' }} />
                                                    {language === 'en' ? 'Featured' : 'Destacado'}
                                                </span>
                                            )}
                                            {aiPowered && (
                                                <span className="badge-ai">
                                                    <AutoAwesomeIcon sx={{ fontSize: '0.8rem' }} />
                                                    IA Powered
                                                </span>
                                            )}
                                        </div>

                                        {/* Status indicator on top right */}
                                        <div className="project-status-badge" title="Live & Deployed">
                                            <span className="status-dot" />
                                            <span>Cloud</span>
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="project-body">
                                        <h3 className="card-title">{project.title}</h3>

                                        <ul className="project-highlights">
                                            {project.bodyText.map((text, idx) => (
                                                <li key={idx}>
                                                    <CheckCircleOutlineIcon sx={{ fontSize: '0.95rem', color: '#38bdf8', flexShrink: 0, marginTop: '3px' }} />
                                                    <span>{text}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Action Buttons */}
                                        <div className="project-links">
                                            {project.links.map((link, idx) => {
                                                const isGithub = link.text.toLowerCase().includes('github');
                                                return (
                                                    <a
                                                        key={idx}
                                                        href={link.href}
                                                        className={isGithub ? 'project-btn-github' : 'project-btn-live'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {isGithub ? (
                                                            <>
                                                                <GitHubIcon sx={{ fontSize: '1.05rem' }} />
                                                                <span>{link.text}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <LaunchIcon sx={{ fontSize: '1rem' }} />
                                                                <span>{link.text}</span>
                                                            </>
                                                        )}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Technology Tags */}
                                    <div className="project-tags">
                                        {project.tags.map((tag, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => handleTagClick(tag)}
                                                className={`project-tag-btn ${selectedTag === tag ? 'active-tag' : ''}`}
                                                title={`Filtrar por ${tag}`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </article>
                            </div>
                        );
                    })
                ) : (
                    /* Zero Results State */
                    <div className="col-12 py-5 text-center">
                        <div className="empty-results-box glass p-5 mx-auto" style={{ maxWidth: '500px' }}>
                            <SearchIcon sx={{ fontSize: '3rem', color: '#64748b', marginBottom: '1rem' }} />
                            <h4>{language === 'en' ? 'No projects found' : 'No se encontraron proyectos'}</h4>
                            <p className="text-muted small">
                                {language === 'en'
                                    ? 'Try clearing your search query or selecting a different category.'
                                    : 'Intenta limpiar la búsqueda o seleccionar otra categoría.'}
                            </p>
                            <button type="button" onClick={clearAllFilters} className="btn-gradient mt-3">
                                {language === 'en' ? 'Show all projects' : 'Ver todos los proyectos'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardProjects;

