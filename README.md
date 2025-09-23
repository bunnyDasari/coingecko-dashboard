# CryptoDash - Cryptocurrency Dashboard

A responsive cryptocurrency dashboard built with **Next.js**, **Tailwind CSS**, and **TypeScript**. Track live prices, market caps, 24h changes, and more. Clicking a coin opens a detailed modal for quick insights.

---

## Table of Contents
- [Demo](#demo)
- [Tech Stack & Architecture](#tech-stack--architecture)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Design Patterns & Rationale](#design-patterns--rationale)
- [Assumptions, Limitations, and Future Improvements](#assumptions-limitations-and-future-improvements)

---

## Demo
Vercel deployment.

---

## Tech Stack & Architecture

- **Frontend**: Next.js 14, React 18, TypeScript  
- **Styling**: Tailwind CSS 
- **Icons**: Lucide-React  
- **State Management**: React `useState` & `useEffect` hooks (local state)  
- **API Integration**: CoinGecko API  

## Setup Instructions

1. **Clone the repository**
```bash
Clone repo
cd cryptodash
npm install
npm run dev
