function safeCopyToClipboard(text, msg) {
  if (window.copyToClipboard) {
    window.copyToClipboard(text, msg);
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (window.showToast) window.showToast('✓ ' + (msg || 'Panoya kopyalandı!'));
    }).catch(() => fallbackExecCopy(text, msg));
  } else {
    fallbackExecCopy(text, msg);
  }
}
function fallbackExecCopy(text, msg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    if (window.showToast) window.showToast('✓ ' + (msg || 'Panoya kopyalandı!'));
  } catch(e) {
    if (window.showToast) window.showToast('Kopyalama başarısız');
  }
  document.body.removeChild(ta);
}

// Soru Bankası (Türkçe + Dünya Kültürü)
                        const TRIVIA_BANK = [
          { q: "Dünyanın en yüksek şelalesi olan Angel Şelalesi hangi ülkededir?", a: ["Venezuela", "Brezilya", "Kanada", "Güney Afrika"], c: 0, cat: "cografya", diff: "medium" },
          { q: "Türkiye'nin yüzölçümü bakımından en büyük gölü hangisidir?", a: ["Tuz Gölü", "Van Gölü", "Beyşehir Gölü", "İznik Gölü"], c: 1, cat: "cografya", diff: "easy" },
          { q: "Afrika kıtasının en yüksek noktası olan Kilimanjaro Dağı hangi ülkededir?", a: ["Kenya", "Tanzanya", "Etiyopya", "Uganda"], c: 1, cat: "cografya", diff: "medium" },
          { q: "Başkenti Ulan Batur olan Asya ülkesi hangisidir?", a: ["Kazakistan", "Moğolistan", "Özbekistan", "Kırgızistan"], c: 1, cat: "cografya", diff: "easy" },
          { q: "Dünyada toprakları iki kıtaya yayılan ve boğazlara sahip iki şehirden biri İstanbul iken, diğeri hangi ülkededir?", a: ["Mısır (Süveyş)", "Rusya (Magnitogorsk)", "Panama", "Cebelitarık"], c: 1, cat: "cografya", diff: "hard" },
          { q: "Tarihte bilinen ilk yazılı barış antlaşması hangisidir?", a: ["Kadeş Antlaşması", "Vestfalya Antlaşması", "Amiens Antlaşması", "Lozan Antlaşması"], c: 0, cat: "tarih", diff: "easy" },
          { q: "Osmanlı Devleti'nin ilk başkenti neresidir?", a: ["Bursa", "Söğüt", "Edirne", "İznik"], c: 1, cat: "tarih", diff: "easy" },
          { q: "Magna Carta (Büyük Sözleşme) hangi yıl imzalanmıştır?", a: ["1066", "1215", "1453", "1789"], c: 1, cat: "tarih", diff: "medium" },
          { q: "Antik Mısır'da inşa edilen Keops Piramidi dünyanın yedi harikasından hangisinin listesinde yer alır?", a: ["Klasik Yedi Harika", "Modern Yedi Harika", "Doğal Yedi Harika", "Hiçbiri"], c: 0, cat: "tarih", diff: "easy" },
          { q: "Rönesans hareketinin doğduğu kabul edilen İtalyan kenti hangisidir?", a: ["Roma", "Venedik", "Floransa", "Milano"], c: 2, cat: "tarih", diff: "medium" },
          { q: "Periyodik tabloda 'Au' simgesi ile gösterilen kimyasal element hangisidir?", a: ["Gümüş", "Altın", "Bakır", "Alüminyum"], c: 1, cat: "bilim", diff: "easy" },
          { q: "Güneş Sistemi'ndeki en büyük gezegen hangisidir?", a: ["Satürn", "Neptün", "Jüpiter", "Uranüs"], c: 2, cat: "bilim", diff: "easy" },
          { q: "İnsan vücudundaki en sert doku hangisidir?", a: ["Femur kemiği", "Diş minesi", "Kafatası kemiği", "Kıkırdak"], c: 1, cat: "bilim", diff: "medium" },
          { q: "Işığın boşluktaki hızı yaklaşık olarak saniyede kaç kilometredir?", a: ["150.000 km", "300.000 km", "500.000 km", "1.000.000 km"], c: 1, cat: "bilim", diff: "easy" },
          { q: "DNA'nın çift sarmal yapısını 1953 yılında keşfeden bilim insanları kimlerdir?", a: ["Watson & Crick", "Newton & Leibniz", "Pasteur & Koch", "Curie & Rutherford"], c: 0, cat: "bilim", diff: "medium" },
          { q: "2015 yılında DNA onarım mekanizmaları üzerine yaptığı çığır açan keşiflerle Nobel Kimya Ödülü'nü kazanan Türk bilim insanı kimdir?", a: ["Cahit Arf", "Aziz Sancar", "Gazi Yaşargil", "Oktay Sinanoğlu"], c: 1, cat: "bilim", diff: "easy" },
          { q: "Hem Fizik (1903) hem de Kimya (1911) alanında iki farklı bilim dalında Nobel kazanan ilk ve tek kadın bilim insanı kimdir?", a: ["Rosalind Franklin", "Marie Curie", "Lise Meitner", "Ada Lovelace"], c: 1, cat: "bilim", diff: "easy" },
          { q: "Albert Einstein 1921 Nobel Fizik Ödülü'nü özellikle hangi teorik çalışması ve keşfi nedeniyle almıştır?", a: ["Genel Görelilik", "Fotoelektrik Etki Yasası", "Brown Hareketi", "Kütle-Enerji Eşdeğerliği (E=mc²)"], c: 1, cat: "bilim", diff: "medium" },
          { q: "Ünlü 'Yıldızlı Gece' (The Starry Night) tablosu hangi ressama aittir?", a: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"], c: 1, cat: "sanat", diff: "easy" },
          { q: "Sinema tarihinde 'Baba' (The Godfather) üçlemesinin yönetmeni kimdir?", a: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Stanley Kubrick"], c: 1, cat: "sanat", diff: "easy" },
          { q: "İstiklal Marşı'mızın bestecisi kimdir?", a: ["Mehmet Âkif Ersoy", "Osman Zeki Üngör", "İsmail Dede Efendi", "Münir Nurettin Selçuk"], c: 1, cat: "sanat", diff: "medium" },
          { q: "'Suç ve Ceza' romanının yazarı kimdir?", a: ["Lev Tolstoy", "Fyodor Dostoyevski", "Anton Çehov", "Maksim Gorki"], c: 1, cat: "sanat", diff: "easy" },
          { q: "2006 yılında Nobel Edebiyat Ödülü'nü kazanarak Türkiye'ye edebiyat alanında ilk Nobel'i getiren yazarımız kimdir?", a: ["Yaşar Kemal", "Orhan Pamuk", "Ahmet Hamdi Tanpınar", "Oğuz Atay"], c: 1, cat: "sanat", diff: "easy" },
          { q: "Bu ülkelerden hangisi Polonya ile sınır komşusudur?", a: ["Norveç", "Litvanya", "Fransa", "Hollanda"], c: 1, cat: "cografya", diff: "medium" },
          { q: "Gatun Gölü ve Panama Kanalı'nı oluşturmak için hangi nehir barajlandı?", a: ["Chagres Nehri", "Tuira Nehri", "Chepo Nehri", "Chucunaque Nehri"], c: 0, cat: "cografya", diff: "hard" },
          { q: "“Sonora Çölü” nerededir?", a: ["Asya", "Güney Amerika", "Afrika", "Kuzey Amerika"], c: 3, cat: "cografya", diff: "medium" },
          { q: "Kaç ülke Rusya ile kara sınırını paylaşıyor? (Tartışmalı bölgeler hariç)", a: ["14", "12", "10", "8"], c: 0, cat: "cografya", diff: "hard" },
          { q: "Dağlık Hayber Geçidi aşağıdaki iki ülkeden hangisini birbirine bağlar?", a: ["Pakistan ve Hindistan", "Hindistan ve Nepal", "Tacikistan ve Kırgızistan", "Afganistan ve Pakistan"], c: 3, cat: "cografya", diff: "hard" },
          { q: "Kaç ülke Lüksemburg ile kara sınırını paylaşıyor?", a: ["2", "4", "5", "3"], c: 3, cat: "cografya", diff: "medium" },
          { q: "Dünyada dört dik açısı olmayan tek bayraklı ülke hangisidir?", a: ["Mısır", "Angola", "Panama", "Nepal"], c: 3, cat: "cografya", diff: "medium" },
          { q: "Rusya'da kaç saat dilimi vardır?", a: ["5", "2", "8", "11"], c: 3, cat: "cografya", diff: "medium" },
          { q: "Haarlem şehri nerededir?", a: ["Amerika Birleşik Devletleri", "İsviçre", "The Netherlands (Hollanda)", "Almanya"], c: 2, cat: "cografya", diff: "hard" },
          { q: "İspanya ve Portekiz'i içeren yarımadanın adı nedir?", a: ["Avrupa Yarımadası", "İber Yarımadası", "Peloponez Yarımadası", "İskandinav Yarımadası"], c: 1, cat: "cografya", diff: "easy" },
          { q: "Gotland ülkesi hangi Avrupa ülkesinde yer almaktadır?", a: ["Almanya", "İsveç", "Norveç", "Danimarka"], c: 1, cat: "cografya", diff: "medium" },
          { q: "Hindistan'ın başkenti neresidir?", a: ["Yeni Delhi", "Mumbai", "Pekin", "Montreal"], c: 0, cat: "cografya", diff: "easy" },
          { q: "Alana göre en büyük beşinci ülke hangisidir?", a: ["Amerika Birleşik Devletleri", "Hindistan", "Brezilya", "Avustralya"], c: 2, cat: "cografya", diff: "medium" },
          { q: "Romanya'nın başkenti neresidir?", a: ["Belgrad", "Budapeşte", "Bratislava", "Bükreş"], c: 3, cat: "cografya", diff: "easy" },
          { q: "Estonya'nın başkenti neresidir?", a: ["Tallinn", "Helsinki", "Tartu", "Riga"], c: 0, cat: "cografya", diff: "medium" },
          { q: "Aşağıdakilerden hangisi Avrupa'nın en uzun nehridir?", a: ["Tuna", "Volga Nehri", "Dinyeper", "Ural"], c: 1, cat: "cografya", diff: "medium" },
          { q: "Avustralya'da kaç eyalet vardır?", a: ["7", "6", "5", "8"], c: 1, cat: "cografya", diff: "medium" },
          { q: "Aşağıdaki karayla çevrili ülkelerden hangisi tamamen başka bir ülkede bulunmaktadır?", a: ["Lesoto", "Burkina Faso", "Lüksemburg", "Mongolya"], c: 0, cat: "cografya", diff: "hard" },
          { q: "Timbuktu nerede?", a: ["Azerbaycan, Asya", "Moritanya, Afrika", "Mali / Afrika", "Bangladeş, Asya"], c: 2, cat: "cografya", diff: "hard" },
          { q: "Aşağıdaki Arap ülkelerinden hangisinde sadece Pan - Arap renklerini içeren bir bayrak yoktur?", a: ["Katar", "Birleşik Arap Emirlikleri", "Ürdün", "Kuveyt"], c: 0, cat: "cografya", diff: "easy" },
          { q: "Mısır Sfenksinin gövdesi hangi hayvana dayanıyordu?", a: ["Aslan", "At", "Boğa", "Köpek"], c: 0, cat: "cografya", diff: "easy" },
          { q: "Çin'in kaç saat dilimi var?", a: ["2", "1", "3", "4"], c: 1, cat: "cografya", diff: "easy" },
          { q: "Aşağıdakilerden hangisi bir kaledir?", a: ["Olivia Castle", "Elizabeth Castle", "Frank Castle", "Richard Castle"], c: 1, cat: "cografya", diff: "hard" },
          { q: "Japon bayrağındaki daire ne renk?", a: ["Sarı", "Siyah", "Beyaz", "Kırmızı"], c: 3, cat: "cografya", diff: "easy" },
          { q: "Hangi Van Gogh resmi Fransa'nın güneyindeki Saint - Rémy - de - Provence'deki tımarhanesinden manzarayı tasvir ediyor?", a: ["Yıldızlı Gece", "Auvers'deki Kilise", "Kargalı Buğday Tarlaları", "Batan Güneşli Çim Biçme Makinesi"], c: 0, cat: "sanat", diff: "easy" },
          { q: "Sürrealist ressam Salvador Dali hangi millettendi?", a: ["Fransızca", "İtalyanca", "Portekizce", "İspanyolca"], c: 3, cat: "sanat", diff: "medium" },
          { q: "Japonların kağıdı dekoratif şekillere ve figürlere katlama sanatının adı nedir?", a: ["Haiku", "Sumi - e", "Ukiyo - e", "Origami"], c: 3, cat: "sanat", diff: "easy" },
          { q: "\"Filleri Yansıtan Kuğular \",\" Uyku \"ve\" Hafızanın Kalıcılığı \"nı kim boyadı?", a: ["Jackson Pollock", "Edgar Degas", "Salvador Dali", "Vincent van Gogh"], c: 2, cat: "sanat", diff: "easy" },
          { q: "Dünyanın bilinen en eski kurgu eseri nedir?", a: ["rosetta taşı", "Gılgamış Destanı.", "Hammurabi Kanunu", "Ani Papirüsü"], c: 1, cat: "sanat", diff: "easy" },
          { q: "\"Çığlık\" ı kim çizdi?", a: ["Henri Matisse, 1942", "Pablo Picasso", "Vincent Van Gogh", "Edvard Munch"], c: 3, cat: "sanat", diff: "medium" },
          { q: "Mona Lisa kaç yılında tamamlanmıştır?", a: ["1504", "1487", "1523", "1511"], c: 0, cat: "sanat", diff: "hard" },
          { q: "Hangi sanatçı kulağını kesmesiyle ünlüdür?", a: ["Vincent van Gogh", "rembrandt", "Michelangelo", "Salvador Dali"], c: 0, cat: "sanat", diff: "easy" },
          { q: "Norveçli ressam Edvard Munch'un \"Çığlık\" ın kaç tane boya ve pastel versiyonunu ürettiğine inanılıyor?", a: ["2", "1", "3", "4"], c: 3, cat: "sanat", diff: "hard" },
          { q: "Hangi sanatçının stili resim oluşturmak için küçük farklı renkli noktalar kullanmaktı?", a: ["Henri Rousseau", "Georges Seurat", "Cézanne", "Vincent Van Gogh"], c: 1, cat: "sanat", diff: "medium" },
          { q: "Hangi zaman imzası genellikle \"Kesme Süresi\" olarak bilinir?", a: ["6/8", "3/4", "4/4", "2/2"], c: 3, cat: "sanat", diff: "medium" },
          { q: "Ünlü sanatçı Van Gogh hangi millete mensuptu?", a: ["Fransızca", "Flemenkçe", "Rusça", "Polonyaca"], c: 1, cat: "sanat", diff: "hard" },
          { q: "Vincent van Gogh'un \"Yıldızlı Gece\" tablosu hangi sanat akımının bir parçasıydı?", a: ["Romantizm", "Post - Empresyonizm", "İzlenimcilik", "Neoklasik"], c: 1, cat: "sanat", diff: "hard" },
          { q: "15. yüzyılın sonlarında 'Son Akşam Yemeği' duvar resmini hangi sanatçı yaptı?", a: ["Piero della Francesca", "Paolo Uccello", "Leonardo da Vinci", "Luca Pacioli"], c: 2, cat: "sanat", diff: "easy" },
          { q: "Paul Gauguin 1895 'te hangi ülkeye taşındı?", a: ["Atuona", "Litvanya", "Fransa", "Tahiti"], c: 3, cat: "sanat", diff: "hard" },
          { q: "Johannes Vermeer bu resimlerden hangilerini çizmedi?", a: ["Sütçü Kız", "Bacchus", "İnci Küpeli Kız", "Dantelci"], c: 1, cat: "sanat", diff: "medium" },
          { q: "Sistine Şapeli'ni kim boyadı?", a: ["Leonardo da Vinci", "Michelangelo", "Raffaello Santi", "Pablo Picasso"], c: 1, cat: "sanat", diff: "easy" },
          { q: "Siyah ve beyazın karıştırılmasıyla hangi renk üretilir?", a: ["Siyah", "Gri", "Brown", "Beyaz"], c: 1, cat: "sanat", diff: "easy" },
          { q: "Marcel Duchamp'ın hazır ürünleri nelerdi?", a: ["çizgi ve şeklin aksine renk ve ışığa odaklanan bir seri", "zar zor görülebilen ana hatlı bir kareye sahip resimler", "sanat statüsüne yükseltilmiş faydacı nesneler", "duvardan çıkıntı yapan bir grup özdeş çelik kutu"], c: 2, cat: "sanat", diff: "medium" },
          { q: "Hangi resim Vincent Van Gogh tarafından yapılmamıştır?", a: ["Gece Kafe Teras", "Yıldızlı Gece", "Dokuzuncu Dalga", "Arles'daki Yatak Odası"], c: 2, cat: "sanat", diff: "easy" },
          { q: "Mona Lisa'yı kim boyadı?", a: ["Pablo Picasso", "Leonardo da Vinci", "Michelangelo", "Vincent van Gogh"], c: 1, cat: "sanat", diff: "easy" },
          { q: "La Gioconda / La Joconde'nin diğer adı nedir?", a: ["Ayçiçeği", "Yıldızlı Gece", "Mona Lisa", "İnci Küpeli Kız"], c: 2, cat: "sanat", diff: "easy" },
          { q: "Albrecht Dürer'in doğum yeri ve ölüm yeri...", a: ["Berlin", "Augsburg", "BambergCity in Germany", "Nuremberg"], c: 3, cat: "sanat", diff: "hard" },
          { q: "Yıldızlı Gece'yi kim boyadı?", a: ["Vincent van Gogh", "Leonardo da Vinci", "Michelangelo", "Pablo Picasso"], c: 0, cat: "sanat", diff: "easy" },
          { q: "Hangi sanatçının stüdyosu 'Fabrika' olarak biliniyordu?", a: ["Peter Blake", "Roy Lichtenstein", "Andy Warhol", "David Hockney"], c: 2, cat: "sanat", diff: "medium" },
          { q: "Albrecht Dürer \"Genç Tavşan\" tablosunu hangi yıl yarattı?", a: ["1702", "1502", "1402", "1602"], c: 1, cat: "sanat", diff: "hard" },
          { q: "Bu bayramlardan hangisi genellikle Aralık ayında kutlanmaz?", a: ["Kwanzaa", "Hanukkah", "Şükran Günü", "Yılbaşı"], c: 2, cat: "genel", diff: "easy" },
          { q: "Bayrağında Union Jack olan ülke hangisidir?", a: ["Hong Kong", "Kanada", "Güney Afrika", "Yeni Zelanda"], c: 3, cat: "genel", diff: "easy" },
          { q: "Bu anatomik terimlerden hangisi yaratığın kuyruk ucunu ifade eder?", a: ["Koronal", "Kaudal", "Proksimal", "ventral"], c: 1, cat: "genel", diff: "hard" },
          { q: "İskoçya'nın Glasgow kentinden hangi nehir akar?", a: ["At yavrusu", "Tüvit", "Dee …", "Clyde"], c: 3, cat: "genel", diff: "medium" },
          { q: "Gouda peyniri hangi Avrupa ülkesinden?", a: ["Almanya", "Belçika", "The Netherlands (Hollanda)", "Fransa"], c: 2, cat: "genel", diff: "easy" },
          { q: "1998 'de Nova Scotia açıklarında düşen uçağın sahibi hangi havayolu şirketiydi?", a: ["TWA", "Swiss Air", "Air France", "İngiliz Havayolları"], c: 1, cat: "genel", diff: "easy" },
          { q: "Ananas bitkisi nereden geldi?", a: ["Güney Amerika", "Hawaii", "Avrupa", "Asya"], c: 0, cat: "genel", diff: "medium" },
          { q: "Macar profesör Ernő Rubik'in icat ettiği oyuncağın şekli nedir?", a: ["Piramit", "Küp", "Silindir", "Küre"], c: 1, cat: "genel", diff: "easy" },
          { q: "Avustralya'nın en yüksek dağı hangisidir?", a: ["Kosciuszko Dağı, Yeni Güney Galler", "Bartle Frere Dağı, Queensland", "Ossa Dağı, Tazmanya", "Zeil Dağı, Kuzey Bölgesi"], c: 0, cat: "genel", diff: "medium" },
          { q: "Aşağıdaki kelimelerden hangisi yasa dışı olarak yapılan, dağıtılan veya satılan bir şeyi ifade eder?", a: ["Bootstrap", "Ayakkabı boyacılığı", "Bootlace", "Bootleg"], c: 3, cat: "genel", diff: "easy" },
          { q: "Meksika'nın ilk Cumhurbaşkanı kimdi?", a: ["Benito Juárez", "Miguel Hidalgo Y Costilla", "Guadalupe Victoria", "Vicente Guerrero"], c: 2, cat: "genel", diff: "easy" },
          { q: "Pekmezden hangi alkollü içecek yapılır?", a: ["Votka", "viski", "Rom", "Cin"], c: 2, cat: "genel", diff: "easy" },
          { q: "Polonya'nın Lehçe adı nedir?", a: ["Póland", "Pupcia", "Polszka", "Polonya"], c: 3, cat: "genel", diff: "easy" },
          { q: "Başlangıçta haşhaş için başka bir kelime olan coquelicot, neyin gölgesidir?", a: ["Yeşil", "Kırmızı", "Mavi", "Pembe"], c: 1, cat: "genel", diff: "hard" },
          { q: "Laos'ta para birimi nedir?", a: ["Belarus rublesi (eski)", "Kip", "Dollar", "Konra"], c: 1, cat: "genel", diff: "medium" },
          { q: "Beş dolar kaç kuruş eder?", a: ["69", "100", "25", "50"], c: 1, cat: "genel", diff: "easy" },
          { q: "\"Kış\" kelimesinin Rusça karşılığı nedir?", a: ["Zima", "Leto", "Osen'", "Vesna"], c: 0, cat: "genel", diff: "medium" },
          { q: "Aşağıdaki kart oyunlarından hangisi sayılar ve temel matematik etrafında döner?", a: ["Balık tutmaya git", "Munchkin:", "Uno", "Twister"], c: 2, cat: "genel", diff: "easy" },
          { q: "Orijinal Roma alfabesinde aşağıdaki harfler YOKTU:", a: ["W", "J", "ME", "X"], c: 3, cat: "tarih", diff: "easy" },
          { q: "O, Kanada ne zaman resmi olarak milli marş oldu?", a: ["1980", "1880", "1950", "1920"], c: 0, cat: "tarih", diff: "medium" },
          { q: "VIII. Henry altı karısından hangisiyle en uzun süre evli kaldı?", a: ["Jane Seymour", "Aragonlu Catherine", "Catherine Parr", "Anne Boleyn"], c: 1, cat: "tarih", diff: "medium" },
          { q: "Sosyalizm fikri kim tarafından dile getirildi ve geliştirildi?", a: ["JOSEPH STALİN", "Karl Marx", "Lenin", "Vladimir Putin"], c: 1, cat: "tarih", diff: "easy" },
          { q: "1939 'da İngiltere ve Fransa, hangi ülkeyi işgal ettikten sonra Almanya'ya savaş ilan etti?", a: ["Macaristan", "Çekoslovakya", "Polonya", "Avusturya"], c: 2, cat: "tarih", diff: "easy" },
          { q: "14 Nisan 1912 'de bir buzdağına çarptığında RMS Titanik'ten sadece birkaç mil uzakta olan geminin adı nedir?", a: ["Cristol", "Kaliforniya", "Ticaret", "Carpathia"], c: 1, cat: "tarih", diff: "medium" },
          { q: "I. Dünya Savaşı'nda Almanya, Avusturya - Macaristan, Osmanlı İmparatorluğu ve Bulgaristan ittifakının adı neydi?", a: ["İttifak Devletleri", "Eksen Güçleri", "İmparatorluklar Federasyonu", "Otoriter İttifak"], c: 0, cat: "tarih", diff: "medium" },
          { q: "Aşağıdaki keskin nişancılardan hangisi doğrulanmış en yüksek öldürme sayısına sahiptir?", a: ["Craig Harrison", "Simo Häyhä", "Vasily Zaytsev", "Chris Kyle."], c: 1, cat: "tarih", diff: "medium" },
          { q: "1666 Büyük Londra Yangını hangi sokakta başladı?", a: ["44 Baker Street", "St Paul Katedrali", "Puding Yolu", "Meclis Evleri"], c: 2, cat: "tarih", diff: "easy" },
          { q: "Titanik'in toplam uzunluğu neydi?", a: ["882 ft | 268,8 m", "759 ft | 231,3 m", "1.042 ft | 317,6 m", "825 ft | 251,5 m"], c: 0, cat: "tarih", diff: "medium" },
          { q: "Hangi mikro devletin hala yürürlükte olan en eski anayasaya sahip olduğu düşünülmektedir?", a: ["Saint Kitts ve Nevis", "Monako", "Andorra", "San Marino"], c: 3, cat: "tarih", diff: "hard" },
          { q: "II. Dünya Savaşı sırasında Varşova Ayaklanması ne kadar sürdü?", a: ["63 Gün", "20 Gün", "55 gün", "224 Gün Vadeli"], c: 0, cat: "tarih", diff: "hard" },
          { q: "Britanya İmparatorluğu'nun sona erdiği yıl hangi yıl olarak kabul edilir?", a: ["1986", "1971", "1981", "1997"], c: 3, cat: "tarih", diff: "medium" },
          { q: "Arap Baharı, bu Arap uluslarından hangisinde başlayan bir dizi protesto ve isyandı?", a: ["Mısır", "Tunus", "Suriye", "Fas"], c: 1, cat: "tarih", diff: "hard" },
          { q: "En ölümcül pandemilerden biri olan \"İspanyol Gribi \", o zamanlar dünya nüfusunun yüzde kaçını öldürdü?", a: ["Yüzde 1'den az", "Yüzde 1 ila 3", "Yüzde 3 ila 6", "Yüzde 6 ila 10"], c: 2, cat: "tarih", diff: "medium" },
          { q: "Ayasofya, Bizans İmparatorluğu'nun hangi imparatoru tarafından yaptırılmıştır?", a: ["IV. Konstantin", "Arcadius", "I. Justinianus", "Büyük Theodosius"], c: 2, cat: "tarih", diff: "hard" },
          { q: "Büyük Kuzey Savaşı'nda İsveç'in lideri kimdi?", a: ["Büyük Petro", "XII. Charles", "Per Albin Hansson", "Gustavus Adolphus"], c: 1, cat: "tarih", diff: "medium" },
          { q: "Aşağıdaki yıllardan hangisi genellikle \"Yazsız Yıl\" olarak adlandırılır?", a: ["1823", "1813", "1808", "1816"], c: 3, cat: "tarih", diff: "medium" },
          { q: "Albert Einstein 1921 'de Nobel Ödülü'nü ne için kazandı?", a: ["Sıfır Noktası Enerjisi", "Dalga - Parçacık İkiliği", "Görelilik", "Fotoelektrik"], c: 3, cat: "tarih", diff: "hard" },
          { q: "1516 Marj Dabiq Muharebesi'nden sonra Osmanlı Devleti Kudüs'ün kontrolünü hangi saltanattan ele geçirdi?", a: ["Memlük", "Ümmet", "Eyyubi", "Selçuklu"], c: 0, cat: "tarih", diff: "hard" },
          { q: "Birinci Dünya Savaşı hangi yılda başladı?", a: ["1914", "1917", "1939", "1930"], c: 0, cat: "tarih", diff: "medium" },
          { q: "2014 yılında Hong Kong'daki “Şemsiye Devrimi” nin amacı neydi?", a: ["4. DAHA DÜŞÜK VERGİLER", "Hakiki genel oy hakkı", "İngiliz Kurallarına geri dön", "Bağımsızlığın Kazanılması"], c: 1, cat: "tarih", diff: "hard" },
          { q: "Hangi ABD Başkanı yüzen bir tavşanın \"saldırısına\" uğradı?", a: ["Gerald Ford", "Ronald Reagan", "Jimmy Carter", "Lydon B. Johnson"], c: 2, cat: "tarih", diff: "medium" },
          { q: "Kanada'nın ilk başkenti neresiydi?", a: ["Montreal", "Ottawa", "Kingston", "Toronto"], c: 2, cat: "tarih", diff: "hard" },
          { q: "Aşağıdakilerden hangisi pasif bir elektrikli bileşen DEĞİLDİR?", a: ["Transistör", "Kondansatör", "Direnç", "İndüktör"], c: 0, cat: "bilim", diff: "medium" },
          { q: "Hangi ülke ilk olarak 1979 'da çiftlikte taranmış ve yetiştirilmiş mavi yüzgeçli orkinos yetiştirmiştir?", a: ["Filipinler", "Fransa", "Japonya", "ABD"], c: 2, cat: "bilim", diff: "hard" },
          { q: "Plüton'un kaç ayı var?", a: ["Bir", "Dört", "Beş", "İki"], c: 2, cat: "bilim", diff: "easy" },
          { q: "Mesafe için standart SI birimi nedir?", a: ["Kulaç", "Metre", "Ayak", "Ångström"], c: 1, cat: "bilim", diff: "easy" },
          { q: "Periyodik tablodaki 72. element hangi Danimarka şehrinden sonra adlandırılmıştır?", a: ["OdenseCity in Fyn Denmark", "Kopenhag", "SkagenCity in Jylland Denmark", "HerningCity in Jylland Denmark"], c: 1, cat: "bilim", diff: "medium" },
          { q: "Glokom vücudun hangi bölümünü etkiler?", a: ["Kan", "Boğaz", "Mide", "Gözler"], c: 3, cat: "bilim", diff: "medium" },
          { q: "Bir ahtapotun kaç kalbi vardır?", a: ["Bir", "Dört", "Dört", "İki"], c: 1, cat: "bilim", diff: "medium" },
          { q: "Aşağıdaki metal elemanların tümü oda sıcaklığında veya oda sıcaklığına yakın sıvılardır:", a: ["Berilyum", "Sezyum", "Civa", "Galyum"], c: 0, cat: "bilim", diff: "medium" },
          { q: "Bu iki plakadan hangisi deprem ve tsunami oluşturmak için en iyi bilinir?", a: ["Dönüşüm Plakası Sınırları/Ayrışan Plaka Sınırları", "Yakınsak Plaka Sınırları/Okyanus Kabuğu", "Okyanus ve Kıta Kabuğu/Dönüşüm Plakası Sınırları", "Farklı Plaka Sınırları/Yakınsak/Okyanus Kabuğu"], c: 1, cat: "bilim", diff: "medium" },
          { q: "Şu anda en uzun operasyonel ömre sahip Landsat Uydusu hangisidir?", a: ["Landsat 5", "Landsat 6", "Landsat 7", "Landsat 8"], c: 0, cat: "bilim", diff: "hard" },
          { q: "Saffir - Simpson kasırga rüzgar ölçeğinde 2005 kasırgası, Katrina Kasırgası kategorisi neydi?", a: ["Kategori 4", "Kategori 5", "Kategori 1", "Kategori 2"], c: 1, cat: "bilim", diff: "medium" },
          { q: "Güneş Sistemi'nde kaç tane gezegen var?", a: ["9", "8", "11", "10"], c: 1, cat: "bilim", diff: "easy" },
          { q: "Hangi element en yüksek erime noktasına sahiptir?", a: ["Karbon", "Osmiyum", "Platinum", "Tungsten"], c: 0, cat: "bilim", diff: "easy" },
          { q: "Aşağıdaki sıvılardan hangisi en az viskozdur? Sıcaklığın 25°C olduğunu varsayalım.", a: ["Benzen", "Aseton", "Civa", "Su"], c: 1, cat: "bilim", diff: "hard" },
          { q: "Bir kırkayağın kaç bacağı olması biyolojik olarak imkansızdır?", a: ["50", "74", "26", "100"], c: 3, cat: "bilim", diff: "hard" },
          { q: "Medial duruma, tibial stres sendromuna (MTSS) hangi ortak isim verilir?", a: ["Ev Hizmetçisinin Dizleri", "Karpal Tünel", "Tenisçi Dirseği", "Shin Atelleri"], c: 3, cat: "bilim", diff: "hard" },
          { q: "Bir zamanlar fare zehiri olarak hangi ilaçlar yaygın olarak kullanılıyordu?", a: ["Aspirin", "COUMADİN", "Eliquis", "Advil ya da Tylenol?\""], c: 1, cat: "bilim", diff: "medium" },
          { q: "Doğal olarak oluşan uranyum öncelikle hangi izotoptan oluşur?", a: ["235", "233", "239", "238"], c: 3, cat: "bilim", diff: "easy" },
          { q: "Kalp atışı sesine ne sebep olur?", a: ["Kalp odalarının gevşemesi", "Kalp odalarının kasılması", "Kalpten çıkan kan", "Kalp kapakçıklarının kapanması"], c: 3, cat: "bilim", diff: "hard" },
          { q: "Hangisi bir nöron türü değildir?", a: ["Motor nöron", "Duyusal <g id=\"1\">nöron</g>", "Interneuron", "Algısal Nöron"], c: 3, cat: "bilim", diff: "hard" },
          { q: "Sigmund Freud ile en iyi ilişkilendirilen terim hangisidir?", a: ["Bilişsel-Davranışsal Tedavi", "Diyalektik Davranış Terapisi (DDT)", "Kütleçekim Teorisi", "Psikanaliz"], c: 3, cat: "bilim", diff: "medium" },
          { q: "Aşağıdakilerden hangisi adaptif bağışıklık sisteminin hücreleridir?", a: ["Dentritik hücreler", "• Doğal katil hücreleri", "beyaz kan hücreleri", "CD8+ Sitotoksik T Hücreler"], c: 3, cat: "bilim", diff: "hard" },
          { q: "Fizikte, enerjinin korunması ve momentumun korunması aşağıdakilerden hangisinin sonucudur?", a: ["NOETHER TEOREMİ", "Bell Teoremi", "Wick Teoremi", "Carnot Teoremi"], c: 0, cat: "bilim", diff: "hard" },
          { q: "Aşağıdakilerden hangisi yarı iletken amplifikatör cihazıdır?", a: ["diyot", "boru", "P - n kavşağı", "Transistör"], c: 3, cat: "bilim", diff: "hard" },
          { q: "Elektrik kapasitans birimi nedir?", a: ["Henry", "Gauss", "Watt", "farad"], c: 3, cat: "bilim", diff: "medium" },
          { q: "Şu anda insanoğlunun bildiği en büyük canlı organizma nedir?", a: ["Bal Mantarı", "Mercan resifi", "Kızılçam Ağacı", "Mavi balina"], c: 0, cat: "bilim", diff: "medium" },
          { q: "Güneş'in çekirdeği hangi sıcaklığa ulaşabilir?", a: ["938.000° F (521093,3° C)", "27° Milyon F (15° Milyon C)", "Mutlak Sıfır (Hem F hem de C)", "8° Milyar F (°4.4 Milyar C)"], c: 1, cat: "bilim", diff: "hard" },
          { q: "Ortalama yetişkin ağzının kaç dişi vardır (yirmi yaş dişleri hariç)?", a: ["36", "20", "28", "32"], c: 3, cat: "bilim", diff: "medium" },
          { q: "100 santigrat derece kaç Fahrenheit derecedir?", a: ["212", "451", "326", "100"], c: 0, cat: "bilim", diff: "medium" },
          { q: "Güneş sistemimizde yoğun atmosfere sahip tek uydu hangisidir?", a: ["Titan", "EuropaJupiter' s moon Ganymede", "Callisto", "Miranda"], c: 0, cat: "bilim", diff: "hard" },
          { q: "Kitabın kahramanı kim: \"Çavdar Tarlasında Çocuklar\" J.D. Salinger", a: ["Holden David", "Jerome David", "Holden Caulfield", "Jerome Caulfield"], c: 2, cat: "edebiyat", diff: "medium" },
          { q: "Arthur Conan Doyle'un ilk Sherlock Holmes kitabının adı nedir?", a: ["Raffles Haw'ın Yaptıkları", "Dörtlü'nün İşareti", "Bir Kimlik Örneği", "Kırmızı Bir Çalışma"], c: 3, cat: "edebiyat", diff: "easy" },
          { q: "Abel Magwitch, Charles Dickens'ın romanından bir karakter mi?", a: ["Nicholas Nickleby", "Pickwick Belgeleri", "Oliver Twist", "Büyük Umutlar"], c: 3, cat: "edebiyat", diff: "hard" },
          { q: "\"İki Şehrin Hikayesi\" ni kim yazdı?", a: ["Charles Darwin", "Roald Dahl", "Mark Twain", "Charles Dickens"], c: 3, cat: "edebiyat", diff: "easy" },
          { q: "Hangi klasik kitap \"Bana İsmail'i ara\" dizesiyle açılıyor?", a: ["Uğultulu Tepeler", "İki Şehrin Hikayesi", "Kaçırılma", "Moby Dick"], c: 3, cat: "edebiyat", diff: "easy" },
          { q: "Rudyard Kipling'in \"Orman Kitabı\" nda Kaa ne tür bir yılandı?", a: ["Engerek", "Anakonda", "Kobra", "Piton"], c: 3, cat: "edebiyat", diff: "medium" },
        ];
const ACHIEVEMENTS_DEF = [
          { id: 'first_win', name: '🎯 İlk Zafer', desc: 'İlk solo yarışmanı tamamla', xp: 50 },
          { id: 'quick_reflex', name: '⚡ Şimşek Refleks', desc: 'Bir soruyu 3 saniyeden kısa sürede doğru bil', xp: 100 },
          { id: 'perfect_streak', name: '🔥 Kusursuz Seri', desc: 'Tek oyunda 5 soruyu peş peşe doğru bil', xp: 100 },
          { id: 'sage_master', name: '👑 Büyük Bilge', desc: 'Toplam 1.000 XP puanına ulaş', xp: 200 },
          { id: 'explorer', name: '🌍 Kültür Elçisi', desc: 'En az 5 farklı oyun oyna', xp: 100 }
        ];

        // Kullanıcı Durumu
        let playerStats = {
          xp: 0,
          totalGames: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          answeredQuestions: 0,
          bestScore: 0,
          achievements: []
        };

        // Bu oyunun istatistikleri (her oyunda sıfırlanır)
        let gameStats = {
          correct: 0,
          wrong: 0,
          unanswered: 0
        };

        // Oyun Durumu
        let currentQuestions = [];
        let currentQuestionIdx = 0;
        let currentScore = 0;
        let currentStreak = 0;
        let timerInterval = null;
        let timeLeft = 15;
        let questionStartTime = 0;
        let isAnsweringBlocked = false;

        // 1. Sekme Değiştirme
        function switchArenaTab(tab) {
          document.querySelectorAll('.tab-arena-btn').forEach(btn => {
            btn.className = 'tab-arena-btn px-4 py-2 rounded-xl text-xs font-bold text-mistral-slate hover:text-mistral-ink transition flex items-center gap-2';
          });
          document.querySelectorAll('.arena-tab-content').forEach(c => c.classList.add('hidden'));

          const activeBtn = document.getElementById('tab-btn-' + tab);
          if (activeBtn) {
            activeBtn.className = 'tab-arena-btn px-4 py-2 rounded-xl text-xs font-bold bg-yellow-500 text-slate-950 transition flex items-center gap-2 shadow';
          }
          const activeContent = document.getElementById('tab-content-' + tab);
          if (activeContent) activeContent.classList.remove('hidden');

          if (tab === 'stats') renderStatsAndAchievements();
          if (tab === 'leaderboard') renderLeaderboard();
        }

        // 2. Ses Efektleri (Web Audio API)
        function playTone(freq, type, duration) {
          try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type || 'sine';
            osc.frequency.value = freq;
            osc.connect(gain);
            gain.connect(ctx.destination);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
            osc.start();
            osc.stop(ctx.currentTime + duration);
          } catch(e) {}
        }

        function playCorrectSound() {
          playTone(523.25, 'sine', 0.15); // C5
          setTimeout(() => playTone(659.25, 'sine', 0.25), 100); // E5
        }

        function playWrongSound() {
          playTone(220, 'sawtooth', 0.3); // A3
        }

        // 3. Solo Oyun Akışı
        function startSoloGame() {
          const cat = document.getElementById('solo-category').value;
          const diff = document.getElementById('solo-difficulty').value;

          // Kategori filtrele (orijinal indeks korunur -> anti-tekrar için)
          let pool = TRIVIA_BANK.map((q, i) => ({ q, idx: i }))
            .filter(({ q }) => (cat === 'all' || q.cat === cat));
          if (pool.length < 5) pool = TRIVIA_BANK.map((q, i) => ({ q, idx: i }));

          // Zorluk filtresi (yetersiz kalırsa aynı havuz kullanılır)
          if (diff !== 'all') {
            const byDiff = pool.filter(({ q }) => q.diff === diff);
            if (byDiff.length >= 5) pool = byDiff;
          }

          // Anti-tekrar: son görülen soruları havuzdan çıkar, taze havuz azaldıysa tamından
          const recent = getRecentAsked();
          const fresh = pool.filter(({ idx }) => !recent.has(idx));
          const source = fresh.length >= 5 ? fresh : pool;

          const picked = shuffleArray(source).slice(0, Math.min(10, source.length));
          markAsked(picked.map(x => x.idx));
          currentQuestions = picked.map(x => x.q);

          // Bu oyunun istatistiklerini sıfırla
          gameStats = { correct: 0, wrong: 0, unanswered: 0 };

          currentQuestionIdx = 0;
          currentScore = 0;
          currentStreak = 0;

          document.getElementById('solo-lobby').classList.add('hidden');
          document.getElementById('solo-results').classList.add('hidden');
          document.getElementById('solo-gameplay').classList.remove('hidden');

          renderQuestion();
        }

        // Fisher-Yates karıştırma (eşit dağılım)
        function shuffleArray(arr) {
          const a = [...arr];
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        }

        // Son sorulan soruların indeksleri (anti-tekrar)
        const RECENT_KEY = 'arena_recent_qs_v1';
        function getRecentAsked() {
          try {
            const s = localStorage.getItem(RECENT_KEY);
            return new Set(s ? JSON.parse(s) : []);
          } catch(e) { return new Set(); }
        }
        function markAsked(idxs) {
          try {
            const cur = Array.from(getRecentAsked());
            idxs.forEach(i => { if (!cur.includes(i)) cur.push(i); });
            const trimmed = cur.slice(-40); // en fazla 40 soru hatırlanır
            localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed));
          } catch(e) {}
        }

        function renderQuestion() {
          if (currentQuestionIdx >= currentQuestions.length) {
            finishGame();
            return;
          }

          const q = currentQuestions[currentQuestionIdx];
          isAnsweringBlocked = false;
          questionStartTime = Date.now();

          document.getElementById('game-cat-badge').innerText = q.cat.toUpperCase();
          document.getElementById('game-q-counter').innerText = `Soru ${currentQuestionIdx + 1}/${currentQuestions.length}`;
          document.getElementById('game-score-display').innerText = currentScore;
          document.getElementById('game-streak-display').innerText = `🔥 ${currentStreak}`;
          document.getElementById('game-question-text').innerText = q.q;

          // Seçenekleri oluştur
          const container = document.getElementById('game-options-container');
          container.innerHTML = q.a.map((opt, idx) => `
            <button onclick="handleAnswer(${idx})" id="opt-btn-${idx}" class="p-4 rounded-2xl bg-white border border-mistral-hairline hover:border-yellow-400 hover:bg-white text-mistral-ink text-sm font-semibold transition text-left flex items-center gap-3">
              <span class="w-7 h-7 rounded-lg bg-white text-mistral-slate flex items-center justify-center font-mono text-xs font-bold shrink-0">${['A','B','C','D'][idx]}</span>
              <span>${opt}</span>
            </button>
          `).join('');

          // Zamanlayıcıyı başlat (15 sn)
          startTimer();
        }

        function startTimer() {
          clearInterval(timerInterval);
          timeLeft = 15;
          const bar = document.getElementById('game-timer-bar');
          bar.style.width = '100%';

          timerInterval = setInterval(() => {
            timeLeft--;
            const pct = (timeLeft / 15) * 100;
            bar.style.width = pct + '%';

            if (timeLeft <= 0) {
              clearInterval(timerInterval);
              handleTimeOut();
            }
          }, 1000);
        }

        function handleAnswer(selectedIdx) {
          if (isAnsweringBlocked) return;
          isAnsweringBlocked = true;
          clearInterval(timerInterval);

          const q = currentQuestions[currentQuestionIdx];
          const isCorrect = (selectedIdx === q.c);
          const elapsedSec = (Date.now() - questionStartTime) / 1000;

          const chosenBtn = document.getElementById('opt-btn-' + selectedIdx);
          const correctBtn = document.getElementById('opt-btn-' + q.c);

          if (isCorrect) {
            playCorrectSound();
            if (chosenBtn) chosenBtn.className += ' correct-opt';
            
            // Puan hesaplama: 100 baz + kalan süre x 10
            const bonus = Math.round(timeLeft * 10);
            const streakBonus = currentStreak * 15;
            currentScore += (100 + bonus + streakBonus);
            currentStreak++;
            playerStats.correctAnswers++;
            playerStats.answeredQuestions++;
            gameStats.correct++;

            // Hızlı Refleks Başarımı
            if (elapsedSec < 3) unlockAchievement('quick_reflex');
            if (currentStreak >= 5) unlockAchievement('perfect_streak');
          } else {
            playWrongSound();
            if (chosenBtn) chosenBtn.className += ' wrong-opt';
            if (correctBtn) correctBtn.className += ' correct-opt';
            currentStreak = 0;
            playerStats.wrongAnswers++;
            playerStats.answeredQuestions++;
            gameStats.wrong++;
          }

          document.getElementById('game-score-display').innerText = currentScore;
          document.getElementById('game-streak-display').innerText = `🔥 ${currentStreak}`;

          setTimeout(() => {
            currentQuestionIdx++;
            renderQuestion();
          }, 1400);
        }

        function handleTimeOut() {
          if (isAnsweringBlocked) return;
          isAnsweringBlocked = true;
          playWrongSound();

          const q = currentQuestions[currentQuestionIdx];
          const correctBtn = document.getElementById('opt-btn-' + q.c);
          if (correctBtn) correctBtn.className += ' correct-opt';

          currentStreak = 0;
          gameStats.unanswered++;

          setTimeout(() => {
            currentQuestionIdx++;
            renderQuestion();
          }, 1400);
        }

        function finishGame() {
          clearInterval(timerInterval);
          document.getElementById('solo-gameplay').classList.add('hidden');
          document.getElementById('solo-results').classList.remove('hidden');

          const xpEarned = Math.round(currentScore / 2);
          playerStats.xp += xpEarned;
          playerStats.totalGames++;
          if (currentScore > playerStats.bestScore) playerStats.bestScore = currentScore;

          // Başarımlar
          unlockAchievement('first_win');
          if (playerStats.totalGames >= 5) unlockAchievement('explorer');
          if (playerStats.xp >= 1000) unlockAchievement('sage_master');

          document.getElementById('res-score').innerText = currentScore;
          document.getElementById('res-game-correct').innerText = gameStats.correct;
          document.getElementById('res-game-wrong').innerText = gameStats.wrong;
          document.getElementById('res-xp-earned').innerText = `+${xpEarned} XP`;
          document.getElementById('res-game-summary').innerText =
            `${currentQuestions.length} sorudan ${gameStats.correct + gameStats.wrong} tanesine yanıt verdin.`;

          document.getElementById('res-total-games').innerText = playerStats.totalGames;
          document.getElementById('res-total-correct').innerText = playerStats.correctAnswers;
          document.getElementById('res-total-wrong').innerText = playerStats.wrongAnswers;
          document.getElementById('res-total-answered').innerText = playerStats.answeredQuestions;
          document.getElementById('res-total-best').innerText = playerStats.bestScore;
          const totA = playerStats.correctAnswers + playerStats.wrongAnswers;
          const accTot = totA > 0 ? Math.round((playerStats.correctAnswers / totA) * 100) : 0;
          document.getElementById('res-total-accuracy').innerText = '%' + accTot;

          savePlayerStats();
          updateProfileBadge();

        }

        // 5. İstatistikler & Başarımlar Render
        function renderStatsAndAchievements() {
          document.getElementById('stat-total-games').innerText = playerStats.totalGames;
          document.getElementById('stat-total-correct').innerText = playerStats.correctAnswers;
          document.getElementById('stat-total-wrong').innerText = playerStats.wrongAnswers;
          document.getElementById('stat-answered').innerText = playerStats.answeredQuestions;
          document.getElementById('stat-best-score').innerText = playerStats.bestScore;

          const totalAns = playerStats.correctAnswers + playerStats.wrongAnswers;
          const acc = totalAns > 0 ? Math.round((playerStats.correctAnswers / totalAns) * 100) : 0;
          document.getElementById('stat-accuracy').innerText = '%' + acc;

          // Rozetleri çiz
          const container = document.getElementById('achievements-container');
          container.innerHTML = ACHIEVEMENTS_DEF.map(ach => {
            const isUnlocked = playerStats.achievements.includes(ach.id);
            return `
              <div class="p-4 rounded-2xl border ${isUnlocked ? 'bg-white border-yellow-500/50' : 'bg-white border-mistral-hairline opacity-60'} flex items-center gap-3.5 transition">
                <div class="text-2xl ${isUnlocked ? '' : 'grayscale'}">${ach.name.split(' ')[0]}</div>
                <div>
                  <h4 class="font-bold text-xs text-mistral-ink">${ach.name.split(' ').slice(1).join(' ')}</h4>
                  <p class="text-[11px] text-mistral-slate mt-0.5">${ach.desc}</p>
                  <span class="text-[10px] font-mono text-yellow-600 mt-1 block">+${ach.xp} XP</span>
                </div>
              </div>
            `;
          }).join('');
        }

        function unlockAchievement(id) {
          if (!playerStats.achievements.includes(id)) {
            playerStats.achievements.push(id);
            const def = ACHIEVEMENTS_DEF.find(a => a.id === id);
            if (def) {
              playerStats.xp += def.xp;
              showToast(`🏅 Başarım Açıldı: ${def.name} (+${def.xp} XP)`);
            }
          }
        }

        // 7. Liderlik Tablosu Render
        async function renderLeaderboard() {
          const tbody = document.getElementById('leaderboard-tbody');
          try {
            const res = await fetch('/api/arena/leaderboard');
            const list = await res.json();
            
            tbody.innerHTML = list.map((user, idx) => `
              <tr class="hover:bg-mistral-cream transition">
                <td class="py-3 pl-2 font-mono font-bold ${idx === 0 ? 'text-yellow-600' : (idx === 1 ? 'text-mistral-slate' : (idx === 2 ? 'text-amber-600' : 'text-mistral-stone'))}">
                  #${idx + 1}
                </td>
                <td class="py-3 flex items-center gap-2">
                  <img src="${user.avatar}" class="w-6 h-6 rounded-full border border-mistral-hairline">
                  <span class="font-bold text-mistral-ink">${user.name}</span>
                </td>
                <td class="py-3 text-center">
                  <span class="px-2 py-0.5 rounded bg-white text-yellow-600 font-bold text-[10px]">Lvl ${user.level}</span>
                </td>
                <td class="py-3 text-right font-mono text-mistral-slate">${user.games}</td>
                <td class="py-3 text-right pr-2 font-mono font-bold text-yellow-600">${user.xp.toLocaleString('tr-TR')} XP</td>
              </tr>
            `).join('');
          } catch(e) {
            // Standalone: backend yok — zarif düşüş notu
            tbody.innerHTML = '<tr><td colspan="5" class="py-6 text-center text-mistral-stone text-xs">Liderlik tablosu çok oyunculu sunucuda tutulur — <a href="https://app.melihkarasu.com/app/kultur-arena" target="_blank" rel="noopener" class="underline text-mistral-orange">üretim sürümünü</a> ziyaret edin.</td></tr>';
          }
        }

        // 8. Profil & Storage Yönetimi
        const STORAGE_KEY = 'arena_stats_v1';

        function loadPlayerStats() {
          try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) playerStats = Object.assign(playerStats, JSON.parse(saved));
            // Eski kayıt uyumu: answeredQuestions yoksa doğru+yanlış olarak devral
            if (typeof playerStats.answeredQuestions !== 'number') {
              playerStats.answeredQuestions = playerStats.correctAnswers + playerStats.wrongAnswers;
            }
          } catch(e) {}
        }

        function savePlayerStats() {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(playerStats));
          } catch(e) {}
        }

        function getPlayerName() {
          try {
            const saved = localStorage.getItem('arena_player_name');
            if (saved && saved.trim()) return saved.trim();
          } catch(e) {}
          return 'Oyuncu';
        }

        function getPlayerAvatar() {
          const name = getPlayerName();
          return 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(name || 'player');
        }

        function updateProfileBadge() {
          const name = getPlayerName();
          const avatar = getPlayerAvatar();
          
          document.getElementById('player-name').innerText = name;
          if (avatar) {
            const img = document.getElementById('player-avatar');
            img.src = avatar;
            img.classList.remove('hidden');
            document.getElementById('player-avatar-fallback').classList.add('hidden');
          }

          // Seviye & XP hesabı (her 500 XP = 1 seviye)
          const level = Math.floor(playerStats.xp / 500) + 1;
          const currentLevelXp = playerStats.xp % 500;
          const pct = Math.round((currentLevelXp / 500) * 100);

          document.getElementById('player-level-badge').innerText = 'Seviye ' + level;
          document.getElementById('player-xp-bar').style.width = pct + '%';
          document.getElementById('player-xp-text').innerText = playerStats.xp + ' XP';
        }

        function showToast(msg) {
          const toast = document.getElementById('arena-toast');
          toast.innerText = msg;
          toast.classList.remove('hidden');
          setTimeout(() => toast.classList.add('hidden'), 3500);
        }

        // Başlangıç
        document.addEventListener('DOMContentLoaded', () => {
          loadPlayerStats();
          updateProfileBadge();

        });
