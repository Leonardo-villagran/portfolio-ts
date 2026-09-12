import Typewriter from 'typewriter-effect';

interface TypewriterProps {
    name: string;
    strings: string[];
}

const Typewriters: React.FC<TypewriterProps> = (props: TypewriterProps) => {
    const { name, strings } = props;
    const parts = name.split(' ');
    const firstName = parts.slice(0, -1).join(' ');
    const lastName = parts.slice(-1).join(' ');

    return (
        <div className="hero-typewriter">
            <h1 className="hero-name">
                {firstName}{' '}
                <span className="gradient-text">{lastName}</span>
            </h1>
            <div className="hero-roles">
                <Typewriter
                    options={{
                        strings: strings,
                        autoStart: true,
                        loop: true,
                        delay: 35,
                        deleteSpeed: 22,
                    }}
                />
            </div>
        </div>
    );
};

export default Typewriters;

