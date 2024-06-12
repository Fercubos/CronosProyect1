--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pasos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pasos (
    paso_id integer NOT NULL,
    tarea_id integer NOT NULL,
    descripcion character varying(1024),
    steps_inside_resume text
);


ALTER TABLE public.pasos OWNER TO postgres;

--
-- Name: pasos_paso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pasos_paso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pasos_paso_id_seq OWNER TO postgres;

--
-- Name: pasos_paso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pasos_paso_id_seq OWNED BY public.pasos.paso_id;


--
-- Name: proyectos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proyectos (
    proyecto_id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    user_id bigint NOT NULL,
    proyect_notion_url character varying(255)
);


ALTER TABLE public.proyectos OWNER TO postgres;

--
-- Name: proyectos_proyecto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proyectos_proyecto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_proyecto_id_seq OWNER TO postgres;

--
-- Name: proyectos_proyecto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proyectos_proyecto_id_seq OWNED BY public.proyectos.proyecto_id;


--
-- Name: tareas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tareas (
    tarea_id integer NOT NULL,
    proyecto_id integer NOT NULL,
    numero_de_tareas integer,
    fecha_de_los_pasos date,
    completitud boolean
);


ALTER TABLE public.tareas OWNER TO postgres;

--
-- Name: tareas_tarea_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tareas_tarea_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tareas_tarea_id_seq OWNER TO postgres;

--
-- Name: tareas_tarea_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tareas_tarea_id_seq OWNED BY public.tareas.tarea_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: pasos paso_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pasos ALTER COLUMN paso_id SET DEFAULT nextval('public.pasos_paso_id_seq'::regclass);


--
-- Name: proyectos proyecto_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos ALTER COLUMN proyecto_id SET DEFAULT nextval('public.proyectos_proyecto_id_seq'::regclass);


