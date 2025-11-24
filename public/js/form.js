const API_BASE = '/api';

function showForm(type) {
    document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
    document.getElementById(`${type}Form`).classList.add('active');
    hideAlert();
}

function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.className = `alert alert-${type} show`;
    alertBox.textContent = message;
    setTimeout(() => hideAlert(), 5000);
}

function hideAlert() {
    const alertBox = document.getElementById('alertBox');
    alertBox.classList.remove('show');
}

// Single Member Form
document.getElementById('singleMemberForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (key === 'baptism' || key === 'firstHolyCommunion' || key === 'confirmation') {
            data[key] = true;
        } else {
            data[key] = value;
        }
    }

    try {
        const response = await fetch(`${API_BASE}/register/single`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (result.success) {
            showAlert(result.message, 'success');
            e.target.reset();
        } else {
            showAlert('Error: ' + result.message, 'error');
        }
    } catch (error) {
        showAlert('Connection error. Please try again.', 'error');
    }
});

// Married Couple Form
document.getElementById('marriedCoupleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        spouse: {}
    };
    
    for (let [key, value] of formData.entries()) {
        if (key.startsWith('spouse.')) {
            const spouseKey = key.replace('spouse.', '');
            if (spouseKey === 'baptism' || spouseKey === 'holyCommunion' || 
                spouseKey === 'confirmation' || spouseKey === 'matrimony') {
                data.spouse[spouseKey] = true;
            } else {
                data.spouse[spouseKey] = value;
            }
        } else if (key === 'baptism' || key === 'firstHolyCommunion' || 
                   key === 'confirmation' || key === 'holyMatrimony') {
            data[key] = true;
        } else {
            data[key] = value;
        }
    }

    try {
        const response = await fetch(`${API_BASE}/register/married`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (result.success) {
            showAlert(result.message, 'success');
            e.target.reset();
        } else {
            showAlert('Error: ' + result.message, 'error');
        }
    } catch (error) {
        showAlert('Connection error. Please try again.', 'error');
    }
});

// Search Families
async function searchFamilies() {
    const query = document.getElementById('familySearchInput').value;
    
    if (!query) {
        showAlert('Please enter a name to search', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/families/search?query=${encodeURIComponent(query)}`);
        const result = await response.json();
        
        const familyList = document.getElementById('familyList');
        
        if (result.families && result.families.length > 0) {
            familyList.innerHTML = result.families.map(family => {
                const member = family.primaryMember;
                return `
                    <div class="family-item" onclick="selectFamily('${family._id}', '${member.fullName}')">
                        <strong>${member.fullName}</strong><br>
                        <small>Spouse: ${member.spouse?.fullName || 'Not specified'}</small><br>
                        <small>Address: ${member.address}</small>
                    </div>
                `;
            }).join('');
        } else {
            familyList.innerHTML = '<p style="padding:10px;">No families found. Please ensure your parents are registered first.</p>';
        }
    } catch (error) {
        showAlert('Error searching families', 'error');
    }
}

function selectFamily(familyId, familyName) {
    document.getElementById('selectedFamilyId').value = familyId;
    
    document.querySelectorAll('.family-item').forEach(item => item.classList.remove('selected'));
    event.target.closest('.family-item').classList.add('selected');
    
    showAlert(`Selected: ${familyName} Family`, 'success');
}

// Youth Member Form
document.getElementById('youthMemberForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const familyId = document.getElementById('selectedFamilyId').value;
    if (!familyId) {
        showAlert('Please select a family first', 'error');
        return;
    }

    const formData = new FormData(e.target);
    const data = { familyId };
    
    for (let [key, value] of formData.entries()) {
        if (key !== 'familyId') {
            if (key === 'baptism' || key === 'firstHolyCommunion' || 
                key === 'confirmation' || key === 'holyMatrimony') {
                data[key] = true;
            } else {
                data[key] = value;
            }
        }
    }

    try {
        const response = await fetch(`${API_BASE}/register/youth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (result.success) {
            showAlert(result.message, 'success');
            e.target.reset();
            document.getElementById('familyList').innerHTML = '';
        } else {
            showAlert('Error: ' + result.message, 'error');
        }
    } catch (error) {
        showAlert('Connection error. Please try again.', 'error');
    }
});