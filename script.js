// লোকাল স্টোরেজ থেকে ডাটা লোড করা
let reminders = JSON.parse(localStorage.getItem('medicineReminders')) || [];

// পেজ লোড হওয়ার সময় লিস্ট দেখানো
window.onload = () => {
    displayReminders();
    startTimer();
};

function addReminder() {
    const name = document.getElementById('medName').value;
    const time = document.getElementById('medTime').value;

    if (name === '' || time === '') {
        alert("দয়া করে নাম এবং সময় সঠিকভাবে দিন!");
        return;
    }

    const reminder = {
        id: Date.now(),
        name: name,
        time: time
    };

    reminders.push(reminder);
    localStorage.setItem('medicineReminders', JSON.stringify(reminders));
    
    document.getElementById('medName').value = '';
    document.getElementById('medTime').value = '';
    
    displayReminders();
}

function displayReminders() {
    const list = document.getElementById('reminderList');
    list.innerHTML = '';

    reminders.sort((a, b) => a.time.localeCompare(b.time));

    reminders.forEach(item => {
        list.innerHTML += `
            <li>
                <div>
                    <strong>${item.name}</strong> <br>
                    <small>সময়: ${item.time}</small>
                </div>
                <button class="delete-btn" onclick="deleteReminder(${item.id})">মুছুন</button>
            </li>
        `;
    });
}

function deleteReminder(id) {
    reminders = reminders.filter(item => item.id !== id);
    localStorage.setItem('medicineReminders', JSON.stringify(reminders));
    displayReminders();
}

// প্রতি সেকেন্ডে সময় চেক করার ফাংশন
function startTimer() {
    setInterval(() => {
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ":" + 
                            now.getMinutes().toString().padStart(2, '0');

        reminders.forEach(item => {
            if (item.time === currentTime) {
                playAlarm(item.name);
            }
        });
    }, 60000); // প্রতি ১ মিনিটে একবার চেক করবে
}

function playAlarm(medName) {
    const alarm = document.getElementById('alarmSound');
    alarm.play();
    
    // ব্রাউজার নোটিফিকেশন বা অ্যালার্ট
    alert(`সময় হয়েছে! আপনার ঔষধ নিন: ${medName}`);
                              }
