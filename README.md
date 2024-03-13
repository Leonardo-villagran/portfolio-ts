## React Portfolio Website

Este es un ejemplo básico de una aplicación de portafolio utilizando React y React Router para la navegación. La aplicación incluye una barra de navegación, secciones para la página de inicio, sobre mí, habilidades, educación, experiencias, proyectos y contacto. Se pueden personalizar los contenidos de cada sección editando los archivos JSON correspondientes en inglés y español. También se incluye un sistema de contacto que utiliza EmailJS para enviar emails a través de los servicios configurados con las credenciales proporcionadas.

Pueden ver el ejemplo en el siguiente enlace desde GitHub Pages: [https://leonardo-villagran.github.io/portfolio/](https://leonardo-villagran.github.io/portfolio/)

Pueden ver el ejemplo en el siguiente enlace desde Render.com: [https://portfolio-o6cp.onrender.com/](https://portfolio-o6cp.onrender.com/)


![alt text](public/images/cap_spanish.jpg)

## Índice

- [Instrucciones de Uso](#instrucciones-de-uso)
    - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
    - [2. Instalar Dependencias](#2-instalar-dependencias)
    - [3. Iniciar la Aplicación](#3-iniciar-la-aplicación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración de las Rutas](#configuración-de-las-rutas)
- [Dependencias Utilizadas](#dependencias-utilizadas)
    - [Dependencias](#dependencias)
    - [Dependencias de desarrollo (devDependencies)](#dependencias-de-desarrollo-devdependencies)

- [Personalización](#personalización)
- [Configuración del sistema de contacto](#configuración-del-sistema-de-contacto)
- [Cómo subir el portafolio a GitHub Pages](#cómo-subir-el-portafolio-a-github-pages)
- [Cómo subir a render.com](#cómo-subir-a-rendercom)


### Instrucciones de Uso

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local.

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/Leonardo-villagran/portfolio
cd portfolio
```

#### 2. Instalar Dependencias

```bash
npm install
```

#### 3. Iniciar la Aplicación

```bash
npm run dev
```

La aplicación se ejecutará en modo de desarrollo. Abre [http://localhost:3000/portfolio/](http://localhost:3000/portfolio/) en tu navegador para verla.

### Estructura del Proyecto

- **`src/views/`**: Contiene las vistas de cada sección (Home, About, Skills, Education, Experiences, Projects, Contact).
- **`src/components/`** Contiene los componentes con el código de programación de Home, About, Skills, Education, Experiences, Projects, Contact.
- Cada vista posee un componente con el mismo nombre. Si desean agregar más cosas a la vista pueden hacerlo sin tocar el componente. La idea es que las vistas solo sean un conjunto de componentes. 
- **`src/App.jsx`**: Archivo principal que configura las rutas y utiliza React Router.

### Configuración de las Rutas

El archivo `src/App.jsx` utiliza React Router para manejar las rutas de la aplicación. A continuación, se describen las rutas disponibles:

- `/portfolio/`: Página de inicio.
- `/portfolio/about`: Página "Sobre Mí".
- `/portfolio/skills`: Página de habilidades.
- `/portfolio/education`: Página de educación.
- `/portfolio/experiences`: Página de experiencias.
- `/portfolio/projects`: Página de proyectos.
- `/portfolio/contact`: Página de contacto.

Puedes personalizar estas rutas según tus necesidades y agregar más rutas según sea necesario.

Estas son las dependencias más importantes listadas en el archivo `package.json` y su propósito en el proyecto:

### Dependencias utilizadas:

#### Dependencias:

1. **@emailjs/browser**:
   - Esta es una biblioteca que permite enviar correos electrónicos directamente desde el navegador utilizando JavaScript.

2. **axios**:
   - Axios es un cliente HTTP basado en Promesas que se utiliza para realizar solicitudes HTTP, como solicitudes GET, POST, etc.

3. **bootstrap**:
   - Bootstrap es un marco de trabajo de diseño front-end popular que proporciona una estructura y componentes predefinidos para desarrollar rápidamente interfaces de usuario atractivas y receptivas.

4. **react**:
   - React es una biblioteca de JavaScript de código abierto utilizada para construir interfaces de usuario (UI) interactivas de una sola página.

5. **react-bootstrap**:
   - React Bootstrap es una versión de Bootstrap reescrita para React. Proporciona componentes de interfaz de usuario de Bootstrap como componentes React.

6. **react-chrono**:
   - React Chrono es una biblioteca para crear líneas de tiempo interactivas y visualmente atractivas en aplicaciones web de React.

7. **react-dom**:
   - React DOM es un paquete que proporciona métodos específicos para manipular el DOM de HTML en aplicaciones web de React.

8. **react-hook-form**:
   - React Hook Form es una biblioteca de React que se utiliza para gestionar formularios de manera eficiente y sencilla mediante el uso de ganchos (hooks).

9. **react-router-dom**:
   - React Router DOM es una biblioteca que proporciona navegación y enrutamiento declarativos para aplicaciones web de React.

10. **react-social-icons**:
    - React Social Icons es una biblioteca que proporciona iconos sociales predefinidos para su uso en aplicaciones web de React.

11. **serve**:
    - Serve es un servidor HTTP estático simple que se utiliza principalmente para servir archivos estáticos locales durante el desarrollo de aplicaciones web.

12. **typewriter-effect**:
    - Typewriter Effect es una biblioteca que permite simular el efecto de escritura de una máquina de escribir en aplicaciones web.

#### Dependencias de desarrollo (devDependencies):

1. **@types/react**:
   - Este paquete proporciona definiciones de tipo TypeScript para React.

2. **@types/react-dom**:
   - Este paquete proporciona definiciones de tipo TypeScript para React DOM.

3. **@vitejs/plugin-react-swc**:
   - Este es un complemento para Vite, un entorno de desarrollo rápido para JavaScript y TypeScript. Ayuda a cargar archivos React utilizando el SWC (Compilador de JavaScript de Estándares Web).

4. **eslint**:
   - ESLint es una herramienta de linting para JavaScript que ayuda a identificar y corregir problemas en el código.

5. **eslint-plugin-react**:
   - Este es un complemento de ESLint que proporciona reglas específicas para proyectos de React.

6. **eslint-plugin-react-hooks**:
   - Este es un complemento de ESLint que proporciona reglas específicas para los ganchos (hooks) de React.

7. **eslint-plugin-react-refresh**:
   - Este es un complemento de ESLint que proporciona soporte para la recarga de React.

8. **gh-pages**:
   - Gh-pages es una herramienta que facilita la implementación de aplicaciones web en GitHub Pages.

9. **vite**:
   - Vite es un entorno de desarrollo rápido para proyectos de JavaScript y TypeScript que se basa en ESM (Módulos de JavaScript Estándar).

### Personalización

Si deseas personalizar y adaptar este portafolio para tu propio uso, sigue estos pasos:

**Modificar Contenidos:**

   - Todos los contenidos de las secciones (Inicio, Sobre Mí, Habilidades, Educación, Experiencias, Proyectos, Contacto) están almacenados en archivos JSON dentro de la carpeta `public/json/`.

   - Lo primero es determinar en que idioma estará tu portafolio. El idioma se configura en el archivo llamado `public/json/app.json`. Si se coloca en español e inglés a la vez, aparecerá formulario de selección de idioma en la barra de navegación. Si solo hay un idioma, la web se desplegará en ese idioma y no se mostrará el selector. 


```json
{
    "portfolioLanguages": {
        "spanish": true,
        "english": true
    }
}
```      

   - Puedes editar estos archivos JSON (`home.json`, `about.json`, `skills.json`, etc.) para reflejar tus propios datos y detalles.

   -Los archivos en español tienen el nombre base, los archivos en inglés tienen el nombre base seguido de `_en`. Por ejemplo, `home.json` y `home_en.json`.

### Configuración del sistema de contacto

Para configurar el sistema de contacto, sigue estos pasos:

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/).

2. Obtén tu service ID, template ID y public user ID de EmailJS. Asegúrate de crear el template del email necesario.

3. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno con los datos obtenidos de EmailJS:

    ```dotenv
    VITE_SERVICE_ID=tu_service_ID
    VITE_TEMPLATE_ID=tu_template_ID
    VITE_USER_ID=tu_user_ID
    ```

   Asegúrate de reemplazar `'tu_service_ID'`, `'tu_template_ID'` y `'tu_user_ID'` con los valores específicos que obtuviste de EmailJS.

Con estos pasos, habrás configurado correctamente el sistema de contacto en tu aplicación. Este sistema utiliza EmailJS para enviar emails a través de los servicios configurados con las credenciales proporcionadas.

### Cómo subir el portafolio a GitHub Pages

Para llevar a cabo la publicación de tu portafolio en GitHub Pages, sigue estas indicaciones:

1. Clona o descarga el repositorio desde GitHub.

2. Asegúrate de que el nombre de tu repositorio sea "portfolio", de lo contrario, las rutas no funcionarán correctamente.

3. En el archivo `package.json`, sustituye mi nombre de usuario de GitHub por el tuyo en la sección `homepage`.

4. Para poder usar la sección de contacto a través de GitHub Pages, debes ingresar las variables de entorno al repositorio (`'tu_service_ID'`, `'tu_template_ID'` y `'tu_user_ID'`) a la sección `Settings>Environments>github-pages>` y en la sección `Environment secrets` ingresar cada variable con el contenido asociado a través del botón `Add secret`. 

4. Una vez que hayas realizado todas las modificaciones necesarias, sube los cambios a GitHub y realiza la implementación con el siguiente comando:

```bash
npm run deploy
```

Siguiendo estos pasos, podrás desplegar tu portafolio en GitHub Pages de manera efectiva.

### Cómo subir a render.com

1. Ingresar a render.com.

2. Conectarse a Render a través de GitHub.

![Render](public/images/render.jpg)

3. Accede al Dashboard y haz clic en el botón llamado `New +`, luego selecciona "Web service".

![Render new](public/images/render_new.jpg)

4. Debes dar permisos y seleccionar el proyecto desde GitHub. 

![Repo](public/images/repo.jpg)

5. Una vez seleccionado el proyecto /portfolio, configura el proyecto; primero escribe un nombre y luego selecciona el runtime como Node o Docker. En este caso, lo realizaré con Node. 

![Node](public/images/node.jpg)

6. Para instalar y construir, puedes dejar la configuración por defecto. Para iniciar el servicio, utiliza `npm run serve` u otro comando que consideres mejor.

![Serve](public/images/serve.jpg)

7. Seleccionar la instancia Free (si no quieres pagar). Luego bajen y verán una sección llamada `Environment Variables` (si no se ve presionen el botón `advanced` y la encontrarás allí). Puedes ingresar las variables de entorno una a una o copiarlas todas dentro de la sección llamada `Add from .env`

![env](public/images/env4.jpg)

8. Luego presionan el botón llamado `Create Web Service` y espera a que se ejecute el deploy. Si hay errores, debes corregir el problema y volver a ejecutar el deploy. En caso de que se realicen cambios en el repositorio de GitHub, se realizará el deploy nuevamente de forma automática.

![DashBoard](public/images/dash.jpg)

9. Para poder acceder a la web, haz clic sobre el nombre del proyecto en el Dashboard y presiona sobre la dirección que aparece debajo del repositorio de GitHub.

![link](public/images/link.jpg)

Con estos pasos, ya podrás acceder a tu portafolio desde Render.

![alt text](public/images/cap_english.jpg)