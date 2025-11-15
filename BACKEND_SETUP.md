# Backend Integration Setup

## Configurare

### 1. Creează fișierul `.env` în rădăcina proiectului

```bash
# FastAPI Backend URL
VITE_API_URL=http://localhost:8000
```

### 2. Pornește server-ul FastAPI

Asigură-te că server-ul FastAPI rulează pe `http://localhost:8000` cu endpoint-urile:
- `POST /token` - Autentificare JWT
- `POST /create-article/` - Creare articol (necesită JWT)

### 3. Credențiale Admin

Folosește credențialele configurate în `.env` al backend-ului FastAPI:
- Username: valoarea din `ADMIN_USERNAME`
- Password: valoarea din `ADMIN_PASSWORD`

## Flow de Autentificare

1. **Login**: Utilizatorul se autentifică la `/login` cu username și password
2. **JWT Token**: Backend-ul returnează un JWT token care este stocat în `localStorage`
3. **API Calls**: Toate apelurile către `/create-article/` includ JWT token-ul în header-ul `Authorization: Bearer <token>`
4. **Logout**: Ștergerea token-ului din `localStorage`

## Creare Articol

Când creezi un articol din admin (`/admin/articles/new`), aplicația:

1. Trimite datele articolului către backend-ul FastAPI
2. Backend-ul verifică JWT token-ul
3. Generează HTML din template
4. Uploadează pe server via SFTP
5. Actualizează sitemap.xml
6. Trimite ping către Google pentru indexare
7. Returnează URL-ul articolului publicat

## Structura Date Trimise

```typescript
{
  title: string;        // Titlul articolului
  slug: string;         // URL-friendly slug
  category: string;     // Categoria (ex: "Noutăți Legislative")
  tags: string;         // Tag-uri separate prin virgulă
  extras: string;       // Excerpt/descriere scurtă
  cover_image: string;  // URL imagine cover
  content: string;      // Conținut HTML
}
```

## Verificare Token Expirat

Dacă primești eroare `401 Unauthorized`, aplicația:
- Șterge automat token-ul expirat
- Afișează mesaj de eroare
- Utilizatorul trebuie să se autentifice din nou

## Note Importante

- Token-ul JWT are o durată de viață configurată în backend (vezi `JWT_EXP_MINUTES`)
- Toate apelurile API sunt validate pe backend
- Articolele create local (în state) sunt sincronizate cu backend-ul
- În caz de eroare la upload, utilizatorul primește notificare prin toast
