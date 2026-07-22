# Daylis: Supabase-ті толық қосу

## 1. SQL кестелерін жасау

Supabase → **SQL Editor** → **New query**.

`supabase-setup.sql` файлының ішіндегі кодтың бәрін көшіріп, **Run** басыңыз.

## 2. Қолданушыларды парольдерімен автоматты түрде жасау

Supabase → **Project Settings** → **API Keys** бөлімінен мыналарды алыңыз:

- Project URL
- `service_role` key немесе Secret key

`service_role` кілтін ешқашан GitHub/Vercel-ге салмаңыз.

Жоба папкасындағы `.env.admin.example` файлының көшірмесін жасап, атын `.env.admin` деп өзгертіңіз:

```env
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Терминалда жоба папкасын ашып:

```bash
npm install
npm run setup-users
```

Скрипт 9 аккаунтты парольдерімен автоматты түрде жасайды және `daylis_profiles` кестесіне байланыстырады. Қайта іске қоссаңыз, аккаунттарды қайталамайды — парольдерін жаңартады.

Орнату біткен соң қауіпсіздік үшін компьютерден мыналарды өшіріңіз:

- `.env.admin`
- `private-setup` папкасы

Олар `.gitignore` ішінде тұр, сондықтан GitHub-қа жүктелмейді.

## 3. Қосымшаның ашық кілттерін қосу

`.env.example` файлының көшірмесін жасап, атын `.env.local` деп өзгертіңіз:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

## 4. Тексеру

```bash
npm run dev
```

Браузерде профильді таңдап, сол профильдің паролімен кіріңіз.

## 5. GitHub және Vercel

GitHub-қа жоба файлдарын жүктеңіз. `.env.admin`, `.env.local` және `private-setup` автоматты түрде жүктелмейді.

Vercel → **Settings** → **Environment Variables**:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Содан кейін Redeploy жасаңыз.
