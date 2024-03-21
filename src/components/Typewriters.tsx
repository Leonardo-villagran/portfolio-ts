import Typewriter from 'typewriter-effect';

interface TypewriterProps {
    name: string;
    strings: string[];
}

const Typewriters: React.FC<TypewriterProps> = (props: TypewriterProps) => {
    const { name, strings } = props;
    return (
        <>
            <h1>{name}</h1>
            <Typewriter
                options={{
                    strings: strings,
                    autoStart: true,
                    loop: true,
                    delay: 30,
                    deleteSpeed: 20
                }}
            />
        </>
    )
}

export default Typewriters;
