const firebaseConfig = {
  apiKey: "REPLACE_API_KEY",
  authDomain: "REPLACE_AUTH_DOMAIN",
  projectId: "REPLACE_PROJECT_ID",
  storageBucket: "REPLACE_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_MSG_SENDER_ID",
  appId: "REPLACE_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("shareForm");
const statusEl = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e)=>{
  e.preventDefault();

  submitBtn.disabled = true;
  statusEl.textContent = "جاري الإرسال...";

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    device: document.getElementById("device").value,
    notes: document.getElementById("notes").value,
    consent: document.getElementById("consent").checked,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  try{
    await db.collection("shared_data").add(data);
    statusEl.style.color = "lightgreen";
    statusEl.textContent = "تم الإرسال بنجاح ✔";
    form.reset();
  }catch(err){
    statusEl.style.color = "salmon";
    statusEl.textContent = "حدث خطأ أثناء الإرسال";
  }

  submitBtn.disabled = false;
});
