import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AboutData } from '../interfaces/about.interface';
import { useAppContext } from '../context/Context';

const About: React.FC = () => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const { language, theme } = useAppContext();

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const filename= language === 'en' ? 'about_en' : 'about';
                const response = await axios.get<AboutData>(`./json/${filename}.json`);
                setAboutData(response.data);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };

        fetchAboutData();
    }, [language]);

        // Agrega una clase al contenedor principal del hero según el tema seleccionado
        const aboutClass = theme === 'dark' ? 'hero_dark' : 'hero_light';
        const cardColor = theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';

    return (
        <div className={aboutClass}>

        <div className='container' >
            {aboutData && (
                <div>
                    <h2 className='text-center'>{aboutData.title}</h2>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className={`card d-flex flex-column h-100 ${cardColor}`}>
                                <div className="card-body text-center">
                                    <h3>{aboutData.title_card}</h3>
                                    <img src={aboutData.image} className="img-fluid rounded mx-auto" alt="About" />
                                    <p style={{textAlign: 'justify'}}>{aboutData.about}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div className={`card d-flex flex-column h-100 ${cardColor}`}>
                                <div className="card-body text-center">
                                    <h3>{aboutData.family_card}</h3>
                                    <img src={aboutData.family_picture} className="img-fluid rounded mx-auto" alt="Family" />
                                    <p style={{textAlign: 'justify'}}>{aboutData.family}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                        <div className={`card d-flex flex-column h-100 ${cardColor}`}>
                                <div className="card-body text-center">
                                    <h3>{aboutData.sport_card}</h3>
                                    <img src={aboutData.sport_picture} className="img-fluid rounded mx-auto" alt="Sport" />
                                    <p style={{textAlign: 'justify'}} >{aboutData.sport}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                        <div className={`card d-flex flex-column h-100 ${cardColor}`}>
                                <div className="card-body text-center">
                                    <h3>{aboutData.hobbie_card}</h3>
                                    <img src={aboutData.hobbie_picture} className="img-fluid rounded mx-auto" alt="Hobbie" />
                                    <p style={{textAlign: 'justify'}}>{aboutData.hobbie}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
                    
        </div>
    );
};

export default About;
