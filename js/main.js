const translations = {
  ar: {
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    google: 'الدخول عبر Google',
    forgot: 'نسيت كلمة المرور؟'
  },
  en: {
    email: 'Email',
    password: 'Password',
    login: 'Login',
    google: 'Login with Google',
    forgot: 'Forgot password?'
  }
};

function switchLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const t = translations[lang];
  document.querySelector('label[for="email"]').textContent = t.email;
  document.querySelector('label[for="password"]').textContent = t.password;
  document.getElementById('btnLogin').textContent = t.login;
  document.getElementById('btnGoogle').textContent = t.google;
  document.querySelector('.text-center a').textContent = t.forgot;
}

// تعيين اللغة الافتراضية
switchLang('ar');

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => window.location.href = 'dashboard.html')
    .catch(err => alert('خطأ: ' + err.message));
});

// الدخول عبر Google
document.getElementById('btnGoogle').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => window.location.href = 'dashboard.html')
    .catch(err => alert('Google login failed: ' + err.message));
});
