
---

# 🌟 SoulStar — Your AR Guide to the Stars 🌟

**SoulStar** is a magical React Native project that uses augmented reality to connect you with the cosmos. Look up at the stars, find the one that connects you with your love, and let SoulStar show you the beauty of the universe in the palm of your hand.  

This guide will help you set up the project, from scratch, on WSL Ubuntu, configure the build environment, and build the APK with a simple and automated way to share it via QR code for easy installation on your phone.

---

## Why SoulStar?

🌠 Imagine pointing your phone at the night sky and discovering the star that binds your soul to your love.  

**Features:**
- AR-powered celestial visualization.  
- Real-time tracking of stars and their positions.
- Personalized connections to the cosmos.

Let’s bring the stars to life!

---

## 🚀 Getting Started

Follow these steps to get up and running with the SoulStar project on WSL Ubuntu.  

---

### 1. **Set Up WSL and Ubuntu**

1. Open PowerShell on your Windows machine and install WSL:  
   ```powershell
   wsl --install
   ```

2. Restart your PC if prompted.

3. Open the Ubuntu terminal and update your packages:  
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

### 2. **Install Dependencies**

#### Install Required Tools:
Run this command to get Java, Python, and essential tools installed:  
```bash
sudo apt install -y openjdk-11-jdk wget unzip curl python3-pip
```

#### Install Node.js and Yarn:
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
npm install --global yarn
```

---

### 3. **Set Up Android SDK**

#### Download Android Command Line Tools:
```bash
mkdir -p ~/Android/cmdline-tools && cd ~/Android/cmdline-tools
wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip
unzip commandlinetools-linux-10406996_latest.zip
mv cmdline-tools latest
```

#### Install Android SDK Packages:
1. Add the tools to your `PATH`:
   ```bash
   export ANDROID_HOME=~/Android
   export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
   ```

2. Install required Android SDK packages:
   ```bash
   sdkmanager --install "platform-tools" "platforms;android-33" "build-tools;33.0.2"
   ```

#### Persistent Environment Variables:
Add the following to your `~/.bashrc`:
```bash
export ANDROID_HOME=~/Android
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
```
Reload with:
```bash
source ~/.bashrc
```

---

### 4. **Set Up the SoulStar Project**

1. Clone the SoulStar repository:
   ```bash
   git clone <YOUR_SOULSTAR_REPO_URL>
   cd soulstar
   ```

2. Install project dependencies:
   ```bash
   yarn install
   ```

3. Verify the setup:
   ```bash
   yarn android
   ```

---

### 5. **Build the APK and Generate a QR Code**

Here’s where the magic happens! We’ll build the APK and make it easy to install on your phone.

#### Install QR Code Generator:
```bash
pip3 install qrcode[pil]
```

#### Add a Build and QR Code Script:
Create a script `build_and_qr.sh` in the root of your project:
```bash
#!/bin/bash

# Build the APK
echo "Building the APK..."
cd android && ./gradlew assembleRelease && cd ..

# Locate the APK
APK_PATH=$(find ./android/app/build/outputs/apk/release -name "*.apk" | head -n 1)
QR_OUTPUT="soulstar_qr.png"

if [ -z "$APK_PATH" ]; then
  echo "❌ APK not found! Make sure the build was successful."
  exit 1
fi

# Serve the APK via HTTP
echo "Starting HTTP server..."
cd $(dirname "$APK_PATH")
python3 -m http.server &

# Generate QR Code
IP=$(hostname -I | awk '{print $1}')
APK_LINK="http://$IP:8000/$(basename "$APK_PATH")"
python3 -c "
import qrcode
qr = qrcode.make('$APK_LINK')
qr.save('$QR_OUTPUT')
"

echo "✅ Build complete! Scan the QR code to download the APK: $QR_OUTPUT"
```

Make it executable:
```bash
chmod +x build_and_qr.sh
```

#### Build and Share:
Run the script:
```bash
./build_and_qr.sh
```

You’ll get:
- A hosted APK ready for download.
- A QR code (`soulstar_qr.png`) to scan with your phone.

---

## 🎉 Bringing It All Together

1. **Build the APK**:  
   Use the `./build_and_qr.sh` script.  

2. **Install on Your Phone**:  
   Scan the QR code with your phone’s camera or QR code scanner app.

3. **Experience the Cosmos**:  
   Launch SoulStar and connect with the stars!

---

## 🌌 Future of SoulStar

We’re just getting started. Here’s what’s on the horizon:
- Enhanced AR star visualization.
- User-generated star connections.
- Multi-language support for stargazers around the globe.

Let’s make the stars even more magical, together. 🌠

---

If you run into any issues or have ideas for improvement, feel free to contribute or drop me a message!
