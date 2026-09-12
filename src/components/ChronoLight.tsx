import { Chrono } from 'react-chrono';
import { ChronoData } from '../interfaces/chrono.interface';
import { themeLight } from '../utils/themes';

const ChronoLight: React.FC<ChronoData> = (props: ChronoData) => {
    const { title, content, mode } = props;

    return (
        <div>
            <h2 className="section-title text-center">{title}</h2>
            <Chrono
                items={content}
                mode={mode}
                uniqueId="title"
                disableToolbar
                allowDynamicUpdate
                focusActiveItemOnLoad
                slideShow
                enableDarkToggle
                useReadMore={false}
                cardHeight={110}
                theme={themeLight}
                fontSizes={{
                    cardSubtitle: '1rem',
                    cardText: '0.95rem',
                    cardTitle: '1.2rem',
                    title: '0.85rem',
                }}
            >
                <div className="chrono-icons">
                    {content.map((item, index) => (
                        <img key={index} src={item.icon} alt={`Icon ${index}`} />
                    ))}
                </div>
            </Chrono>
        </div>
    );
};

export default ChronoLight;
