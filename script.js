// Channel Data
const channels = [
    { id: 1, name: 'الجزيرة', category: 'news', icon: 'fa-globe', desc: 'قناة إخبارية عربية رائدة' },
    { id: 2, name: 'العربية', category: 'news', icon: 'fa-newspaper', desc: 'أخبار على مدار الساعة' },
    { id: 3, name: 'بي إن سبورت', category: 'sports', icon: 'fa-futbol', desc: 'جميع الأحداث الرياضية' },
    { id: 4, name: 'MBC', category: 'entertainment', icon: 'fa-film', desc: 'ترفيه عربي متنوع' },
    { id: 5, name: 'سبيستون', category: 'kids', icon: 'fa-child', desc: 'قناة الأطفال المفضلة' },
    { id: 6, name: 'اقرأ', category: 'religious', icon: 'fa-quran', desc: 'برامج دينية وثقافية' },
    { id: 7, name: 'روتانا سينما', category: 'movies', icon: 'fa-video', desc: 'أحدث الأفلام العربية' },
    { id: 8, name: 'سكاي نيوز', category: 'news', icon: 'fa-broadcast-tower', desc: 'أخبار عاجلة ومباشرة' },
    { id: 9, name: 'أبو ظبي الرياضية', category: 'sports', icon: 'fa-basketball-ball', desc: 'دوريات وبطولات' },
    { id: 10, name: 'LBC', category: 'entertainment', icon: 'fa-music', desc: 'منوعات وبرامج' },
    { id: 11, name: 'كراميش', category: 'kids', icon: 'fa-baby', desc: 'محتوى تعليمي للأطفال' },
    { id: 12, name: 'القرآن الكريم', category: 'religious', icon: 'fa-book-quran', desc: 'بث مباشر للقرآن' },
];

let currentCategory = 'all';

// Render Channels
function renderChannels(category = 'all', searchTerm = '') {
    const grid = document.getElementById('channelsGrid');
    let filteredChannels = channels;

    if (category !== 'all') {
        filteredChannels = channels.filter(ch => ch.category === category);
    }

    if (searchTerm) {
        filteredChannels = filteredChannels.filter(ch => 
            ch.name.includes(searchTerm) || ch.desc.includes(searchTerm)
        );
    }

    grid.innerHTML = filteredChannels.map(channel => `
        <div class="channel-card" data-id="${channel.id}">
            <div class="channel-image">
                <i class="fas ${channel.icon}"></i>
                <div class="live-badge">مباشر</div>
            </div>
            <div class="channel-info">
                <h3 class="channel-name">${channel.name}</h3>
                <p class="channel-category">${getCategoryName(channel.category)}</p>
                <div class="channel-actions">
                    <button class="btn btn-watch" onclick="playChannel(${channel.id})">
                        <i class="fas fa-play"></i>
                        مشاهدة
                    </button>
                    <button class="btn btn-favorite" onclick="toggleFavorite(${channel.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        news: 'أخبار',
        sports: 'رياضة',
        entertainment: 'ترفيه',
        kids: 'أطفال',
        religious: 'دينية',
        movies: 'أفلام'
    };
    return names[category] || category;
}

// Category Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.category;
        renderChannels(currentCategory);
    });
});

// Search
document.getElementById('searchInput').addEventListener('input', function(e) {
    renderChannels(currentCategory, e.target.value);
});

// Play Channel
function playChannel(id) {
    const channel = channels.find(ch => ch.id === id);
    document.getElementById('playerChannelName').textContent = channel.name;
    document.getElementById('playerChannelDesc').textContent = channel.desc;
    document.getElementById('playerModal').classList.add('active');
}

// Close Modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('playerModal').classList.remove('active');
});

// Favorite
function toggleFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(id);
    
    if (index > -1) {
        favorites.splice(index, 1);
        alert('تمت إزالة القناة من المفضلة');
    } else {
        favorites.push(id);
        alert('تمت إضافة القناة إلى المفضلة');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Close modal on outside click
document.getElementById('playerModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// Initialize
renderChannels();
