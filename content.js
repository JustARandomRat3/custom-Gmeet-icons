// Injects overlay and manages avatars on meeting pages

function getUserState(user) {
  // Placeholder: Replace with real logic to detect user state (talking/muted/idle)
  return 'talking';
}

async function getUsersWithIcons() {
  const data = await browser.storage.local.get('users');
  const users = data.users || {};
  return Object.entries(users)
    .filter(([_, v]) => v.talking && v.muted && v.idle)
    .map(([k, v]) => ({ name: k, ...v }));
}

function createOverlay() {
  let overlay = document.getElementById('meet-avatar-overlay');
  if (overlay) overlay.remove();
  overlay = document.createElement('div');
  overlay.id = 'meet-avatar-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '10px';
  overlay.style.right = '10px';
  overlay.style.zIndex = 999999;
  overlay.style.background = 'rgba(0,0,0,0.7)';
  overlay.style.padding = '10px';
  overlay.style.borderRadius = '8px';
  overlay.style.display = 'flex';
  overlay.style.gap = '10px';
  document.body.appendChild(overlay);
  return overlay;
}

async function updateOverlay() {
  const overlay = createOverlay();
  overlay.innerHTML = '';
  const users = await getUsersWithIcons();
  users.forEach(user => {
    const state = getUserState(user.name); // Replace with real state
    const img = document.createElement('img');
    img.src = user[state] || '';
    img.alt = `${user.name} (${state})`;
    img.title = `${user.name} (${state})`;
    img.style.width = '48px';
    img.style.height = '48px';
    img.style.borderRadius = '50%';
    overlay.appendChild(img);
  });
}

// Listen for storage changes to update overlay
browser.storage.onChanged.addListener(updateOverlay);

// Initial overlay
updateOverlay();
