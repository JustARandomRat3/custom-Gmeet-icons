// Handles popup logic for user list and icon uploads

const userListDiv = document.getElementById('user-list');
const userFormDiv = document.getElementById('user-form');
const userFormTitle = document.getElementById('user-form-title');
const talkingInput = document.getElementById('talking-icon');
const mutedInput = document.getElementById('muted-icon');
const idleInput = document.getElementById('idle-icon');
const saveBtn = document.getElementById('save-icons');
const cancelBtn = document.getElementById('cancel-icons');

let users = {};
let currentUser = null;

function renderUserList() {
  userListDiv.innerHTML = '';
  Object.keys(users).forEach(user => {
    const u = users[user];
    const hasAll = u.talking && u.muted && u.idle;
    const div = document.createElement('div');
    div.innerHTML = `<b>${user}</b> ${hasAll ? '✅' : '❌'} <button data-user="${user}">Edit</button>`;
    userListDiv.appendChild(div);
  });
}

function showUserForm(user) {
  currentUser = user;
  userFormTitle.textContent = `Set icons for ${user}`;
  userFormDiv.style.display = 'block';
}

function hideUserForm() {
  userFormDiv.style.display = 'none';
  talkingInput.value = '';
  mutedInput.value = '';
  idleInput.value = '';
}

userListDiv.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    showUserForm(e.target.dataset.user);
  }
});

saveBtn.onclick = async () => {
  const talking = talkingInput.files[0];
  const muted = mutedInput.files[0];
  const idle = idleInput.files[0];
  const readFile = f => new Promise(res => { if (!f) return res(null); const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f); });
  const [talkingData, mutedData, idleData] = await Promise.all([
    readFile(talking), readFile(muted), readFile(idle)
  ]);
  users[currentUser] = users[currentUser] || {};
  if (talkingData) users[currentUser].talking = talkingData;
  if (mutedData) users[currentUser].muted = mutedData;
  if (idleData) users[currentUser].idle = idleData;
  await browser.storage.local.set({ users });
  renderUserList();
  hideUserForm();
};

cancelBtn.onclick = hideUserForm;

async function loadUsers() {
  const data = await browser.storage.local.get('users');
  users = data.users || {};
  renderUserList();
}

// Simulate getting users from the current meet (to be replaced by content script messaging)
function fakeUsers() {
  return ['Alice', 'Bob', 'Charlie'];
}

window.onload = async () => {
  await loadUsers();
  // For demo, add fake users if none exist
  if (Object.keys(users).length === 0) {
    fakeUsers().forEach(u => users[u] = {});
    await browser.storage.local.set({ users });
    renderUserList();
  }
};
