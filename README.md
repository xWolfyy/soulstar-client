---

# Android app

This guide helps you set up an Android development environment on WSL Ubuntu from scratch. It also includes a script to automatically generate a QR code for downloading APKs.

---

## Prerequisites

1. Windows Subsystem for Linux (WSL) installed on your system.
2. Ubuntu installed as a WSL instance.

---

## Steps

### **1. Install WSL Ubuntu**
1. Open PowerShell and install WSL with Ubuntu:
   ```powershell
   wsl --install
   ```
2. Restart your system if prompted.

3. Launch the Ubuntu terminal and ensure WSL is up-to-date:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

---

### **2. Install Android SDK on WSL**

#### **2.1 Install Dependencies**
Install Java and required tools:
```bash
sudo apt install -y openjdk-11-jdk wget unzip curl python3-pip
```

#### **2.2 Download and Install Android SDK**
1. Create an Android tools directory:
   ```bash
   mkdir -p ~/Android/cmdline-tools && cd ~/Android/cmdline-tools
   ```

2. Download the latest command line tools:
   ```bash
   wget https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip
   ```

3. Unzip the file:
   ```bash
   unzip commandlinetools-linux-10406996_latest.zip
   mv cmdline-tools latest
   mv latest ~/Android/cmdline-tools/
   ```

#### **2.3 Install Android SDK Packages**
1. Move into the tools directory:
   ```bash
   cd ~/Android/cmdline-tools/latest/bin
   ```

2. Install required packages:
   ```bash
   ./sdkmanager --install "platform-tools" "platforms;android-33" "build-tools;33.0.2"
   ```

3. Accept licenses if prompted by typing `y`.

---

### **3. Configure Environment Variables**
Add these lines to your `~/.bashrc` file:
```bash
export ANDROID_HOME=~/Android
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH
```

Reload the configuration:
```bash
source ~/.bashrc
```

Verify:
```bash
echo $ANDROID_HOME
```

---

### **4. Automate APK Retrieval and QR Code Generation**

#### **4.1 Install QR Code Generator**
Install the Python QR code module:
```bash
pip3 install qrcode[pil]
```

#### **4.2 Create the Script**
Create a script `generate_apk_qr.sh` in your project directory:

```bash
#!/bin/bash

# Variables
BUILD_DIR="path/to/your/build/output"
APK_NAME=$(find "$BUILD_DIR" -type f -name "*.apk" | head -n 1)
QR_OUTPUT="apk_qr_code.png"

# Ensure an APK exists
if [ -z "$APK_NAME" ]; then
  echo "No APK found in $BUILD_DIR. Ensure the APK is built."
  exit 1
fi

# Create QR code
QR_LINK="http://$(hostname -I | awk '{print $1}')/$(basename $APK_NAME)"
python3 -c "
import qrcode
qr = qrcode.make('$QR_LINK')
qr.save('$QR_OUTPUT')
"
echo "QR Code generated: $QR_OUTPUT"
```

#### **4.3 Make the Script Executable**
```bash
chmod +x generate_apk_qr.sh
```

#### **4.4 Serve the APK via HTTP**
Run a Python HTTP server in the directory containing the APK:
```bash
cd path/to/your/build/output
python3 -m http.server
```

Run the `generate_apk_qr.sh` script:
```bash
./generate_apk_qr.sh
```

Scan the QR code on your phone to download the APK.

---

## Usage Workflow

1. Build your APK using your build system.
2. Run the `generate_apk_qr.sh` script to generate the QR code and serve the APK.
3. Scan the QR code to download the APK onto your phone.

---

## Troubleshooting

- Ensure Java is installed with `java -version`.
- Ensure all necessary Android SDK packages are installed using:
  ```bash
  sdkmanager --list
  ```
- If the QR code isn’t working, ensure the HTTP server is running and accessible via your local IP.

---

This `README.md` should set up your environment, automate APK retrieval, and make installation on any new machine seamless! Let me know if you need further adjustments. 😊