--
-- Name: tareas tarea_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas ALTER COLUMN tarea_id SET DEFAULT nextval('public.tareas_tarea_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: pasos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pasos (paso_id, tarea_id, descripcion, steps_inside_resume) FROM stdin;
12	12	Sumar 2 + 2	1. Abrir una calculadora o aplicación de sumas.\n2. Ingresar el número 2.\n3. Presionar el símbolo de suma (+).\n4. Ingresar nuevamente el número 2.\n5. Presionar el botón de igual (=).\n6. Verificar que el resultado sea 4.
13	13	Instalación del entorno de desarrollo	1. Descargar e instalar un compilador de C++ en el equipo.\n2. Configurar el compilador para que pueda compilar programas en C++.\n3. Crear y guardar un archivo de prueba con extensión ".cpp".\n4. Escribir un programa sencillo en C++ que muestre por pantalla un mensaje básico, como "¡Hola, mundo!".\n5. Compilar el programa utilizando el compilador instalado.\n6. Ejecutar el programa compilado y verificar que la salida sea la esperada.\n7. Familiarizarse con el proceso de compilación y ejecución de programas en C++.\n8. Explorar la estructura básica de un programa en C++ (incluyendo librerías, funciones principales, etc.).\n9. Realizar pruebas adicionales con diferentes mensajes de salida.\n10. Documentar el proceso seguido y los resultados obtenidos para futuras referencias.
14	14	Configuración del IDE	1. Abrir el IDE de desarrollo para C++.\n2. Crear un nuevo proyecto C++ en el IDE.\n3. Configurar las preferencias del proyecto según las necesidades.\n4. Establecer las opciones de compilación y ejecución.\n5. Configurar el manejo de archivos y directorios del proyecto.\n6. Definir los ajustes de depuración y seguimiento de errores.\n7. Establecer el formato de código y las reglas de estilo a seguir.\n8. Configurar los atajos de teclado y las herramientas adicionales a utilizar.\n9. Guardar la configuración del proyecto para futuras sesiones.\n10. Explorar las funcionalidades avanzadas del IDE para optimizar el flujo de trabajo.
15	15	Estructurar programa principal	1. Definir las funciones básicas que compondrán el programa principal en C++.\n2. Identificar las variables necesarias para el funcionamiento del programa.\n3. Declarar las librerías y cabeceras requeridas para el programa.\n4. Establecer la estructura general del programa y su flujo de ejecución.\n5. Crear un esquema de organización del código para facilitar su lectura y mantenimiento.\n6. Diseñar la interacción entre las diferentes funciones del programa.\n7. Implementar la lógica principal del programa de manera modular.\n8. Verificar que la estructura del programa cumple con los estándares de buenas prácticas.\n9. Realizar pruebas de integración de las funciones en el programa principal.\n10. Documentar el diseño y la estructura del programa para futuras referencias.
16	16	Implementar funciones auxiliares	1. Identificar las funciones secundarias necesarias para complementar el programa principal.\n2. Definir los parámetros de entrada y salida de cada función auxiliar.\n3. Crear la estructura básica de las funciones auxiliares en C++.\n4. Establecer la lógica de cada función para cumplir con su propósito específico.\n5. Verificar la coherencia y consistencia de las funciones con el programa principal.\n6. Testear cada función de forma individual para garantizar su correcto funcionamiento.\n7. Integrar las funciones auxiliares en el programa principal.\n8. Realizar pruebas de integración para asegurar la interacción adecuada entre las funciones.\n9. Depurar y corregir posibles errores identificados durante las pruebas.\n10. Documentar el uso y la funcionalidad de cada función auxiliar para futuras referencias.
70	70	Pruebas de Usuario	1. Seleccionar un grupo de usuarios representativos de la empresa que probarán el sistema de gestión de inventarios.\n2. Preparar un plan de pruebas de usuario detallado que incluya escenarios reales de uso y casos de prueba.\n3. Facilitar a los usuarios el acceso al sistema y brindarles la capacitación necesaria para realizar las pruebas de manera efectiva.\n4. Recolectar feedback y reportes de los usuarios sobre su experiencia con el sistema y sus sugerencias de mejora.
71	71	Capacitación de Usuarios	1. Diseñar y preparar material de capacitación para los usuarios del sistema de gestión de inventarios.\n2. Programar sesiones de entrenamiento presenciales o virtuales para enseñar a los usuarios cómo utilizar el sistema de manera efectiva.\n3. Personalizar la capacitación según las necesidades y roles de cada usuario dentro de la empresa.\n4. Realizar seguimiento y ofrecer soporte adicional a los usuarios para resolver dudas o dificultades durante el proceso de aprendizaje.
72	72	Implementación del Sistema	1. Planificar el proceso de implementación del sistema de gestión de inventarios, definiendo roles y responsabilidades.\n2. Instalar y configurar el software en los equipos requeridos según las especificaciones del sistema.\n3. Migrar los datos existentes al nuevo sistema de gestión de inventarios de manera segura y precisa.\n4. Realizar pruebas finales para verificar que el sistema esté listo para su puesta en marcha.
73	73	Evaluación de Resultados	1. Recolectar datos y métricas sobre el funcionamiento del sistema de gestión de inventarios.\n2. Analizar los resultados obtenidos en comparación con los objetivos y requerimientos iniciales del proyecto.\n3. Identificar áreas de mejora y oportunidades de optimización en el sistema.\n4. Elaborar un informe de evaluación con recomendaciones para futuras actualizaciones o ajustes necesarios.
74	74	Informe Final	1. Compilar los resultados, hallazgos y recomendaciones derivados de la evaluación del sistema de gestión de inventarios.\n2. Elaborar un documento detallado que incluya el análisis de los datos recopilados, las mejoras implementadas y los beneficios obtenidos.\n3. Presentar el informe final a los stakeholders del proyecto, destacando los logros alcanzados y las oportunidades de crecimiento identificadas.\n4. Archivar el informe final como referencia para futuras revisiones o actualizaciones del sistema.
76	76	Análisis	1. Recolectar datos sobre las tendencias actuales en aplicaciones de control de gastos.\n2. Identificar las necesidades y preferencias de los usuarios en cuanto a funcionalidades de una aplicación de control de gastos.\n3. Analizar la viabilidad de implementar las funcionalidades identificadas en la aplicación.\n4. Evaluar posibles obstáculos o desafíos que puedan surgir al incluir dichas funcionalidades.\n5. Definir los criterios de selección para determinar qué funcionalidades serán incluidas en la aplicación.
77	77	Requerimientos	1. Recopilar los requisitos funcionales y no funcionales de la aplicación de control de gastos.\n2. Priorizar los requisitos en función de su importancia y viabilidad.\n3. Validar los requisitos con los usuarios y posibles interesados en la aplicación.\n4. Documentar de forma clara y detallada los requerimientos para su posterior implementación.\n5. Establecer un proceso de revisión y aprobación de los requisitos por parte del equipo de desarrollo.
78	78	Diseño	1. Crear un prototipo visual de la interfaz de la aplicación de control de gastos.\n2. Diseñar la estructura de navegación y la disposición de los elementos dentro de la aplicación.\n3. Definir el esquema de colores, tipografías y estilos visuales que se utilizarán en la aplicación.\n4. Incorporar los requisitos funcionales y de experiencia de usuario en el diseño de la aplicación.\n5. Obtener retroalimentación de usuarios o expertos en diseño para mejorar el prototipo inicial.
17	17	Optimizar el rendimiento del programa	1. Analizar las partes del programa que podrían ser optimizadas.\n2. Identificar posibles cuellos de botella en el rendimiento del programa.\n3. Revisar el uso de recursos como memoria y procesamiento.\n4. Implementar algoritmos más eficientes en las secciones críticas del código.\n5. Utilizar estructuras de datos más adecuadas para mejorar el rendimiento.\n6. Reducir la complejidad de los algoritmos cuando sea posible.\n7. Realizar pruebas de rendimiento para evaluar el impacto de las optimizaciones.\n8. Medir métricas como el tiempo de ejecución y el uso de memoria antes y después de las mejoras.\n9. Ajustar las optimizaciones según los resultados de las pruebas.\n10. Documentar las técnicas de optimización aplicadas y sus efectos en el programa.
18	18	Manejo de punteros	1. Estudiar la teoría detrás del uso de punteros en C++.\n2. Practicar la declaración y asignación de punteros en diferentes contextos.\n3. Entender la aritmética de punteros y su relación con los tipos de datos.\n4. Familiarizarse con el concepto de punteros nulos y su manipulación.\n5. Practicar el paso de punteros como argumentos a funciones.\n6. Implementar estructuras de datos básicas utilizando punteros.\n7. Realizar ejercicios de referencia y desreferencia de punteros.\n8. Utilizar punteros para la gestión dinámica de memoria.\n9. Resolver problemas de programación que requieran el uso avanzado de punteros.\n10. Practicar la depuración de errores comunes relacionados con punteros.
19	19	Gestión dinámica de memoria	1. Comprender el concepto de gestión dinámica de memoria en C++.\n2. Estudiar el uso de operadores new y delete para asignar y liberar memoria.\n3. Practicar la creación de objetos y arrays dinámicos.\n4. Evitar fugas de memoria mediante la liberación adecuada de los recursos asignados.\n5. Familiarizarse con el uso de punteros inteligentes como std::unique_ptr y std::shared_ptr.\n6. Implementar estructuras de datos dinámicas como listas enlazadas o árboles binarios.\n7. Realizar pruebas para validar la correcta asignación y liberación de memoria.\n8. Optimizar el uso de la memoria dinámica para evitar fragmentación.\n9. Manejar excepciones relacionadas con la gestión dinámica de memoria.\n10. Documentar las decisiones de diseño y las prácticas recomendadas para la gestión de memoria en el proyecto.
20	20	Tratamiento de excepciones	1. Estudiar el manejo de excepciones en C++ y su sintaxis.\n2. Identificar las situaciones que pueden generar excepciones en un programa.\n3. Implementar bloques try-catch para capturar y manejar excepciones.\n4. Definir clases de excepción personalizadas cuando sea necesario.\n5. Utilizar las cláusulas throw para lanzar excepciones explícitamente.\n6. Practicar el uso de bloques try-catch-finally para limpiar recursos.\n7. Asegurarse de capturar todas las excepciones posibles en el código.\n8. Manejar excepciones de bibliotecas externas de manera adecuada.\n9. Realizar pruebas de los bloques de manejo de excepciones para verificar su funcionamiento.\n10. Documentar las excepciones manejadas y las estrategias utilizadas en el proyecto.
21	21	Optimización de código	1. Revisar el código existente en busca de áreas que puedan ser optimizadas.\n2. Identificar redundancias o ineficiencias en el código.\n3. Simplificar estructuras y algoritmos para mejorar la legibilidad y eficiencia.\n4. Eliminar llamadas innecesarias o cálculos repetitivos.\n5. Utilizar operadores y funciones estándar de STL para simplificar el código.\n6. Mejorar la coherencia y consistencia del código mediante refactorización.\n7. Aplicar técnicas de programación eficiente para reducir el tiempo de ejecución.\n8. Realizar pruebas de rendimiento antes y después de las optimizaciones.\n9. Verificar que las optimizaciones no afecten la funcionalidad del programa.\n10. Documentar los cambios realizados y sus efectos en el rendimiento del proyecto.
22	22	Depuración de errores	1. Utilizar herramientas de depuración del IDE para identificar errores en el código.\n2. Establecer puntos de interrupción en áreas críticas del programa.\n3. Ejecutar el programa en modo depuración y seguir su flujo de ejecución.\n4. Analizar los valores de las variables en tiempo de ejecución para detectar posibles anomalías.\n5. Utilizar las funciones de paso a paso para entender el comportamiento del programa.\n6. Inspeccionar los mensajes de error y advertencias para corregir fallos.\n7. Reproducir los errores manualmente para entender su causa raíz.\n8. Corregir los errores encontrados y verificar su solución mediante pruebas.\n9. Realizar pruebas exhaustivas para garantizar que los errores han sido resueltos.\n10. Documentar los errores encontrados, las soluciones aplicadas y las lecciones aprendidas durante el proceso de depuración.
23	23	1. Instalación del entorno de desarrollo	1. **Descargar un compilador de C++**: Busca en línea opciones como Visual Studio, Code::Blocks, Dev-C++, o cualquier compilador de C++ de tu elección y descárgalo en tu computadora.\n2. **Instalar el compilador**: Sigue las instrucciones de instalación proporcionadas por el compilador que hayas descargado para instalarlo correctamente en tu sistema.\n3. **Configurar el compilador**: Asegúrate de configurar el compilador según tus preferencias y requisitos de trabajo.\n4. **Crear un nuevo proyecto**: Abre el compilador y crea un nuevo proyecto de C++ para comenzar a escribir y compilar tu código.\n5. **Escribir un programa simple**: Como ejercicio inicial, escribe un programa simple en C++ que imprima "Hello, World!" en la pantalla.\n6. **Compilar y ejecutar el programa**: Utiliza las herramientas del compilador para compilar y ejecutar el programa que has escrito.\n7. **Verificar la salida**: Confirma que el programa funciona correctamente y que muestra el mensaje "Hello, World!" en la pantalla.\n8. **Explorar las funciones básicas de C++**: Investiga y juega con algunas funciones básicas de C++ como variables, operadores, estructuras de control, etc., para comenzar a familiarizarte con el lenguaje.\n9. **Practicar con ejercicios simples**: Realiza algunos ejercicios simples para aplicar los conceptos que has aprendido hasta ahora.\n10. **Reflexionar y revisar**: Al finalizar la tarea, reflexiona sobre lo aprendido, identifica posibles áreas de mejora y prepara un plan para continuar aprendiendo C++ en las siguientes tareas.
24	24	2. Investigar compiladores de C++	1. **Investigar compiladores de C++:**  \n   - Investiga en línea sobre los compiladores más populares de C++ como Visual Studio, Code::Blocks, Dev-C++, entre otros.\n   - Lee reseñas, características, y recomendaciones de usuarios sobre cada compilador.\n   - Evalúa las ventajas y desventajas de cada opción para determinar cuál se ajusta mejor a tus necesidades y preferencias.\n   - Descarga e instala el compilador seleccionado en tu computadora según las instrucciones proporcionadas.\n   - Prepara el entorno de desarrollo para empezar a programar en C++.
25	25	3. Establecer un plan de estudio	3. **Establecer un plan de estudio:**\n   - Dedica un tiempo a organizar tu tiempo y establecer un horario de estudio para las próximas dos semanas.\n   - Define los temas de C++ que deseas cubrir y asigna un tiempo específico para cada uno.\n   - Considera tus horarios y compromisos diarios para integrar eficazmente el aprendizaje de C++ en tu rutina.\n   - Crea un plan detallado que incluya sesiones de estudio, práctica de ejercicios y momentos de revisión para consolidar lo aprendido.
26	26	4. Estudiar conceptos básicos de C++	4. **Estudiar conceptos básicos de C++:**\n   - Comienza por entender los fundamentos de C++, como variables, tipos de datos, operadores y estructuras de control.\n   - Investiga sobre la sintaxis de C++ y cómo se escriben las instrucciones en este lenguaje.\n   - Practica la declaración de variables, la asignación de valores y la realización de operaciones básicas.\n   - Experimenta con estructuras de control como bucles (for, while) y condicionales (if, else).\n   - Familiarízate con la entrada y salida de datos en C++ utilizando cin y cout.
27	27	5. Practicar con estructuras de datos	5. **Practicar con estructuras de datos:**\n   - Dedica tiempo a practicar la creación y manipulación de arrays (arreglos) en C++.\n   - Experimenta con la declaración de matrices de diferentes tipos de datos y tamaños.\n   - Realiza ejercicios para comprender cómo acceder a elementos específicos dentro de un array.\n   - Practica la inicialización de arrays y la utilización de bucles para recorrer sus elementos.\n   - Explora cómo trabajar con estructuras de datos más complejas como vectores y matrices.
28	28	6. Resolver problemas con punteros	6. **Resolver problemas con punteros:**\n   - Estudia el concepto de punteros en C++ y cómo se utilizan para almacenar direcciones de memoria.\n   - Practica la declaración de punteros y la asignación de valores a través de ellos.\n   - Experimenta con el uso de punteros para acceder y modificar datos en diferentes contextos.\n   - Resuelve ejercicios que impliquen el uso de punteros para trabajar con variables, arreglos y funciones.\n   - Comprende la importancia de la gestión adecuada de la memoria al utilizar punteros en tus programas.
29	29	7. Trabajar con estructuras y clases	7. **Trabajar con estructuras y clases:**\n   - Estudia la definición y uso de estructuras en C++ para agrupar datos relacionados en una sola entidad.\n   - Aprende a declarar y utilizar clases, que permiten definir objetos con atributos y métodos en C++.\n   - Practica la creación de diferentes objetos a partir de clases y la manipulación de sus atributos.\n   - Entiende los conceptos de encapsulamiento, herencia y polimorfismo en la programación orientada a objetos.\n   - Realiza ejercicios para implementar estructuras y clases en tus programas y comprender su funcionamiento.
30	30	8. Implementar herencia en C++	8. **Implementar herencia en C++:**\n   - Estudia el concepto de herencia en programación orientada a objetos y cómo se aplica en C++.\n   - Crea una jerarquía de clases donde una clase herede propiedades y métodos de otra.\n   - Prueba la creación de clases base y clases derivadas para comprender la relación de herencia.\n   - Explora cómo se manejan los constructores, destructores y métodos virtuales en una jerarquía de clases.\n   - Realiza ejercicios prácticos que te permitan implementar y trabajar con la herencia en tus programas en C++.
31	31	9. Aplicar polimorfismo	9. **Aplicar polimorfismo:**\n   - Comprende el concepto de polimorfismo y cómo se implementa en C++ para permitir que un objeto tome muchas formas.\n   - Practica la creación de funciones virtuales y clases abstractas para trabajar con polimorfismo.\n   - Utiliza herencia y funciones virtuales para sobrescribir métodos en clases derivadas y lograr comportamientos polimórficos.\n   - Crea un programa que demuestre el uso de polimorfismo para cambiar el comportamiento de objetos en tiempo de ejecución.\n   - Realiza ejercicios que te ayuden a consolidar tus conocimientos sobre polimorfismo en C++.
32	32	10. Proyecto final	10. **Proyecto final:**\n   - Diseña y desarrolla un proyecto final en C++ que integre los conceptos aprendidos durante las dos semanas de estudio.\n   - Define los requerimientos del proyecto y planifica su estructura y funcionalidades.\n   - Implementa el proyecto utilizando todos los elementos aprendidos, como variables, estructuras de control, punteros, clases, herencia y polimorfismo.\n   - Realiza pruebas exhaustivas para garantizar que el proyecto funciona conforme a lo esperado.\n   - Prepara una presentación o documentación que explique el funcionamiento y la lógica detrás de tu proyecto final en C++.
33	33	Sumar primer número (23)	1. Identificar el primer número a sumar: 23.\n2. Colocar el primer número en la posición correspondiente.\n3. Iniciar el proceso de sumar el primer número con el segundo número.\n4. Confirmar que el primer número se ha sumado correctamente.
34	34	Sumar segundo número (23)	Lo siento, pero no puedo responder a esa solicitud. ¿Hay algo más en lo que pueda ayudarte?
35	35	Introducción a HTML	1. Estudiar la estructura básica de un documento HTML.\n2. Aprender sobre etiquetas HTML como <html>, <head>, <title>, <body>, etc.\n3. Practicar la creación de un documento HTML simple con un título y un párrafo.\n4. Investigar sobre la importancia y el uso de atributos en las etiquetas HTML.\n5. Experimentar con la aplicación de estilos básicos usando etiquetas como <p>, <h1>, <strong>, <em>, entre otras.\n6. Realizar ejercicios de práctica para reforzar el conocimiento adquirido en la introducción a HTML.\n7. Revisar y corregir posibles errores en el código HTML creado durante la práctica.
36	36	Etiquetas HTML	1. Identificar las etiquetas HTML básicas como <p>, <h1>, <a>, <img>, <div>, entre otras.\n2. Aprender la sintaxis y el uso correcto de las etiquetas en la estructura de un documento HTML.\n3. Investigar sobre la función y la forma de aplicar atributos a diferentes etiquetas HTML.\n4. Practicar la inclusión de imágenes, enlaces y divisiones en un documento HTML utilizando las etiquetas correspondientes.\n5. Experimentar con la combinación de etiquetas para crear contenido semántico y bien estructurado.\n6. Realizar ejercicios de práctica que impliquen el uso de varias etiquetas HTML en conjunto.\n7. Revisar la jerarquía y la relevancia de las etiquetas en la maquetación de un sitio web.
37	37	Creación de un documento HTML simple	1. Abrir un editor de texto para comenzar a escribir el código HTML.\n2. Definir la estructura básica de un documento HTML utilizando las etiquetas <html>, <head> y <body>.\n3. Incluir un elemento <title> dentro de la sección <head> para proporcionar un título al documento.\n4. Agregar contenido al cuerpo del documento utilizando etiquetas como <h1>, <p> y otras relevantes.\n5. Guardar el archivo con extensión .html en una ubicación accesible en el ordenador.\n6. Verificar la correcta visualización del documento HTML en un navegador web.\n7. Realizar ajustes y correcciones si es necesario para lograr un documento HTML simple y funcional.
38	38	Uso de atributos en etiquetas HTML	1. Identificar las etiquetas HTML que requieren atributos para funcionar correctamente.\n2. Aprender la sintaxis para agregar atributos a las etiquetas HTML.\n3. Investigar sobre los atributos comunes como src, href, alt, style, entre otros.\n4. Practicar la aplicación de atributos en elementos como imágenes, enlaces y otros elementos interactivos.\n5. Experimentar con diferentes valores de atributos para modificar el comportamiento o apariencia de los elementos HTML.\n6. Realizar ejercicios prácticos que impliquen el uso adecuado de atributos en etiquetas HTML.\n7. Revisar la validez del código HTML generado al incluir y utilizar atributos en las etiquetas correspondientes.
39	39	Estilos básicos en HTML	1. Aprender sobre la aplicación de estilos en HTML utilizando atributos como style.\n2. Investigar sobre propiedades de estilo básicas como color, font-size, text-align, entre otras.\n3. Practicar la aplicación de estilos al texto y elementos de un documento HTML.\n4. Experimentar con la combinación de estilos para mejorar la apariencia visual de la página.\n5. Crear ejemplos prácticos que involucren la implementación de estilos en diferentes elementos HTML.\n6. Revisar la coherencia y la legibilidad del código al aplicar estilos básicos.\n7. Realizar ajustes según sea necesario para mejorar la presentación visual del contenido HTML.
40	40	Práctica de creación de código HTML	1. Plantear el diseño de una página web sencilla que incluya varios elementos HTML.\n2. Crear un archivo HTML nuevo en blanco para comenzar la práctica de codificación.\n3. Incorporar las etiquetas y atributos necesarios para estructurar el contenido según el diseño propuesto.\n4. Incluir textos, imágenes, enlaces y otros elementos solicitados en la práctica.\n5. Aplicar estilos básicos a través de atributos HTML para mejorar la presentación visual.\n6. Verificar la corrección y coherencia del código generado durante la práctica.\n7. Realizar ajustes finales de ser necesario para lograr el resultado deseado.
41	41	Revisión final del código HTML	1. Revisar la estructura y formato del código HTML creado durante las prácticas anteriores.\n2. Verificar la correcta utilización de etiquetas, atributos y estilos en el documento.\n3. Buscar posibles errores de sintaxis o de lógica que puedan afectar el funcionamiento de la página web.\n4. Comprobar la coherencia en la presentación visual y en la disposición de los elementos en la página.\n5. Validar el cumplimiento de los requisitos y objetivos establecidos para la práctica de creación de código HTML.\n6. Realizar pruebas de visualización en distintos navegadores para asegurar la compatibilidad.\n7. Realizar ajustes finales y correcciones según sea necesario para garantizar un resultado óptimo.
42	42	Sumar primer número (23)	1. Reunir los dos números a sumar: 23 + 23.\n2. Colocar el primer número (23) en la parte superior y el segundo número (23) debajo.\n3. Sumar verticalmente empezando por la unidad (3+3), llevando uno a la siguiente cifra si es necesario.\n4. Escribir el resultado final de la suma: 46.
43	43	Verificar resultado	1. Revisar la suma realizada en la tarea anterior.\n2. Verificar que el resultado sea 46.
44	44	Introducción a HTML.	1. Investigar qué es HTML y su importancia en el desarrollo web.\n2. Descargar un editor de texto para comenzar a escribir código HTML.\n3. Aprender la estructura básica de un documento HTML.\n4. Crear un documento HTML simple con etiquetas básicas como <html>, <head> y <body>.\n5. Guardar el archivo con extensión .html y abrirlo en un navegador para visualizarlo.\n6. Realizar pequeñas modificaciones en el código para familiarizarse con la sintaxis de HTML.\n7. Investigar sobre etiquetas más avanzadas como <a>, <img>, <div>, <p>, entre otras.\n8. Experimentar con la creación de enlaces, imágenes y párrafos en el documento HTML.\n9. Validar el código HTML creado utilizando herramientas en línea como el validador de W3C.\n10. Avanzar en la comprensión de las etiquetas y sus atributos para seguir construyendo páginas web más complejas.\n11. Investigar sobre buenas prácticas en la escritura de código HTML y mantener un estilo de codificación limpio.\n12. Resumir lo aprendido en una pequeña presentación o documento para reforzar el conocimiento adquirido.
45	45	Instalar editor de texto.	1. Investigar en línea sobre diferentes editores de texto recomendados para programación y desarrollo web.\n2. Descargar el editor de texto elegido desde su página oficial o a través de un gestor de paquetes si es necesario.\n3. Instalar el editor de texto siguiendo las instrucciones específicas para el sistema operativo en uso.\n4. Realizar configuraciones iniciales según preferencias personales, como temas de color, autocompletado, atajos de teclado, entre otros.\n5. Explorar las funcionalidades básicas del editor, como la creación de nuevos documentos, guardado de archivos y apertura de proyectos.\n6. Investigar y familiarizarse con características avanzadas del editor que pueden facilitar la escritura de código HTML, como resaltado de sintaxis, sugerencias de código y extensiones útiles.\n7. Establecer una rutina de trabajo para utilizar el editor de texto de manera eficiente durante el proyecto de aprendizaje de HTML.
46	46	Aprender estructura HTML.	1. Estudiar la etiqueta <html> y su función como elemento raíz de un documento HTML.\n2. Investigar sobre la etiqueta <head> y su uso para incluir metadatos, enlaces a archivos externos y scripts.\n3. Aprender acerca de la etiqueta <body> y su papel en la estructura de la página web para mostrar contenido visible.\n4. Entender la importancia de la estructura jerárquica en HTML y cómo anidar elementos de manera adecuada.\n5. Practicar la creación de documentos HTML básicos incluyendo las etiquetas aprendidas.\n6. Experimentar con la incorporación de títulos, metadescripciones, enlaces a CSS y JavaScript en la sección <head>.\n7. Crear páginas web simples utilizando la estructura HTML adecuada con <html>, <head> y <body>.\n8. Validar la estructura de los documentos HTML creados para asegurarse de que siguen las buenas prácticas.\n9. Realizar ejercicios de práctica para consolidar el conocimiento adquirido sobre la estructura de HTML.\n10. Reforzar la comprensión de la relación entre la estructura HTML y el diseño visual de las páginas web.
47	47	Etiquetas básicas HTML.	1. Investigar sobre las etiquetas básicas en HTML, como <h1> a <h6> para títulos, <p> para párrafos y <a> para enlaces.\n2. Comprender el uso de las etiquetas de formato como <strong>, <em>, <u> y <br> para resaltar y dar formato al texto.\n3. Practicar la utilización de listas ordenadas <ol> y no ordenadas <ul> junto con sus elementos de lista <li>.\n4. Aprender a insertar imágenes en una página web utilizando la etiqueta <img> y su atributo src para la URL de la imagen.\n5. Experimentar con la inclusión de enlaces utilizando la etiqueta <a> y su atributo href para definir la URL de destino.\n6. Crear una página web sencilla que incorpore diferentes etiquetas HTML básicas para practicar su uso.\n7. Verificar la validez del código HTML generado y corregir posibles errores de sintaxis.\n8. Analizar ejemplos de sitios web para identificar el uso de etiquetas básicas en contextos reales.\n9. Ampliar el conocimiento sobre otras etiquetas HTML esenciales y su aplicación en el desarrollo web.\n10. Realizar ejercicios de codificación para afianzar la comprensión y manejo de las etiquetas básicas en HTML.
75	75	Investigación	1. Investigar las diferentes aplicaciones existentes en el mercado para el control de gastos.\n2. Realizar un análisis comparativo de las funcionalidades, precios y valoraciones de las aplicaciones seleccionadas.\n3. Recopilar información sobre las necesidades y preferencias de los usuarios potenciales de la aplicación de control de gastos.\n4. Identificar las características clave que debe tener la aplicación para satisfacer las necesidades de los usuarios.\n5. Concluir con una recomendación de las mejores prácticas a seguir para el desarrollo de la aplicación.
48	48	Crear enlaces HTML.	1. Revisar la estructura básica de las etiquetas de enlace HTML, como <a> y su atributo href para definir la URL de destino.\n2. Entender la importancia de utilizar enlaces para la navegación dentro de un sitio web y hacia páginas externas.\n3. Practicar la creación de enlaces internos que dirijan a diferentes secciones dentro de una misma página.\n4. Experimentar con la apertura de enlaces en una nueva pestaña del navegador utilizando el atributo target="_blank".\n5. Aprender a enlazar imágenes mediante la etiqueta <a> alrededor de la etiqueta <img> para hacer clic en la imagen.\n6. Familiarizarse con la creación de enlaces de descarga para archivos, como PDFs o imágenes.\n7. Crear una página web que contenga diversos enlaces a páginas internas y externas para practicar la creación de hipervínculos.\n8. Verificar que los enlaces funcionen correctamente al hacer clic y redirijan al destino esperado.\n9. Optimizar los enlaces mediante el uso de texto descriptivo y atributos accesibles para mejorar la usabilidad.\n10. Realizar pruebas de navegación en la página web para confirmar que la funcionalidad de los enlaces es la adecuada.
49	49	Crear listas en HTML.	1. Investigar sobre las etiquetas HTML para la creación de listas ordenadas (<ol>) y no ordenadas (<ul>).\n2. Entender la estructura de las listas y su importancia para organizar y presentar el contenido de manera jerárquica.\n3. Practicar la creación de listas ordenadas numeradas utilizando la etiqueta <li> para cada elemento.\n4. Experimentar con la elaboración de listas no ordenadas utilizando viñetas o puntos como marcadores.\n5. Aprender a anidar listas dentro de otras listas para crear estructuras más complejas.\n6. Incluir listas dentro del contenido de una página web para organizar información de manera clara y concisa.\n7. Explorar la posibilidad de personalizar el estilo de las viñetas o numeración de las listas mediante CSS.\n8. Verificar la correcta visualización y funcionalidad de las listas en diferentes navegadores para garantizar la compatibilidad.\n9. Practicar la creación de listas con diferentes niveles de profundidad para representar información de forma escalonada.\n10. Realizar ejercicios prácticos que impliquen la utilización de listas en diferentes contextos y diseños de página web.
50	50	Insertar imágenes HTML.	1. Descargar imágenes que se deseen insertar en la página web y almacenarlas en una ubicación accesible.\n2. Utilizar la etiqueta <img> en el código HTML con el atributo src para indicar la ruta de la imagen.\n3. Incluir el atributo alt en la etiqueta <img> con texto descriptivo sobre la imagen para accesibilidad.\n4. Ajustar el tamaño de la imagen mediante los atributos width y height para mantener la proporción.\n5. Experimentar con la alineación de imágenes utilizando los atributos align o aplicando estilos CSS.\n6. Probar la visualización de las imágenes en diferentes dispositivos y tamaños de pantalla para verificar la adaptabilidad.\n7. Agregar enlaces a las imágenes utilizando la etiqueta <a> alrededor de la etiqueta <img> para hacer clic en la imagen.\n8. Optimizar el peso y formato de las imágenes para mejorar el tiempo de carga de la página web.\n9. Incluir imágenes de fondo en secciones específicas de la página utilizando CSS o propiedades de HTML.\n10. Verificar que las imágenes se muestren correctamente y contribuyan de manera efectiva al diseño y contenido de la página web.
51	51	Creación de formularios en HTML.	1. Investigar sobre la estructura y funcionamiento de los formularios en HTML.\n2. Utilizar la etiqueta <form> para crear el contenedor principal del formulario.\n3. Incluir diferentes elementos de entrada como campos de texto, áreas de texto, casillas de verificación y botones de envío.\n4. Configurar etiquetas de etiquetado (<label>) para asociarlas con los elementos de entrada y mejorar la accesibilidad.\n5. Establecer los atributos necesarios en los elementos de entrada, como id, name y type, para identificar y validar los datos.\n6. Agregar etiquetas de opciones (<option>) a menús desplegables (<select>) para selección de múltiples elecciones.\n7. Implementar validaciones sencillas en el formulario utilizando atributos como required para campos obligatorios.\n8. Diseñar el formulario considerando la disposición y la agrupación lógica de los elementos para una mejor experiencia del usuario.\n9. Probar el funcionamiento del formulario completando y enviando datos para verificar su comportamiento.\n10. Explorar opciones de estilizado y personalización de formularios con CSS para mejorar su apariencia visual.
52	52	Incluir videos en HTML.	1. Seleccionar el video que se desea incorporar en la página web y obtener su URL o archivo.\n2. Utilizar la etiqueta <video> en HTML para insertar el video en la página.\n3. Definir los atributos src para la fuente del video y controls para mostrar los controles de reproducción.\n4. Agregar atributos como width y height para ajustar el tamaño del reproductor de video en la página.\n5. Incluir opciones adicionales como autoplay para reproducir automáticamente el video al cargar la página.\n6. Utilizar atributos como loop para hacer que el video se repita continuamente.\n7. Establecer opciones de reproducción como muted para iniciar el video sin audio.\n8. Investigar sobre formatos de video compatibles con HTML5 para garantizar la reproducción en diferentes navegadores.\n9. Probar el video en diversos dispositivos y pantallas para confirmar su visualización correcta.\n10. Personalizar el reproductor de video con CSS para integrarlo visualmente con el diseño de la página web.
53	53	Agregar audio en HTML.	1. Seleccionar el archivo de audio que se desea agregar en la página web y obtener su URL o archivo.\n2. Utilizar la etiqueta <audio> en HTML para insertar el archivo de audio en la página.\n3. Definir el atributo src para la fuente del archivo de audio.\n4. Incluir controles de reproducción utilizando el atributo controls para permitir a los usuarios reproducir, pausar y ajustar el volumen.\n5. Agregar atributos como autoplay para reproducir automáticamente el audio al cargar la página.\n6. Utilizar atributos como loop para hacer que el audio se reproduzca continuamente.\n7. Establecer opciones de reproducción como muted para iniciar el audio sin sonido.\n8. Investigar sobre formatos de audio compatibles con HTML5 para garantizar la reproducción en diferentes navegadores.\n9. Probar el audio en diversos dispositivos y pantallas para confirmar su reproducción correcta.\n10. Personalizar el reproductor de audio con CSS para integrarlo visualmente con el diseño de la página web.
54	54	Agregar tablas en HTML.	1. Utilizar la etiqueta <table> en HTML para crear la estructura de la tabla.\n2. Definir filas en la tabla utilizando la etiqueta <tr> para cada fila.\n3. Dentro de cada fila, agregar celdas utilizando la etiqueta <td> para celdas de datos y <th> para encabezados de columna.\n4. Incluir el contenido deseado dentro de cada celda de la tabla.\n5. Utilizar atributos como colspan y rowspan para fusionar celdas cuando sea necesario.\n6. Establecer atributos de estilo en CSS para personalizar el diseño de la tabla, como colores de fondo, bordes y alineación.\n7. Incluir elementos adicionales como encabezados de tabla <thead>, cuerpo de tabla <tbody> y pie de tabla <tfoot> para una mejor organización.\n8. Agregar atributos de accesibilidad como scope en encabezados de columna para facilitar la lectura de tablas con lectores de pantalla.\n9. Validar la estructura de la tabla y asegurarse de que cumple con las prácticas recomendadas de diseño web.\n10. Probar la tabla en diferentes dispositivos y tamaños de pantalla para garantizar su visualización adecuada y responsiva.
55	55	Optimizar sitio web.	1. Analizar el código HTML existente en el sitio web para identificar áreas de mejora.\n2. Optimizar el uso de etiquetas semánticas en HTML para mejorar la accesibilidad y la indexación en motores de búsqueda.\n3. Minificar y comprimir archivos HTML, CSS y JavaScript para reducir los tiempos de carga de la página.\n4. Optimizar el tamaño y la resolución de imágenes para mejorar la velocidad de carga y la experiencia del usuario.\n5. Implementar técnicas de carga diferida o lazzy loading para retrasar la carga de recursos no críticos.\n6. Utilizar archivos externos para estilos CSS y scripts JavaScript para facilitar el almacenamiento en caché del navegador.\n7. Verificar la validez del código HTML mediante validadores en línea para corregir posibles errores de sintaxis.\n8. Implementar metaetiquetas y descripciones en HTML para mejorar el SEO y la visibilidad en los motores de búsqueda.\n9. Comprobar la compatibilidad del sitio web en diferentes navegadores y dispositivos para garantizar una experiencia consistente.\n10. Realizar pruebas de rendimiento utilizando herramientas como PageSpeed Insights para medir y mejorar la velocidad de carga del sitio.
56	56	Sumar 2 + 2	1. Tomar una hoja de papel y un lápiz.\n2. Escribir el número 2 en la hoja.\n3. Luego, escribir el signo de suma (+).\n4. A continuación, escribir el número 2.\n5. Sumar los dos números siguiendo las reglas básicas de la aritmética.\n6. Obtener el resultado de la operación de suma.\n7. Verificar que el resultado sea 4.\n8. Si el resultado es correcto, felicitarse por completar la tarea con éxito.
57	57	Sumar 2+2	1. Abrir una calculadora o utilizar papel y lápiz.\n2. Escribir el número 2.\n3. Sumarle 2 al número anterior.\n4. Obtener el resultado final, que es 4.
58	58	Realizar la Suma	1. Reunir los números 2 y 2 para sumarlos.\n2. Colocar el número 2 sobre el número 2, uno debajo del otro de manera alineada.\n3. Empezar sumando los dígitos de la columna de la derecha, en este caso, 2 + 2\n4. Realizar la suma, que en este caso es 4.\n5. Escribir el resultado de la suma, que es 4.
59	59	Realizar la suma 2 + 2	1. Reunir los dos números a sumar: 2 y 2.\n2. Colocar los dos números en una columna vertical.\n3. Sumar uno a uno los dígitos empezando por la derecha: 2 + 2 = 4.
60	60	Instalación del entorno de desarrollo.	1. Descargar e instalar un compilador de C++ en tu computadora, como por ejemplo, Visual Studio Community, Code::Blocks o Dev-C++.\n2. Configurar el compilador para que reconozca archivos y proyectos de C++.\n3. Crear un nuevo proyecto de C++ en el entorno de desarrollo que hayas instalado.\n4. Escribir un programa simple en C++, como un "Hola Mundo", para asegurarte de que el entorno de desarrollo está configurado correctamente.\n5. Compilar y ejecutar el programa para verificar que todo funciona según lo esperado.
61	61	Repasar conceptos básicos de C++.	1. Revisar los fundamentos de programación en C++ como variables, tipos de datos, operadores y estructuras de control.\n2. Repasar la sintaxis básica de C++ incluyendo la declaración de funciones, bucles y condicionales.\n3. Hacer ejercicios prácticos para afianzar los conceptos básicos de C++.\n4. Realizar pequeños programas en C++ para aplicar los conocimientos repasados.\n5. Consultar documentación y recursos adicionales para reforzar la comprensión de los conceptos básicos de C++.
62	62	Practicar con estructuras de datos en C++.	1. Estudiar los conceptos de arrays, strings y punteros en C++.\n2. Realizar ejercicios prácticos que involucren el uso de arrays, strings y punteros.\n3. Implementar estructuras de datos simples utilizando arrays y punteros en programas en C++.\n4. Experimentar con la manipulación de strings y punteros en diferentes contextos.\n5. Resolver problemas que requieran el uso eficiente de arrays, strings y punteros en C++.
63	63	Crear y utilizar funciones en C++.	1. Aprender sobre la definición y uso de funciones en C++.\n2. Practicar la creación de funciones simples que realicen tareas específicas.\n3. Entender los conceptos de parámetros de funciones y valores de retorno.\n4. Implementar funciones más complejas que requieran lógica y decisiones dentro de ellas.\n5. Integrar funciones en programas más extensos para modularizar el código y mejorar la organización.
64	64	Proyectos avanzados en C++.	1. Explorar conceptos avanzados de C++ como herencia, polimorfismo y templates.\n2. Practicar la creación de clases y objetos con funcionalidades complejas.\n3. Implementar herencia y polimorfismo en programas para entender su uso y beneficios.\n4. Utilizar templates para crear estructuras y funciones genéricas en C++.\n5. Desarrollar un proyecto más completo que aplique todos los conceptos aprendidos en un contexto práctico y desafiante.
65	65	Investigación de sistemas existentes	1. Investigar y recopilar información sobre los diferentes sistemas de gestión de inventarios disponibles en el mercado.\n2. Analizar las funcionalidades, ventajas, desventajas y costos de cada sistema identificado.\n3. Realizar comparativas entre los diferentes sistemas para determinar cuál se adapta mejor a las necesidades de la empresa.\n4. Presentar un informe detallado con recomendaciones sobre el sistema de gestión de inventarios más adecuado para implementar.
66	66	Análisis de requerimientos	1. Reunir con los diferentes departamentos de la empresa para identificar sus necesidades y requerimientos en cuanto a la gestión de inventarios.\n2. Documentar de forma detallada los requisitos y funcionalidades específicas que debe cumplir el sistema de gestión de inventarios.\n3. Realizar un análisis exhaustivo de los datos recopilados para determinar los elementos clave a tener en cuenta en el diseño del sistema.\n4. Validar los requerimientos con los stakeholders involucrados para garantizar su alineación con las expectativas de la empresa.
67	67	Diseño de la solución	1. Identificar y seleccionar la tecnología o herramientas apropiadas para el desarrollo del sistema de gestión de inventarios.\n2. Diseñar la arquitectura del sistema teniendo en cuenta los requisitos y funcionalidades previamente establecidos.\n3. Definir la estructura de la base de datos y los procesos de flujo de información dentro del sistema.\n4. Crear un prototipo inicial del diseño para obtener retroalimentación temprana de los stakeholders.
68	68	Desarrollo del sistema	1. Programar la lógica del sistema de gestión de inventarios de acuerdo con los requisitos y diseño establecidos.\n2. Integrar las funcionalidades necesarias para la gestión de inventarios, como control de stock, registro de entradas y salidas, entre otros.\n3. Realizar pruebas unitarias para asegurar el correcto funcionamiento de cada componente desarrollado.\n4. Corregir posibles errores o fallos identificados durante las pruebas para garantizar la calidad del sistema.
69	69	Pruebas de integración	1. Integrar los diferentes módulos y componentes del sistema de gestión de inventarios para asegurar su correcto funcionamiento en conjunto.\n2. Realizar pruebas de integración para verificar la interoperabilidad entre las distintas partes del sistema.\n3. Identificar y resolver posibles conflictos o inconsistencias surgidas durante las pruebas de integración.\n4. Validar que la comunicación entre los diferentes elementos del sistema se realice de manera adecuada y sin errores.
79	79	Desarrollo	1. Configurar el entorno de desarrollo necesario para la creación de la aplicación de control de gastos.\n2. Escribir el código correspondiente para implementar las funcionalidades requeridas en la aplicación.\n3. Realizar pruebas unitarias para garantizar el correcto funcionamiento de cada componente desarrollado.\n4. Integrar los diferentes módulos de la aplicación y verificar su interacción.\n5. Corregir posibles errores o bugs identificados durante el proceso de desarrollo.
80	80	Pruebas	1. Realizar pruebas de funcionamiento de la aplicación para verificar su correcto comportamiento.\n2. Probar la aplicación en diferentes dispositivos y sistemas operativos para garantizar la compatibilidad.\n3. Validar la seguridad de la aplicación en cuanto a protección de datos y transacciones financieras.\n4. Ejecutar pruebas de rendimiento para evaluar la velocidad y estabilidad de la aplicación.\n5. Documentar los resultados de las pruebas y generar informes detallados de los hallazgos.
81	81	Implementación	1. Desplegar la aplicación de control de gastos en un entorno de producción.\n2. Configurar y administrar los servidores y recursos necesarios para el funcionamiento de la aplicación.\n3. Realizar una última revisión de la aplicación antes de su lanzamiento oficial.\n4. Publicar la aplicación en las tiendas de aplicaciones relevantes para que los usuarios puedan descargarla.\n5. Monitorear el rendimiento y la respuesta de los usuarios tras el lanzamiento para realizar ajustes si es necesario.
82	82	Diseño de la interfaz de usuario	1. Realizar un análisis de los requisitos y necesidades de los profesionales que utilizarán la red social.\n2. Diseñar bocetos y prototipos de la interfaz de usuario, teniendo en cuenta la usabilidad y la experiencia del usuario.\n3. Recopilar feedback y realizar iteraciones en el diseño según las opiniones y sugerencias recibidas.\n4. Crear la versión final de la interfaz de usuario basada en los resultados del análisis y los prototipos mejorados.
83	83	Desarrollo de funcionalidades de conexión profesional	1. Definir las funcionalidades específicas que faciliten la conexión entre profesionales, como la búsqueda de perfiles, mensajería directa y grupos de interés.\n2. Diseñar el flujo de interacción de las funcionalidades, asegurando una experiencia fluida y efectiva para los usuarios.\n3. Desarrollar las funciones técnicas necesarias para implementar las conexiones profesionales de manera segura y eficiente.\n4. Realizar pruebas exhaustivas para garantizar el correcto funcionamiento de las funcionalidades de conexión en diversos escenarios de uso.
84	84	Implementación de sistema de recomendaciones	1. Investigar y definir algoritmos de recomendación apropiados para la red social de profesionales.\n2. Diseñar la arquitectura del sistema de recomendaciones, considerando la escalabilidad y la personalización.\n3. Desarrollar e implementar los algoritmos de recomendación en la plataforma de la red social.\n4. Realizar pruebas exhaustivas para verificar la efectividad y precisión del sistema de recomendaciones en entornos reales.
85	85	Lanzamiento y promoción en redes sociales	1. Crear un plan de lanzamiento detallado, incluyendo fechas, canales de comunicación y estrategias de promoción.\n2. Preparar contenido promocional atractivo para las redes sociales y otros medios de difusión.\n3. Coordinar con influencers u otros profesionales relevantes para promover la red social.\n4. Monitorizar el rendimiento del lanzamiento y ajustar las estrategias de promoción según los resultados obtenidos.
86	86	Diseño del sistema de monitoreo	1. Definir los requisitos y objetivos del sistema de monitoreo de salud.\n2. Realizar un análisis de las tecnologías disponibles para la implementación del sistema.\n3. Diseñar la arquitectura del sistema, definiendo los componentes necesarios y la interacción entre ellos.\n4. Desarrollar prototipos o mockups para visualizar la interfaz y funcionalidades del sistema.\n5. Validar el diseño con posibles usuarios o stakeholders para obtener retroalimentación.\n6. Refinar y ajustar el diseño en base a los comentarios recibidos.\n7. Preparar la documentación técnica del sistema de monitoreo de salud.
87	87	Investigación de tecnologías	1. Realizar una investigación exhaustiva sobre las diferentes tecnologías disponibles para el monitoreo de salud, incluyendo dispositivos wearables, sensores biométricos, aplicaciones móviles y plataformas en la nube.\n2. Analizar las características, ventajas y desventajas de cada tecnología en términos de precisión, costo, facilidad de uso y compatibilidad con el sistema propuesto.\n3. Evaluar la escalabilidad y la integración de las tecnologías con el sistema de monitoreo de salud, considerando la posibilidad de futuras actualizaciones y expansiones.\n4. Seleccionar las tecnologías más adecuadas en función de los requisitos del proyecto y los objetivos del sistema de monitoreo de salud.\n5. Documentar los hallazgos de la investigación y la justificación de la elección de tecnologías para su posterior implementación.
88	88	Implementación del sistema	1. Desarrollar el sistema de monitoreo de salud basado en los requisitos y la arquitectura previamente definidos.\n2. Integrar las tecnologías seleccionadas en la etapa de investigación en el sistema, asegurando su funcionamiento correcto y sincronización.\n3. Realizar pruebas exhaustivas para verificar la precisión de los datos recopilados, la estabilidad del sistema y la facilidad de uso para los usuarios finales.\n4. Implementar medidas de seguridad para proteger la privacidad y confidencialidad de la información de salud generada por el sistema.\n5. Capacitar al personal encargado del mantenimiento y uso del sistema de monitoreo de salud.\n6. Realizar ajustes y mejoras según sea necesario, en base a las pruebas y retroalimentación recibidas durante la fase de implementación.\n7. Documentar detalladamente el proceso de implementación y las especificaciones técnicas del sistema.
89	89	Restar 3-2	1. Escribir la ecuación matemática "3 - 2" en un papel o dispositivo electrónico.\n2. Restar 2 unidades a 3.\n3. Calcular el resultado de la resta.\n4. Confirmar que la respuesta es 1.\n5. Marcar la tarea como completada en la lista de tareas del proyecto.
90	90	Preparar la corbata	1. Establecer el largo de la corbata: Colocar la corbata alrededor del cuello con la punta ancha hacia abajo y ajustarla para que la punta estrecha llegue hasta la altura del cinturón.
91	91	Ajustar corbata	1. Ajustar el nudo: Tomar la punta ancha de la corbata y pasarla por encima de la punta estrecha. Luego, pasarla por debajo y luego a través del lazo que se ha formado alrededor del cuello. Ajustar el nudo deslizando suavemente hacia arriba hacia el cuello.
92	92	Ajustes finales	1. Acomodar la corbata: Asegurarse de que la corbata esté correctamente ajustada y que el nudo esté centrado y alineado antes de salir. Asegurarse de que la punta estrecha no sea visible por debajo de la punta ancha. ¡Listo para lucir la corbata perfectamente atada!
\.


--
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proyectos (proyecto_id, nombre, user_id, proyect_notion_url) FROM stdin;
14	Suma simple: 2 + 2	2	https://aaronproject1.notion.site/52751c3226884632a0f62d746f1a88c3
15	"Curso intensivo de C++ en 2 semanas"	2	https://aaronproject1.notion.site/6f5b2062b2ce4e69897ad6ba456e1e2b
16	Proyecto: "Aprendiendo C++ en 2 Semanas"	1	https://aaronproject1.notion.site/5a9d9c4510a1446b8805516407626f16
17	Proyecto: Suma de números (23 + 23)	1	https://aaronproject1.notion.site/db972c80ce2843328ff083b4dfcb7399
18	Aprender HTML en 4 semanas	1	https://aaronproject1.notion.site/aeed47add88448ff99c391d6e07e81d8
19	"Suma de 23 + 23"	5	https://aaronproject1.notion.site/28684e6325a1409ea280647c07e2145e
20	Aprender HTML en 4 Semanas.	2	https://aaronproject1.notion.site/92c8f9d3dce8497e804ac9021eabca5b
21	Suma simple: 2 + 2	2	https://aaronproject1.notion.site/afbf67e1dc054e6abc515d4ebf87f3c0
22	Suma Simple	2	https://aaronproject1.notion.site/f221b622198044808da7af4776c88467
23	Operación Matemática Simple	2	https://aaronproject1.notion.site/3ebd5dcb9a214c559d6f283059795e3d
24	Operación Matemática Básica	2	https://aaronproject1.notion.site/cdba62b78dfe49208f13f413d83fa871
25	Aprendiendo C++ en 2 semanas.	2	https://aaronproject1.notion.site/c53003b5b6cc4d3fbbd8e9b23c48bf12
26	"Sistema de Inventarios"	2	https://aaronproject1.notion.site/372a739663d64bbc9df7874ec4a699f5
27	"ControlGastos"	2	https://aaronproject1.notion.site/2ee35362eec34f58bd18e64970adf7ad
28	1. Diseño de la interfaz de usuario\n2. Desarrollo de funcionalidades de conexión profesional\n3. Implementación de sistema de recomendaciones\n4. Lanzamiento y promoción en redes sociales	2	https://aaronproject1.notion.site/a3c2afe4ebdc47eabf84fa4da0ca1f9a
29	Proyecto: Sistema de Monitoreo de Salud	2	https://aaronproject1.notion.site/616b2528b6c043758273d4507ffbb8d4
30	Título del Proyecto: "Restar 3-2"	4	https://aaronproject1.notion.site/8a894574537b42ea96771933dccd217f
31	Proyecto Corbata Bien Atada	2	https://aaronproject1.notion.site/87b1f85dd0c042ecb831a9df2c1784d0
\.


--
-- Data for Name: tareas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tareas (tarea_id, proyecto_id, numero_de_tareas, fecha_de_los_pasos, completitud) FROM stdin;
12	14	1	2024-06-04	f
13	15	10	2024-06-05	f
14	15	\N	2024-06-06	f
15	15	\N	2024-06-07	f
16	15	\N	2024-06-08	f
17	15	\N	2024-06-09	f
18	15	\N	2024-06-10	f
19	15	\N	2024-06-11	f
20	15	\N	2024-06-12	f
21	15	\N	2024-06-13	f
22	15	\N	2024-06-14	f
23	16	10	2024-06-04	f
24	16	\N	2024-06-05	f
25	16	\N	2024-06-06	f
26	16	\N	2024-06-07	f
27	16	\N	2024-06-08	f
28	16	\N	2024-06-09	f
29	16	\N	2024-06-10	f
30	16	\N	2024-06-11	f
31	16	\N	2024-06-12	f
32	16	\N	2024-06-14	f
33	17	2	2024-06-04	f
34	17	\N	2024-06-05	f
35	18	7	2024-06-07	f
36	18	\N	2024-06-08	f
37	18	\N	2024-06-09	f
38	18	\N	2024-06-10	f
39	18	\N	2024-06-11	f
40	18	\N	2024-06-12	f
41	18	\N	2024-06-13	f
42	19	2	2024-06-04	f
43	19	\N	2024-06-05	f
44	20	12	2024-06-12	f
45	20	\N	2024-06-13	f
46	20	\N	2024-06-16	f
47	20	\N	2024-06-20	f
48	20	\N	2024-06-25	f
49	20	\N	2024-06-27	f
50	20	\N	2024-06-30	f
51	20	\N	2024-07-03	f
52	20	\N	2024-07-06	f
53	20	\N	2024-07-09	f
54	20	\N	2024-07-13	f
55	20	\N	2024-07-18	f
56	21	1	2024-06-05	f
57	22	1	2024-06-05	f
58	23	1	2024-06-05	f
59	24	1	2024-06-05	f
60	25	5	2024-06-06	f
61	25	\N	2024-06-07	f
62	25	\N	2024-06-08	f
63	25	\N	2024-06-09	f
64	25	\N	2024-06-10	f
65	26	10	2024-06-10	f
66	26	\N	2024-06-11	f
67	26	\N	2024-06-13	f
68	26	\N	2024-06-17	f
69	26	\N	2024-06-20	f
70	26	\N	2024-06-24	f
71	26	\N	2024-06-28	f
72	26	\N	2024-07-03	f
73	26	\N	2024-07-05	f
74	26	\N	2024-07-09	f
75	27	7	2024-06-12	f
76	27	\N	2024-06-13	f
77	27	\N	2024-06-14	f
78	27	\N	2024-06-15	f
79	27	\N	2024-06-16	f
80	27	\N	2024-06-17	f
81	27	\N	2024-06-18	f
82	28	4	2024-06-13	f
83	28	\N	2024-06-14	f
84	28	\N	2024-06-15	f
85	28	\N	2024-06-16	f
86	29	3	2024-06-13	f
87	29	\N	2024-06-14	f
88	29	\N	2024-06-17	f
89	30	1	2024-06-15	f
90	31	3	2024-06-08	f
91	31	\N	2024-06-09	f
92	31	\N	2024-06-10	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
1	Alejandro Gutierrez Perez23	aypierre222@gmail.com	$2a$10$9eMrAddhnwyVfsDg6volkeunv1MaP0blgkFodDeseLP3dvLeKB/ve
2	Alejandro Gutierrez Perez	josesito.002@hotmail.com	$2a$10$TH9JaY3663Vl7nbRdeKQne.2Z.iV9d.eDYvVZ7reGFfJ1Rj0.fGp2
3	Fernando Cuevas Arroyo	a01642529@tec.mx	$2a$10$4H/zJuHQ0AVCS6aGVTJoduA6kjKTKEsgPs1cj/BMcPUmnNDNIH1kW
4	phantomsolan	aypierre223@gmail.com	$2a$10$CwhLj29Hklw5vR3p3fZ1.eX5iqYiO.MzbwV.uJ225diReKEwanosu
5	MarieGuarda20Numeros1	elded@gmail.com	$2a$10$xsPupdSQgw6JirVJ0s4BIeXkD55VbyWPeaVzL4y65jWEZw44NJ8Re
\.


--
-- Name: pasos_paso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pasos_paso_id_seq', 92, true);


--
-- Name: proyectos_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proyectos_proyecto_id_seq', 31, true);


--
-- Name: tareas_tarea_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tareas_tarea_id_seq', 92, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: pasos pasos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pasos
    ADD CONSTRAINT pasos_pkey PRIMARY KEY (paso_id);


--
-- Name: proyectos proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (proyecto_id);


--
-- Name: tareas tareas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tareas_pkey PRIMARY KEY (tarea_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: pasos pasos_tarea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pasos
    ADD CONSTRAINT pasos_tarea_id_fkey FOREIGN KEY (tarea_id) REFERENCES public.tareas(tarea_id);


--
-- Name: proyectos proyectos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: tareas tareas_proyecto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tareas_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(proyecto_id);


--
-- PostgreSQL database dump complete
--

