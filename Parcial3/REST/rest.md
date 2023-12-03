# Principios de la Arquitectura REST #


 *María Belén Arévalo Esquivel - 19100144* ❤️
 
La Arquitectura de Transferencia de Estado Representacional (REST, por sus siglas en inglés) es un conjunto de principios arquitectónicos que guían el diseño de sistemas distribuidos. A continuación, se describen los principales principios y restricciones de la arquitectura REST. 

## Principios Fundamentales

### 1. Transferencia de Estado Representacional (RESTful)
REST se basa en la idea de que las aplicaciones web se comunican intercambiando representaciones de recursos. Cada recurso tiene una representación, y las operaciones CRUD (Crear, Leer, Actualizar, Borrar) se realizan mediante la manipulación de estas representaciones.

### 2. Cliente-Servidor
El sistema está dividido en dos componentes principales: el cliente, que solicita recursos, y el servidor, que los proporciona. Esta separación permite la evolución independiente de ambas partes y mejora la escalabilidad.

### 3. Sin Estado (Stateless)
Cada solicitud del cliente al servidor debe contener toda la información necesaria para comprender y procesar la solicitud. El servidor no debe almacenar información sobre el estado del cliente entre las solicitudes. Esto simplifica la implementación y mejora la escalabilidad.

### 4. Cacheable (Cachable)
Las respuestas del servidor pueden ser marcadas como cacheables o no-cacheables. El uso efectivo de la caché reduce la latencia y mejora la eficiencia de la red.

### 5. Interfaz Uniforme
REST define una interfaz uniforme a través de la cual los componentes interactúan. Esta interfaz consta de cuatro restricciones clave: identificación de recursos, manipulación de recursos a través de representaciones, mensajes autodescriptivos y hipermedios como motor de estado de la aplicación (HATEOAS).

### 6. Sistema de Capas
La arquitectura puede estar compuesta por capas, donde cada capa realiza una funcionalidad específica. Cada capa solo puede interactuar directamente con las capas adyacentes, lo que promueve la modularidad y la escalabilidad.

### 7. Código por Demanda (Opcional)
Los clientes pueden descargar y ejecutar código de manera dinámica, ampliando así su funcionalidad. Sin embargo, esta restricción es opcional y puede no ser aplicable en todos los casos.

### Principio RESTful

| Principio           | Descripción                                                                                                                                                         |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Transferencia de Estado Representacional | Las aplicaciones web se comunican intercambiando representaciones de recursos. Cada recurso tiene una representación, y las operaciones se realizan mediante la manipulación de estas representaciones. |

### Principio Cliente-Servidor

| Principio           | Descripción                                                                                                                                                         |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cliente-Servidor    | El sistema está dividido en dos componentes principales: el cliente, que solicita recursos, y el servidor, que los proporciona. Esto permite la evolución independiente y mejora la escalabilidad. |

### Principio Sin Estado

| Principio           | Descripción                                                                                                                                                         |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sin Estado          | Cada solicitud del cliente debe contener toda la información necesaria para comprender y procesar la solicitud. El servidor no debe almacenar información sobre el estado del cliente entre las solicitudes. |

Estas tablas proporcionan una visión resumida y organizada de los principios clave de la arquitectura REST. Es importante comprender estos principios al diseñar sistemas que sigan esta arquitectura para lograr una comunicación eficiente y escalable entre componentes distribuidos.

