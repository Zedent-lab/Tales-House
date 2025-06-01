#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Creating src/index.css with Tailwind directives..."
mkdir -p src
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

echo "Setup complete! You can now run 'npm run dev' to start the development server."

