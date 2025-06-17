# Tochukwu Nwosa – Frontend Developer Portfolio

Welcome to the source code of my personal portfolio, a showcase of my work as a frontend developer specializing in React, Next.js, and modern web technologies. This project highlights my skills, featured projects, and professional experience.

## Image Preview

![Tochukwu Nwosa Portfolio Preview](https://tochukwu-nwosa.vercel.app/portfolio-image.png)


## 🌐 Live Site

Explore the live portfolio here: [tochukwu-nwosa.vercel.app](https://tochukwu-nwosa.vercel.app)

## 💠 Tech Stack

* **Framework:** Next.js
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Email Service:** EmailJS
* **Analytics:** Umami
* **Deployment:** Vercel

## 📁 Project Structure

```
├── components/        # Reusable React components
├── pages/             # Next.js pages
├── public/            # Static assets
├── styles/            # Global styles and Tailwind configurations
├── utils/             # Utility functions
├── .env.local         # Environment variables
├── tailwind.config.js # Tailwind CSS configuration
└── next.config.js     # Next.js configuration
```

## 📸 Featured Projects

### [Kinplus Technologies](https://www.kinplusgroup.com)

A corporate website developed with React and Tailwind CSS, focusing on responsive design and user engagement.

### [Kinlearn](https://www.kinlearn.vercel.app)

An educational platform built using Next.js, Tailwind CSS, and MongoDB, providing a seamless learning experience.

### [Upsmart Solutions](https://www.upsmartsolutions.com.ng)

A business solutions website crafted with Next.js and Tailwind CSS, emphasizing performance and scalability.

## 📧 Contact Form Integration

The contact form utilizes **EmailJS** to send messages directly to my email and an acknowledgment to the user. Ensure the following environment variables are set:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_TOCHI=your_template_id_tochi
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT=your_template_id_client
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Get Emailjs here https://emailjs.com

## 📊 Analytics

Implemented **Umami** for privacy-focused analytics. Set the following environment variable:

```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your_umami_website_id
```

Get Umami here https://umami.is

## 🚀 Getting Started

### Prerequisites

* Node.js >= 14.x
* npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/obere4u/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file and add your environment variables as shown above.

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📟 License

This project is open-source and available under the [MIT License](LICENSE).

If you find this project helpful or inspiring, please consider giving it a ⭐️!

