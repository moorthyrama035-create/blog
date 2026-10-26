# Deploying Blogify

## Backend on Render

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint**, connect this repository, and apply the root `render.yaml`.
3. Enter the values for `MONGO_URI`, `JWT_SECRET`, and `CLOUDINARY_URL` when prompted. Keep these secrets in Render; do not commit them or paste them into chat.
4. Wait for the `blogify-api-moorthyrama` service to finish deploying. Its health check is `/health`.
5. Confirm `https://blogify-api-moorthyrama.onrender.com/health` returns `{"status":"ok"}`.

The frontend's default API URL is configured to match this Render service. If Render assigns a different public URL, set `VITE_API_URL` to that URL in the frontend host's build environment and rebuild the frontend.

Render's free web services can sleep when idle. The first request after inactivity may take around a minute to wake up; this is a limitation of the free plan.
