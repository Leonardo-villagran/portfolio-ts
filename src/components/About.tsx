import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AboutData } from '../interfaces/about.interface';

const About: React.FC = () => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get<AboutData>('./json/about.json');
                setAboutData(response.data);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };

        fetchAboutData();
    }, []);

    return (
        <div className='container' >
            {aboutData && (
                <div>
                    <h2 className='text-center'>{aboutData.title}</h2>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card d-flex flex-column h-100 bg-dark text-white">
                                <div className="card-body text-center">
                                    <h3>¿Quién soy?</h3>
                                    <img src={aboutData.image} className="img-fluid rounded mx-auto" alt="About" />
                                    <p style={{textAlign: 'justify'}}>{aboutData.about}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card d-flex flex-column h-100 bg-dark text-white">
                                <div className="card-body text-center">
                                    <h3>Familia</h3>
                                    <img src={aboutData.family_picture} className="img-fluid rounded mx-auto" alt="Family" />
                                    <p style={{textAlign: 'justify'}}>{aboutData.family}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card d-flex flex-column h-100 bg-dark text-white">
                                <div className="card-body text-center">
                                    <h3>Deporte</h3>
                                    <img src={aboutData.sport_picture} className="img-fluid rounded mx-auto" alt="Sport" />
                                    <p style={{textAlign: 'justify'}} >{aboutData.sport}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card d-flex flex-column h-100 bg-dark text-white">
                                <div className="card-body text-center">
                                    <h3>Hobbies</h3>
                                    <img src={aboutData.hobbie_picture} className="img-fluid rounded mx-auto" alt="Hobbie" />
                                    <p style={{textAlign: 'justify'}}>{aboutData.hobbie}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
