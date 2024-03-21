import { Chrono } from 'react-chrono';
import { ChronoData } from '../interfaces/chrono.interface';
import { themeDark } from '../utils/themes'

const ChronoDark: React.FC<ChronoData>= (props:ChronoData) => {

    const { title, content, mode } = props;

    return (
        <div>
            <h2>{title}</h2>

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
                cardHeight={90}
                theme={themeDark}
                fontSizes={{
                    cardSubtitle: '1rem',
                    cardText: '1rem',
                    cardTitle: '1.2rem',
                    title: '0.8rem',
                }}
            >
                <div className="chrono-icons">
                    {content.map((item, index) => (
                        <img key={index} src={item.icon} alt={`Icon ${index}`} />
                    ))}
                </div>
            </Chrono>
        </div>
    )
}

export default ChronoDark;