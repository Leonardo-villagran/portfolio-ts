import { SocialIcon } from 'react-social-icons';

interface SocialIconsProps {
    link: string;
}

const SocialIcons: React.FC<SocialIconsProps> = (props: SocialIconsProps) => {

    const { link } = props;

    return (
        <>
            <SocialIcon
                target="_blank" rel="noopener noreferrer"
                url={link}
                style={{
                    height: 50,
                    width: 50,
                }}
            />
        </>
    )
}

export default SocialIcons;


