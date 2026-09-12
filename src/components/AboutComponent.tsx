import React from 'react';
import { AboutDataProps } from '../interfaces/about.interface';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const AboutComponent: React.FC<AboutDataProps> = (props: AboutDataProps) => {
    const { card, picture, text } = props;

    // Helper for category icon
    const getCardIcon = () => {
        const titleLower = card.toLowerCase();
        if (titleLower.includes('quién') || titleLower.includes('who') || titleLower.includes('perfil')) {
            return <PersonIcon sx={{ fontSize: '1.25rem', color: '#38bdf8' }} />;
        }
        if (titleLower.includes('familia') || titleLower.includes('family')) {
            return <FavoriteIcon sx={{ fontSize: '1.25rem', color: '#f43f5e' }} />;
        }
        if (titleLower.includes('deporte') || titleLower.includes('sport')) {
            return <DirectionsBikeIcon sx={{ fontSize: '1.25rem', color: '#10b981' }} />;
        }
        return <SportsEsportsIcon sx={{ fontSize: '1.25rem', color: '#a855f7' }} />;
    };

    return (
        <div className="col-12 col-md-6 mb-4">
            <article className="about-card glass reveal">
                <div className="about-card-header">
                    <div className="about-card-icon-wrap">
                        {getCardIcon()}
                    </div>
                    <h3 className="about-card-title">{card}</h3>
                </div>

                <div className="about-card-image-wrap">
                    <img src={picture} className="about-card-img" alt={card} loading="lazy" />
                </div>

                <div className="about-card-body">
                    <p className="about-card-text">{text}</p>
                </div>
            </article>
        </div>
    );
};

export default AboutComponent;

