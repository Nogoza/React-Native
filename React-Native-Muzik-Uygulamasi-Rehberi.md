# 🎵 React Native ile Müzik Uygulaması Yapımı — Başlangıç Rehberi

React Native öğrenmeye yeni başladıysanız, bu rehber tam size göre. Adım adım, sıfırdan bir müzik listesi uygulaması nasıl yapılır, tüm kavramları örneklerle açıklıyorum.

---

## 📁 Proje Yapısı

Öncelikle projemizin klasör yapısına bakalım:

```
MusicApp/
├── app/
│   └── (tabs)/
│       └── index.tsx       → Ana sayfa
├── components/
│   ├── SearchBar/          → Arama çubuğu bileşeni
│   └── SongCard/           → Şarkı kartı bileşeni
└── music-data.json         → Şarkı verileri
```

Expo Router kullandığımız için sayfalar `app` klasöründe, tekrar kullanılabilir parçalar ise `components` klasöründe yer alıyor.

---

## 📦 Veri Dosyası: music-data.json

Uygulamamızda göstereceğimiz şarkıların bilgilerini JSON formatında tutuyoruz:

```json
[
  {
    "id": "0",
    "title": "King Nothing",
    "artist": "Metallica",
    "album": "Load",
    "year": 1996,
    "isSoldOut": true,
    "imageUrl": "http://..."
  }
]
```

Her şarkı bir **nesne (object)**, tüm şarkılar bir **dizi (array)** içinde. Köşeli parantezler `[]` bunun bir dizi olduğunu gösterir.

---

## 🏠 Ana Sayfa: index.tsx

Bu dosya uygulamanın kalbi. Parça parça inceleyelim.

### Import'lar (Dışarıdan Getirmek)

```tsx
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import SearchBar from '../../components/SearchBar';
import SongCard from '../../components/SongCard';
import music_data from '../../music-data.json';
```

| Import | Ne İşe Yarar |
|--------|--------------|
| `React` | React kütüphanesi, bileşen oluşturmak için gerekli |
| `useState` | Değişken değerini tutmak ve değiştirmek için kullanılan Hook |
| `FlatList` | Uzun listeleri performanslı göstermek için |
| `SafeAreaView` | Çentikli telefonlarda içeriği güvenli alanda tutmak için |
| `StyleSheet` | CSS benzeri stil oluşturmak için |
| `View` | HTML'deki `<div>` gibi, kutu/konteyner görevi görür |

---

### Interface (TypeScript Tip Tanımı)

```tsx
interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  isSoldOut: boolean;
  imageUrl: string;
}
```

TypeScript'e "bir şarkı nesnesi şu özelliklere sahip olmalı" diyoruz. Bu sayede yanlış veri girersek hata alırız.

```tsx
// ✅ Doğru
const song: Song = { id: "1", title: "Test", year: 1996, ... }

// ❌ Hata verir (year number olmalı, string değil)
const song: Song = { id: "1", year: "1996", ... }
```

---

### useState Hook'u (Durum Yönetimi)

```tsx
const [list, setList] = useState(music_data);
```

Bu satır ne anlama geliyor?

| Parça | Açıklama |
|-------|----------|
| `list` | Mevcut değer (şarkı listesi) |
| `setList` | Değeri değiştiren fonksiyon |
| `useState(music_data)` | Başlangıç değeri olarak tüm şarkıları atıyoruz |

**Neden useState kullanıyoruz?**

Normal değişken kullansaydık:

```tsx
let list = music_data;  // ❌ Değişse bile ekran güncellenmez!
```

useState ile:

```tsx
setList(yeniListe);  // ✅ Değer değişir VE ekran otomatik güncellenir!
```

**Görsel olarak düşünelim:**

```
Başlangıç: list = [🎵, 🎵, 🎵, 🎵, 🎵]  (5 şarkı)
                    ↓
Arama: "Metal" yazıldı
                    ↓
setList çağrıldı: list = [🎵]  (sadece Metallica)
                    ↓
Ekran otomatik güncellendi! ✨
```

---

### Arama Fonksiyonu

```tsx
const handleSearch = (text: string) => {
  const filteredList = music_data.filter(song => {
    const searchedText = text.toLowerCase();
    const currentTitle = song.title.toLowerCase();
    const currentArtist = song.artist.toLowerCase();
    const currentAlbum = song.album.toLowerCase();
    
    return currentTitle.includes(searchedText) || 
           currentArtist.includes(searchedText) || 
           currentAlbum.includes(searchedText);
  });
  setList(filteredList);
};
```

**Adım adım ne oluyor?**

1. Kullanıcı "metal" yazdı
2. `filter()` her şarkıyı kontrol eder
3. "metallica".includes("metal") → TRUE ✅ → Bu şarkı listede kalır
4. "king crimson".includes("metal") → FALSE → Bu şarkı listeden çıkar
5. `setList(filteredList)` → Ekran güncellenir

**filter() nasıl çalışır?**

```tsx
const sayilar = [1, 2, 3, 4, 5];
const buyukSayilar = sayilar.filter(sayi => sayi > 3);
// Sonuç: [4, 5]
```

Filter, her eleman için fonksiyonu çalıştırır. `true` dönenler listede kalır, `false` dönenler çıkar.

---

### Return — Ekranda Görünen Kısım

