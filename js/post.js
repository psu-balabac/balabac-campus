const params = new URLSearchParams(location.search);
const id = params.get("id");
const post = POSTS.find(item => item.id === id) || POSTS[0];

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-PH", { year: "numeric", month: "long", day: "numeric" })
    .format(new Date(date + "T00:00:00"));

document.title = `${post.title} | PalSU Balabac Campus`;
document.getElementById("articleHeader").innerHTML = `
  <span class="badge">${escapeHtml(post.category)}</span>
  <h1>${escapeHtml(post.title)}</h1>
  <p class="article-deck">${escapeHtml(post.deck || post.excerpt)}</p>
  <div class="meta">${formatDate(post.date)} • ${escapeHtml(post.author)}</div>
`;
document.getElementById("articleContent").innerHTML = post.content;

const related = POSTS
  .filter(item => item.id !== post.id)
  .sort((a,b) => b.date.localeCompare(a.date))
  .slice(0,4);

document.getElementById("relatedPosts").innerHTML = related.map(item => `
  <a class="related-link" href="post.html?id=${encodeURIComponent(item.id)}">
    ${escapeHtml(item.title)}
    <small>${formatDate(item.date)} • ${escapeHtml(item.category)}</small>
  </a>
`).join("");

document.getElementById("year").textContent = new Date().getFullYear();
