# Use the animcogn/face_recognition image from Docker Hub
FROM animcogn/face_recognition:latest

# Set the working directory in the container
WORKDIR /app

# Install Flask and other dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your application code
COPY . .

# Run the application
CMD ["python", "app.py"]