```tsx
return (
  <SafeAreaView style={styles.container}>
    <SearchBar onSearch={handleSearch}/>
    <FlatList
      data={list}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderSong}
      ItemSeparatorComponent={renderSeparator}
    />
  </SafeAreaView>
);
```

**Ekranda şöyle görünür:**

```
┌─────────────────────────────┐
│      SafeAreaView           │
│  ┌───────────────────────┐  │
│  │    SearchBar 🔍       │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │   SongCard 1          │  │
│  ├───────────────────────┤  │
│  │   SongCard 2          │  │
│  ├───────────────────────┤  │
│  │   SongCard 3          │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**FlatList özellikleri:**

| Özellik | Açıklama |
|---------|----------|
| `data` | Gösterilecek veri |
| `keyExtractor` | Her öğe için benzersiz anahtar (performans için) |
| `renderItem` | Her öğeyi nasıl çizeceğini belirler |
| `ItemSeparatorComponent` | Öğeler arası ayırıcı |

---

## 🔍 SearchBar Bileşeni

```jsx
const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Ara' 
        onChangeText={props.onSearch} 
        style={styles.input} 
      />
    </View>
  );
};
```

**Props nedir?**

Props = Properties (Özellikler). Üst bileşenden alt bileşene veri geçirmek için kullanılır.

```
index.tsx'de:
<SearchBar onSearch={handleSearch}/>
         ↓
SearchBar.js'de:
props.onSearch = handleSearch fonksiyonu
```

**onChangeText nedir?**

TextInput'a her harf yazıldığında çalışan olay (event).

```
Kullanıcı yazdı: "m"   → onChangeText("m") çağrıldı
Kullanıcı yazdı: "me"  → onChangeText("me") çağrıldı
Kullanıcı yazdı: "met" → onChangeText("met") çağrıldı
```

---

## 🎴 SongCard Bileşeni

```jsx
const SongCard = (props) => {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={{uri: props.song.imageUrl}}
      />
      <View style={styles.inner_container}>
        <Text style={styles.title}>{props.song.title}</Text>
        <View style={styles.info_container}>
          <Text>{props.song.artist}</Text>
          <Text>{props.song.year}</Text>
        </View>
        
        {props.song.isSoldOut && (
          <View style={styles.soldout_container}>
            <Text>Sold Out</Text>
          </View>
        )}
      </View>
    </View>
  );
};
```

**Koşullu Render (Conditional Rendering):**

```jsx
{props.song.isSoldOut && (
  <Text>Sold Out</Text>
)}
```

Bu ne demek?

- EĞER `isSoldOut === true` İSE → "Sold Out" kutusunu göster
- DEĞİLSE → Hiçbir şey gösterme

**&& operatörü:**

```jsx
true && <Bileşen />   // → <Bileşen /> gösterilir
false && <Bileşen />  // → Hiçbir şey gösterilmez
```

---

## 🎨 Stiller (StyleSheet)

React Native'de CSS yerine JavaScript nesneleri kullanılır:

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000000',
  },
});
```

**CSS vs React Native farkları:**

| CSS | React Native |
|-----|--------------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `margin-top` | `marginTop` |
| `border-radius` | `borderRadius` |

**Flexbox Temelleri:**

```jsx
container: {
  flexDirection: 'row',     // Yatay dizilim
  flex: 1,                  // Tüm alanı kapla
  justifyContent: 'center', // Ana eksende ortala
  alignItems: 'center',     // Çapraz eksende ortala
}
```

- `flexDirection: 'column'` (varsayılan) → Elemanlar alt alta dizilir
- `flexDirection: 'row'` → Elemanlar yan yana dizilir

---

## 🔄 Veri Akışı Özeti

```
┌─────────────────────────────────────────────┐
│              index.tsx                       │
│                                              │
│  music_data                                  │
│       ↓                                      │
│  useState(music_data) → [list, setList]     │
│       ↓                                      │
│  SearchBar                                   │
│    └→ handleSearch → setList(filteredList)  │
│                           ↓                  │
│  FlatList (data={list})                      │
│    └→ SongCard                               │
│    └→ SongCard                               │
│    └→ SongCard                               │
└─────────────────────────────────────────────┘
```

---

## 💡 Önemli Kavramlar Özeti

| Kavram | Açıklama | Örnek |
|--------|----------|-------|
| **Component** | Yeniden kullanılabilir UI parçası | `<SearchBar />`, `<SongCard />` |
| **Props** | Üst bileşenden alt bileşene veri geçirme | `<SongCard song={item} />` |
| **State** | Değişebilen ve ekranı güncelleyen veri | `useState(music_data)` |
| **Hook** | React'ın özel fonksiyonları | `useState`, `useEffect` |
| **JSX** | JavaScript içinde HTML benzeri yazım | `<View><Text>Merhaba</Text></View>` |
| **StyleSheet** | React Native'de stil tanımlama | `StyleSheet.create({...})` |

---

## Sonuç

Bu rehberde React Native'in temel yapı taşlarını öğrendiniz:

- Component yapısı ve props ile veri geçirme
- useState ile state yönetimi
- FlatList ile liste gösterimi
- Koşullu render
- StyleSheet ile stillendirme

Artık kendi müzik uygulamanızı geliştirebilir, yeni özellikler ekleyebilirsiniz!
