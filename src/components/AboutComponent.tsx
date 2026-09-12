import React from 'react';
import { AboutDataProps } from '../interfaces/about.interface';

const AboutComponent: React.FC<AboutDataProps> = (props: AboutDataProps) => {
    const { card, picture, text } = props;

    return (
        <div className="col-12 col-md-6 mb-4">
            <article className="about-card glass">
                <h3>{card}</h3>
                <img src={picture} className="img-fluid rounded mx-auto mb-4" alt={card} loading="lazy" />
                <p style={{ textAlign: 'justify' }}>{text}</p>
            </article>
        </div>
    );
};

export default AboutComponent;
