const postGrid = document.getElementById("postsGrid");
const featuredStory = document.getElementById("featuredStory");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const emptyState = document.getElementById("emptyState");
const announcementList = document.getElementById("announcementList");

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-PH", { year: "numeric", month: "long", day: "numeric" })
    .format(new Date(date + "T00:00:00"));

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

function renderFeatured(post) {
  if (!post) {
    featuredStory.innerHTML = "";
    featuredStory.style.display = "none";
    return;
  }
  featuredStory.style.display = "grid";
  featuredStory.innerHTML = `
    <div class="featured-visual">
      <span class="visual-label">${escapeHtml(post.label || post.category)}</span>
    </div>
    <div class="featured-body">
      <span class="badge">${escapeHtml(post.category)}</span>
      <h3>${escapeHtml(post.title)}</h3>
      <div class="meta">${formatDate(post.date)} • ${escapeHtml(post.author)}</div>
      <p>${escapeHtml(post.excerpt)}</p>
      <a class="read-more" href="post.html?id=${encodeURIComponent(post.id)}">Read full story →</a>
    </div>`;
}

function cardTemplate(post) {
  return `
    <article class="story-card">
      <a href="post.html?id=${encodeURIComponent(post.id)}" aria-label="Read ${escapeHtml(post.title)}">
        <div class="story-thumb">
          <span class="visual-label">${escapeHtml(post.label || post.category)}</span>
        </div>
      </a>
      <div class="story-body">
        <span class="badge">${escapeHtml(post.category)}</span>
        <h3><a href="post.html?id=${encodeURIComponent(post.id)}">${escapeHtml(post.title)}</a></h3>
        <div class="meta">${formatDate(post.date)}</div>
        <p>${escapeHtml(post.excerpt)}</p>
        <a class="read-more" href="post.html?id=${encodeURIComponent(post.id)}">Read story →</a>
      </div>
    </article>`;
}

function populateCategories() {
  const categories = [...new Set(POSTS.map(p => p.category))].sort();
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderPosts() {
  const q = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  const filtered = [...POSTS]
    .sort((a,b) => b.date.localeCompare(a.date))
    .filter(post => {
      const matchesCategory = category === "all" || post.category === category;
      const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.author}`.toLowerCase();
      return matchesCategory && haystack.includes(q);
    });

  const featured = q || category !== "all" ? null : filtered.find(p => p.featured);
  renderFeatured(featured);

  const gridPosts = featured ? filtered.filter(p => p.id !== featured.id) : filtered;
  postGrid.innerHTML = gridPosts.map(cardTemplate).join("");
  emptyState.hidden = filtered.length > 0;
}

function renderAnnouncements() {
  announcementList.innerHTML = ANNOUNCEMENTS.map(item => `
    <article class="announcement">
      <div class="announcement-date">${escapeHtml(item.date)}</div>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </div>
      <div class="announcement-tag">${escapeHtml(item.tag)}</div>
    </article>`).join("");
}

document.getElementById("year").textContent = new Date().getFullYear();
populateCategories();
renderPosts();
renderAnnouncements();

searchInput.addEventListener("input", renderPosts);
categoryFilter.addEventListener("change", renderPosts);

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
