# ZincWriter - Frontend

ZincWriter es una aplicación que permite convertir el contenido de un archivo plano a código en MiniZinc, un lenguaje de modelado para resolver problemas de optimización y programación matemática. MiniZinc es utilizado comúnmente para resolver problemas de satisfacción de restricciones, programación lineal, problemas de rutas, asignación de recursos, entre otros. A través de ZincWriter, los usuarios pueden transformar datos o estructuras representadas en un archivo plano (en este caso formato .txt) en un formato adecuado para MiniZinc, que luego puede ser usado en solvers como Gecode, Chuffed, y otros para obtener soluciones óptimas a los problemas planteados.

![image](https://github.com/user-attachments/assets/976b20c1-d341-457e-ae3e-4bb06b9d6035)

La aplicación fue desarrollada con **NEXT.js** en el frontend y **Python** con **FastAPI** en el backend para manejar la transferencia y procesamiento de datos.

En el frontend se implementó una opción para cargar un archivo de texto que contiene la configuración del problema. Este incluye las siguientes secciones:

- **Cantidad de productos (n) y materias primas (m)**: Define el número de elementos involucrados.
- **Datos de los productos**: Incluye nombre, precio y consumo de materias primas.
- **Datos de las materias primas**: Contiene nombre y disponibilidad.
- **Restricciones de demanda mínima y/o máxima**: Establece límites que deben cumplirse.

A continuación, se detalla la estructura del archivo de configuración utilizado en la aplicación

Estructura
```
n -> cantidad de productos en valor numerico
m -> cantidad de materia prima en valor numerico
.
.
.
.
nq -> reprsenta la cantidad de productos quimicos
.
.
.
.
.
mp -> representa la cantidad de materia prima en orden
.
.
.
.
dm -> se especifica la cantidad de demanda mínima y/o máxima
```

### Pruebas

Las pruebas de la aplicación se realizaron con cuatro (5) archivos .txt (archivos planos) que venían con la siguiente estructura:

$n=$ representa la cantidad de productos químicos 

$m=$ representa la cantidad de materia prima 

$nq=$ representa la cantidad de productos químicos

$mp=$ representa la cantidad de materia prima en orden

$dm=$se especifica la cantidad de demanda mínima y/o máxima



Archivo de prueba
```
12
6
Aceite rojo 74000 30 10 90 20 40 30
Aceite amarillo 96000 50 70 40 60 90 80
Aceite negro 83000 20 30 80 10 50 20
Aceite verde 87000 40 50 20 70 60 30
Aceite blanco 91000 10 30 60 40 20 70
Aceite azul 93000 30 60 40 50 90 20
Aceite gris 82000 20 10 30 80 40 70
Aceite dorado 95000 40 50 20 60 70 90
Aceite plateado 97000 30 20 50 40 30 20
Aceite verde premium 98000 50 40 30 60 70 80
Aceite negro especial 99000 60 70 40 30 20 50
Aceite rojo intenso 96000 40 30 20 10 80 90
Materia prima 1 13000 4000
Materia prima 2 21000 3500
Materia prima 3 43000 5000
Materia prima 4 17000 4500
Materia prima 5 25000 4800
Materia prima 6 31000 5200
Aceite rojo maximo 300
Aceite amarillo minimo 180
Aceite negro maximo 600
Aceite verde minimo 90
Aceite blanco minimo 150
Aceite azul maximo 500
Aceite gris minimo 100
Aceite dorado maximo 400
Aceite plateado minimo 200
Aceite verde premium maximo 450
Aceite negro especial minimo 250
Aceite rojo intenso maximo 350
```

Salida 

```
% Variables
var int: x1;
var int: x2;
var int: x3;
var int: x4;
var int: x5;
var int: x6;
var int: x7;
var int: x8;
var int: x9;
var int: x10;
var int: x11;
var int: x12;
% No negatividad
constraint x1 >= 0;
constraint x2 >= 0;
constraint x3 >= 0;
constraint x4 >= 0;
constraint x5 >= 0;
constraint x6 >= 0;
constraint x7 >= 0;
constraint x8 >= 0;
constraint x9 >= 0;
constraint x10 >= 0;
constraint x11 >= 0;
constraint x12 >= 0;
% Restricciones
constraint 30*x1 + 50*x2 + 20*x3 + 40*x4 + 10*x5 + 30*x6 + 20*x7 + 40*x8 + 30*x9 + 50*x10 + 60*x11 + 40*x12 <= 4000;
constraint 10*x1 + 70*x2 + 30*x3 + 50*x4 + 30*x5 + 60*x6 + 10*x7 + 50*x8 + 20*x9 + 40*x10 + 70*x11 + 30*x12 <= 3500;
constraint 90*x1 + 40*x2 + 80*x3 + 20*x4 + 60*x5 + 40*x6 + 30*x7 + 20*x8 + 50*x9 + 30*x10 + 40*x11 + 20*x12 <= 5000;
constraint 20*x1 + 60*x2 + 10*x3 + 70*x4 + 40*x5 + 50*x6 + 80*x7 + 60*x8 + 40*x9 + 60*x10 + 30*x11 + 10*x12 <= 4500;
constraint 40*x1 + 90*x2 + 50*x3 + 60*x4 + 20*x5 + 90*x6 + 40*x7 + 70*x8 + 30*x9 + 70*x10 + 20*x11 + 80*x12 <= 4800;
constraint 30*x1 + 80*x2 + 20*x3 + 30*x4 + 70*x5 + 20*x6 + 70*x7 + 90*x8 + 20*x9 + 80*x10 + 50*x11 + 90*x12 <= 5200;
% Restricciones de demanda
constraint x1 <= 300;
constraint x2 >= 180;
constraint x3 <= 600;
constraint x4 >= 90;
constraint x5 >= 150;
constraint x6 <= 500;
constraint x7 >= 100;
constraint x8 <= 400;
constraint x9 >= 200;
constraint x10 <= 450;
constraint x11 >= 250;
constraint x12 <= 350;
% Función objetivo
solve maximize 74000*x1 + 96000*x2 + 83000*x3 + 87000*x4 + 91000*x5 + 93000*x6 + 82000*x7 + 95000*x8 + 97000*x9 + 98000*x10 + 99000*x11 + 96000*x12;
```


# Instalación

## Requisitos previos:
Antes de comenzar, asegúrate de tener los siguientes programas instalados en tu sistema:

Node.js: Next.js es un framework de React que requiere Node.js para ejecutarse. Puedes descargar la última versión estable de Node.js desde su página oficial.

Git: Necesitarás Git para clonar el repositorio de GitHub. Puedes instalarlo desde aquí.

### Paso a paso para la instalación:
1. Clonar el repositorio de GitHub
Primero, necesitas clonar el repositorio donde se encuentra el proyecto ZincWriter. Abre una terminal o consola de comandos y ejecuta el siguiente comando:
```
git clone git@github.com:Kahyberth/zinc-writer.git
```

2. Acceder al directorio del proyecto
Una vez que el repositorio se haya clonado correctamente, navega al directorio del proyecto:
```
cd ZincWriter
```

3. Instalar las dependencias
El siguiente paso es instalar las dependencias necesarias para ejecutar la aplicación. El proyecto probablemente esté usando npm o yarn como gestor de paquetes. Si estás usando npm, ejecuta:
```
npm install
```

4. Crea las variables de entorno
Tienes que crear un archivo .env en el root del proyecto, esto con el fin de almacenar de manera "privada" el dominio o dirección del backend a donde se va a conectar.
En este caso como se esta usando FastApi como backend, la dirección local de desarrollo no cambia a menos que se modifique desde el backend. Entonces crea el archivo .env y pega lo siguiente:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

5. Correr la aplicación
Para ejecutar la aplicación simplemente ejecute el siguiente comando:
```
npm run dev
```






