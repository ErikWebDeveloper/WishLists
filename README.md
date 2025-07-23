# 🎁 WishLists

WishLists es una aplicación web moderna para crear, compartir y organizar listas de deseos de forma sencilla y visual. Ideal para cumpleaños, eventos, compras personales o colaborativas.

## 🚀 Tecnologías Utilizadas

- ⚡ [Vite](https://vitejs.dev/) – Bundler ultrarrápido para desarrollo moderno
- ⚛️ [React](https://reactjs.org/) – Librería de UI declarativa
- ✨ [TypeScript](https://www.typescriptlang.org/) – Tipado estático para mayor seguridad
- 🎨 [Ant Design](https://ant.design/) – Sistema de diseño con componentes elegantes
- 🧰 [Supabase](https://supabase.com/) – Backend como servicio (auth, base de datos, almacenamiento)

## 🖼️ Funcionalidades

- 📋 Crear múltiples listas de deseos personalizadas
- 🎨 Agregar imágenes, descripciones, orden personalizado y favoritos
- 🔐 Autenticación de usuarios (registro, login, logout)
- 🔗 Compartir listas públicas mediante enlaces
- ✏️ Edición de listas e ítems en tiempo real
- ☁️ Datos sincronizados automáticamente con Supabase

## 🛠️ Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tuusuario/wishlists.git
cd wishlists
````

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz con tus claves de Supabase:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

## 🧪 Scripts disponibles

| Comando           | Descripción                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo             |
| `npm run build`   | Genera la versión de producción              |
| `npm run preview` | Previsualiza la app en producción localmente |
| `npm run lint`    | Ejecuta el linter de TypeScript              |

## 🖼️ Capturas

<p align="center">
  <img src="/public/Screenshoot.png" alt="Wishlist preview" width="600" />
</p>


## 📁 Estructura del Proyecto

```bash
src/
│
├── components/       # Componentes reutilizables
├── context/          # Context API (Auth, Listas, etc.)
├── hooks/            # Custom hooks
├── pages/            # Páginas principales
├── services/         # Supabase y otras APIs
├── types/            # Tipos de TypeScript
└── utils/            # Funciones auxiliares
```

## 👤 Autor

* [Erik Firmino](https://erikwebdeveloper.github.io/) – Desarrollador Full Stack

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

> ¿Tienes ideas para mejorar WishLists? ¡Abre un issue o contribuye con un PR!


