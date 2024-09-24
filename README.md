<!-- @format -->

# Subscription-Based Fitness Plan Generator

## Overview

The Subscription-Based Fitness Plan Generator is a SaaS platform designed to help users achieve their fitness goals through personalized workout routines and meal plans. Users can sign up, create fitness profiles, and receive AI-generated plans tailored to their goals and preferences. The platform also allows users to track their progress, log exercises, and share results on social media.

## Features

- **User Authentication and Subscriptions**: Secure sign-up and subscription management using [Clerk](https://clerk.dev).
- **Fitness Profile Creation**: Users can create profiles detailing their fitness goals (e.g., weight loss, muscle gain), preferences (e.g., home workouts, gym), and track their history.
- **AI-Generated Plans**: Personalized workout routines and meal plans generated using AI APIs based on user inputs.
- **Progress Tracking**: Users can log exercises, monitor progress, and adjust their plans as needed.
- **Social Sharing**: Easily share fitness achievements and progress on social media platforms.
- **Notifications and Reminders**: Users receive reminders to help them stay on track with their fitness plans.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Neon DB
- **ORM**: Drizzle ORM
- **UI Components**: ShadCN UI
- **Authentication**: Clerk for user authentication and subscription management

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- A Neon DB account
- Clerk account for authentication

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Falasefemi2/fitness-planner.git
   cd fitness-planner
   npm install
   NEON_DB_URL=your_neon_db_url
   CLERK_FRONTEND_API=your_clerk_frontend_api
   CLERK_API_KEY=your_clerk_api_key
   npm run dev

   ```
