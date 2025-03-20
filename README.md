# SnapPlusProMax AI-Powered Travel & Content Creation

A **Snapchat-inspired** AI-powered travel assistant & content creation tool. Features **AI-curated travel recommendations, real-time itinerary optimization, and Sketch-to-Animation Avatars**.

## **✨ Features**
✅ **AI-Powered Map** – Discover places your friends are visiting & get personalized recommendations.  
✅ **Personalized AI Travel Assistant** – Click on a friend’s **Snap Story location** & instantly generate your **own travel plan**.  
✅ **Sketch-to-Animation for Avatars** – Upload a hand-drawn sketch & transform it into an animated avatar using **GANs + OpenCV**.  

---

## **Project Setup**

### **1️⃣ Prerequisites**
Make sure you have the following installed:
- **Docker** 
- **Node.js**
- **Python 3.8+** 
- **PostgreSQL** 
- **Git**

---

## **⚙️ Backend Setup**

### **1️⃣ Clone the Repository**

### **2️⃣ Environment Variables**
Create a `.env` file in the **backend** directory:
```bash
PORT=5001
DATABASE_URL=postgres://postgres:mysecretpassword@localhost:5431/travel_db
OPENAI_API_KEY=your_openai_api_key
```

### **3️⃣ Setup PostgreSQL with Docker**

### **4️⃣ Initialize the Database**
```bash
docker exec -it travel_assistant_db psql -U postgres -d travel_db
```
Run the following in the PostgreSQL shell:
```sql
CREATE TABLE IF NOT EXISTS itineraries (
    id SERIAL PRIMARY KEY,
    location TEXT NOT NULL,
    budget TEXT NOT NULL,
    preferences TEXT NOT NULL,
    itinerary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### **5️⃣ Install Backend Dependencies**
```bash
cd backend
npm install
```

### **6️⃣ Start the Backend Server**
```bash
node server.js
```
You should see:
```bash
Server running on port 5001
Itinerary table verified
Sketches table verified
```

---

## **🎨 Frontend Setup**
### **1️⃣ Install Dependencies**
```bash
cd frontend
npm install
```

### **2️⃣ Start the Frontend**
```bash
npm start
```
Then open **`http://localhost:3000`** in your browser.

---

## **🤖 AI-Powered Sketch-to-Animation**
### **1️⃣ Download Pretrained GAN Model**
```bash
cd backend
wget http://efrosgans.eecs.berkeley.edu/pix2pix/models/facades_label2photo.pth -O model_weights.pth
```

### **2️⃣ Run the AI Sketch Processor**
```bash
python3 process_sketch.py
```

### **3️⃣ Test with a Sketch**
```bash
curl -X POST http://localhost:5001/api/sketch \
     -H "Content-Type: multipart/form-data" \
     -F "image=@/path/to/your/sketch.png"
```

## **📌 Future Enhancements**
- **🔹 Snap Map Alternative**: AI-recommended travel spots in real-time.
- **🔹 AI-Powered Snap Assistant**: Generate story ideas from text/audio.
- **🔹 Travel Cost Optimization**: Real-time AI budget optimization.
