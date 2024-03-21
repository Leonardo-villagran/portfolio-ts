import {Theme} from '../interfaces/theme.interface';

export const themeDark: Theme ={
    primary: '#3d84c6', // Color de fondo de la línea de tiempo y del contenido
    secondary: 'white', // Color del punto de tiempo y de los detalles de la tarjeta
    cardBgColor: '#1b1b1b', // Fondo de la tarjeta
    titleColor: '#808080', // Color del título de la tarjeta
    titleColorActive: '#007fff', // Color del subtítulo de la tarjeta
    cardForeColor: 'red',
    cardSubtitleColor: '#3d84c6',
    cardTitleColor: 'white',
    cardDetailsColor: '#808080', // Color del texto de la tarjeta

}

export const themeLight: Theme = {
    primary: 'black',
    secondary: '#3d84c6',
    cardBgColor: '#f0f0f0',
    titleColor: '#333333',
    titleColorActive: 'white',
    cardForeColor: 'black',
    cardSubtitleColor: '#3d84c6',
    cardTitleColor: '#333333',
    cardDetailsColor: '#303030',
};