// Lang switch
let currentLang = localStorage.getItem('language') || 'uk';

function setLanguage(lang) {
  console.log('Setting language to:', lang);
  currentLang = lang;
  localStorage.setItem('language', lang);
  updateContent();
  
  document.querySelectorAll('.lang').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });
}

function updateContent() {
  console.log('Updating content for:', currentLang);
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    console.log('Translating key:', key);
    
    const keys = key.split('.');
    let translation = translations[currentLang];
    
    for (let k of keys) {
      translation = translation?.[k];
    }
    
    if (translation) {
      element.textContent = translation;
      console.log('Translated to:', translation);
    }
  });
}

document.addEventListener('DOMContentLoaded', updateContent);

// Footer
const reveals = document.querySelectorAll('.contact-reveal');

const isMobile = window.matchMedia(
  '(max-width: 768px), (hover: none)'
).matches;

if (isMobile) {
  reveals.forEach(reveal => {
    reveal.addEventListener('click', () => {
      const isActive = reveal.classList.contains('active');

      reveals.forEach(r => {
        r.classList.remove('active');
        r.querySelector('.info-text').style.maxWidth = '0';
        r.querySelector('.info-text').style.opacity = '0';
        r.querySelector('.info-text').style.marginLeft = '0';
        r.style.display = 'flex';
      });

      document.querySelectorAll('.footer-contacts > a').forEach(a => {
        a.style.display = 'flex';
      });

      if (!isActive) {
        reveal.classList.add('active');

        document.querySelectorAll('.footer-contacts > a').forEach(a => {
          a.style.display = 'none';
        });
        reveals.forEach(r => {
          if (r !== reveal) r.style.display = 'none';
        });

        const text = reveal.querySelector('.info-text');
        text.style.maxWidth = '70vw';
        text.style.opacity = '1';
        text.style.marginLeft = '0.5rem';
      }
    });
  });
}
