const kelompok = "Kelompok 2 Hi-Class"
let anggota = {
    Azzahra: "2515061009",
    Awan: "2515061073",
    Raihan: "2515061039",
    Fadhil: "2515061041",
    Triza: "2515061099"
}

console.log(kelompok)
console.table(anggota)

document.getElementById('date').valueAsDate = new Date();

        let attendances = JSON.parse(localStorage.getItem('attendances')) || [];

        const radioOptions = document.querySelectorAll('.radio-option');
        radioOptions.forEach(option => {
            option.addEventListener('click', function() {
                radioOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                this.querySelector('input[type="radio"]').checked = true;
            });
        });

        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }


        function formatDate(dateString) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', options);
        }


        function capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        function renderAttendances() {
            const listContainer = document.getElementById('attendanceList');
            
            if (attendances.length === 0) {
                listContainer.innerHTML = '<div class="empty-state">Belum ada data presensi</div>';
                return;
            }

            listContainer.innerHTML = attendances.map(attendance => `
                <div class="attendance-item">
                    <div class="attendance-content">
                        <div class="attendance-details">
                            <div class="attendance-info name">
                                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                <span>${attendance.name}</span>
                            </div>
                            <div class="attendance-info">
                                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                                </svg>
                                <span>NPM: ${attendance.npm}</span>
                            </div>
                            <div class="attendance-info">
                                <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <span>${formatDate(attendance.date)}</span>
                            </div>
                        </div>
                        <div>
                            <span class="status-badge ${attendance.status}">
                                ${capitalizeFirst(attendance.status)}
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        document.getElementById('attendanceForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const npm = document.getElementById('npm').value.trim();
            const date = document.getElementById('date').value;
            const status = document.querySelector('input[name="status"]:checked').value;

            if (!name) {
                showToast('Nama tidak boleh kosong', 'error');
                return;
            }

            if (!npm) {
                showToast('NPM tidak boleh kosong', 'error');
                return;
            }

            const newAttendance = {
                id: Date.now().toString(),
                name: name,
                npm: npm,
                date: date,
                status: status,
                timestamp: Date.now()
            };

            attendances.unshift(newAttendance);

            localStorage.setItem('attendances', JSON.stringify(attendances));

            document.getElementById('name').value = '';
            document.getElementById('npm').value = '';
            document.getElementById('date').valueAsDate = new Date();
            document.getElementById('hadir').checked = true;
            radioOptions.forEach(opt => opt.classList.remove('active'));
            radioOptions[0].classList.add('active');


            showToast('Presensi berhasil dicatat!');


            renderAttendances();
        });


        renderAttendances();