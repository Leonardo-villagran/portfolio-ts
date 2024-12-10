import React from 'react'
import { AboutDataProps } from '../interfaces/about.interface';


const AboutComponent: React.FC<AboutDataProps> = (props: AboutDataProps) => {
    const { card, picture, text, color } = props;

    
    return (

        <div className="col-12 col-md-6 mb-4">
            <div className={`card d-flex flex-column h-100 ${color}`}>
                <div className="card-body text-center">
                    <h3>{card}</h3>
                    <img src={picture} className="img-fluid rounded mx-auto mb-4" alt="About" />
                    <p style={{ textAlign: 'justify' }}>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;